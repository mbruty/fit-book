import { IUser } from "../../../shared/api_interfaces";
import User from "../models/user";
import { verify } from "jsonwebtoken";
import createTokens from "./createTokens";

const authMiddleware = async (req: Express.Request, res, next) => {
  let accessToken: string = req.cookies["access-token"];
  let refreshToken: string = req.cookies["refresh-token"];
  if (!accessToken && !refreshToken) {
    // We aren't logged in
    req.validAuth = false;
    return next();
  }

  // Try verify the acces token
  try {
    const data = verify(accessToken, process.env.ACCESS_SECRET);
    req.userId = data.userId;
    req.validAuth = true;
    return next();
  } catch (e) {}

  // Access token is invalid

  // Verify the refreshToken
  let data;
  try {
    data = verify(refreshToken, process.env.REFRESH_SECRET);
    req.userId = data.userId;
    req.validAuth = true;
  } catch (e) {
    req.validAuth = false;
    return next();
  }

  const user: IUser = await User.findById(data.userId);

  if (data.refreshCount !== user.refreshCount) {
    req.validAuth = false;
    return next();
  }
  const newTokens = createTokens(user);
  res.cookie("access-token", newTokens.accessToken);
  res.cookie("refresh-token", newTokens.refreshToken);

  req.validAuth = true;
  next();
};

export default authMiddleware;

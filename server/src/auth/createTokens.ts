import { IUser } from "../../../shared/api_interfaces";
import { sign } from "jsonwebtoken";

export default (user: IUser) => {
  const refreshToken: string = sign(
    {
      userId: user._id,
      refreshCount: user.refreshCount,
    },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  const accessToken: string = sign(
    {
      userId: user._id,
      refreshCount: user.refreshCount,
    },
    process.env.ACCESS_SECRET,
    { expiresIn: "10s" }
  );

  return { refreshToken, accessToken };
};

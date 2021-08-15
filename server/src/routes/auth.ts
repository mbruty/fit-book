import { json, Router } from "express";
import { responseLog } from "../responseLogger";
import { IUser } from "../../../shared/api_interfaces";
import User from "../models/user";
import createToken from "../auth/createTokens";
const router = Router();

router.post("/create", async (req, res) => {
  const body = req.body as IUser;

  // See if we are already auth'd
  if (req.validAuth) {
    res.status(400);
    const responseObj = await responseLog(
      "Already logged in",
      `User ${req.userId} tried to create new account ${body.email}`,
      "[POST]/auth/create"
    );
    res.json(responseObj);
    return;
  }

  // Validate we have everything
  if (!body.email || !body.password) {
    res.status(400);

    const responseObj = await responseLog(
      "Missing required parameters",
      `Missing ${!body.email ? "email " : ""}${
        !body.password ? "password " : ""
      }from body`,
      "[POST]/auth/create"
    );

    res.json(responseObj);
    return;
  }
  try {
    // If everything is good, create the user
    const created = await User.create({ ...body });

    // Create the access tokens
    const { refreshToken, accessToken } = createToken(created);

    res.cookie("refresh-token", refreshToken);
    res.cookie("access-token", accessToken);
    res.status(201);
    res.json({ message: "Created" });
    return;
  } catch (e) {
    res.sendStatus(208);
  }
});

router.put("/passwordchange", async (req, res) => {
  // Make sure we have a valid auth
  if(!req.validAuth) {
    res.status(401);
    const responseObj = await responseLog("Invalid auth", "", "[PUT]/auth/passwordchange");
    res.json(responseObj);
    return;
  }
});

router.delete("/logoutall", async(req, res) => {
  if(!req.validAuth) {
    res.status(401);
    const responseObj = await responseLog("Unauthorised", `${req.userId} tried to log out of all devices, but did not have any valid auth`, "[DELETE]/auth/logoutall");
    res.json(responseObj);
    return
  }

  if(!req.userId) {
    // idk why we'd get here but justin case
    res.status(500);
    const responseObj = await responseLog("Invalid perameters", "Logout of all devices, but no user id was found", "[DELETE]/auth/logoutall");
    res.json(responseObj);

  }

  const user = await User.updateOne({_id: req.userId})

})

router.post("/login", async (req, res) => {
  const body = req.body as IUser;

  if (req.validAuth) {
    res.status(208);
    const responseObj = await responseLog(
      "Already logged in",
      `User ${body.email} tried to log in, but was already logged in as ${req.userId}`,
      "[POST/auth/login]"
    );
    res.json(responseObj);
    return;
  }

  if (!body.email || !body.password) {
    res.status(400);

    const responseObj = await responseLog(
      "Missing required parameters",
      `Missing ${!body.email ? "email " : ""}${
        !body.password ? "password " : ""
      }from body`,
      "[POST]/auth/create"
    );

    res.json(responseObj);
    return;
  }
  const user = await User.findById({ id: req.userId });
  console.log(user);
});

router.get("/check", (req, res) => {
  console.log(req.cookies);
  
  if(req.validAuth) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
})

export default router;

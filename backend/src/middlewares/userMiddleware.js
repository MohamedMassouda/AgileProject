import { UserController } from "../controllers/userController.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * */
export const authenticateUser = (req, res, next, authorizedRoles = []) => {
  const [decoded, errorMessage] = UserController.getUserFromToken(req);

  if (errorMessage !== "") {
    res.status(400).json({ error: errorMessage });
    return;
  }

  if (authorizedRoles.length > 0 && !authorizedRoles.includes(decoded.role)) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  req.user = decoded;

  next();
};

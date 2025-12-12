import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.mjs";

export function isLoggedInJWT(UserModel) {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      req.userId = decoded.userId;
      //req.userRole = decoded.role;

      req.user = await UserModel.findByPk(req.userId);

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}

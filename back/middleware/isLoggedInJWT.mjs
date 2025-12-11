import jwt from "jsonwebtoken";

export function verifyTokenJWT(user) {
  const JWT_SECRET = "your_jwt_secret_key"; // on remplace pour un vrai secret en prod

  return async (req, res, next) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      req.userID = decoded.userId;

      req.userRole = decoded.role;

      const user = await user.findByPk(req.userID);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}
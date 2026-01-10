import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      console.log(decoded);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Invalid Token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, No Token");
  }
};

export { protect };

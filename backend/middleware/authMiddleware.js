import User from "../model/User.js";
import jwt from "jsonwebtoken"

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // get token from cookie
    if (!token) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    // verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // returns payload (e.g., {id,iat,exp})

    // get the user from DB using id in the token payload
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(400).json({ messagee: "User not found" });
    }
    req.user = user; // Attaching user to request
    next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const protectAdmin = async (req, res, next)=>{
    if(!res.user.role=='admin'){
        return res.status(400).json({message:'Only admin'})
    }
    next();
}

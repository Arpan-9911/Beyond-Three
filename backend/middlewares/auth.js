import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ msg: "Not authorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if(!req.user || req.user.role !== "Main Admin") return res.json({ msg: "Not authorized" });
    next();
  } catch (err) {
    return res.json({ msg: "Invalid token" });
  }
};
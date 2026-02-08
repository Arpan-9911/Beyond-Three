import Admin from "./models/admin.js";
import bcrypt from "bcryptjs";

export const createInitialAdmin = async () => {
  const existing = await Admin.findOne();
  if (existing) return;

  const hashedPassword = await bcrypt.hash("admin", 10);
  const admin = new Admin({
    name: "Admin",
    email: "admin@beyondthree.org",
    password: hashedPassword,
    role: "Main Admin"
  });
  await admin.save();
  console.log("Initial admin created: admin@beyondthree.org / admin");
};
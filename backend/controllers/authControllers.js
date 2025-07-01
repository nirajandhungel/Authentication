import User from "../model/User.js";
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const loginController = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: " All Field are Required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesnt exists " });
    }

    const doesPasswordMatch = user.comparePassword(password);
    if (!doesPasswordMatch) {
      return res.status(400).json({ message: "Invalid Password " });
    }

    //generate token
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({  error:err.message });
  }
};

export const signupController = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All Fields are Required !" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists " });
    }
    //generate token
    const user = new User ({name, email, password, role});
    await user.save()
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
export const logoutController = () => {};

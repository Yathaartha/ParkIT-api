import { login as loginService } from "../services/auth/auth.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const response = await loginService(username, password);

    if (response) {
      const token = jwt.sign(
        { id: response.id, username: response.username },
        process.env.JWT_ADMIN_SECRET,
        {
          expiresIn: "2d",
          algorithm: "HS256",
        }
      );
      res.status(200).json({
        data: { ...response, accessToken: token },
        message: "Logged in successfully",
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

const toSafeUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
    avatar: user.avatar,
    role: user.role,
});

export const registerUser = async (req, res) => {
    const { name, email, password, avatar } = req.body;
    console.log(`[Backend User Controller] registerUser called for email: ${email}, name: ${name}`);

    try {
        if (!name || !email || !password) {
            console.warn(`[Backend User Controller] Registration failed: Missing fields for email: ${email}`);
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.warn(`[Backend User Controller] Registration failed: User already exists with email: ${email}`);
            return res.status(400).json({ message: "User already exist" });
        }

        console.log(`[Backend User Controller] Hashing password and creating user: ${email}`);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isVerified: true,
            avatar,
        });

        console.log(`[Backend User Controller] Registration successful for email: ${email}`);
        return res.status(201).json({
            message: "User created successfully. You can log in now.",
            user: toSafeUser(user),
            success: true,
        });
    } catch (error) {
        console.error(`[Backend User Controller] registerUser error for email ${email}:`, error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error?.message,
        });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(`[Backend User Controller] loginUser called for email: ${email}`);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.warn(`[Backend User Controller] Login failed: User not found: ${email}`);
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.warn(`[Backend User Controller] Login failed: Invalid password for: ${email}`);
            return res.status(400).json({ message: "Invalid password" });
        }

        console.log(`[Backend User Controller] Credentials valid for: ${email}. Signing JWT token.`);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        console.log(`[Backend User Controller] Login successful, cookie and token generated for: ${email}`);
        return res.status(200).json({
            message: "Login successful",
            user: toSafeUser(user),
            token,
            success: true,
        });
    } catch (error) {
        console.error(`[Backend User Controller] loginUser error for email ${email}:`, error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error?.message,
        });
    }
};

export const logoutUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error?.message,
        });
    }
};

export const getUser = async (req, res) => {
    console.log(`[Backend User Controller] getUser called for User ID from token: ${req.user?.id}`);
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            console.warn(`[Backend User Controller] getUser failed: User not found in DB for ID: ${req.user?.id}`);
            return res.status(400).json({ message: "User not found" });
        }

        console.log(`[Backend User Controller] getUser success. User email: ${user.email}`);
        return res.status(200).json({ message: "User found", user: toSafeUser(user) });
    } catch (error) {
        console.error(`[Backend User Controller] getUser error:`, error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error?.message,
        });
    }
};

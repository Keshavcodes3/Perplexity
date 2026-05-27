import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmailVerificationEmail from "../Utils/sendEmail.js";

export const registerUser = async (req, res) => {
    const { name, email, password,avatar } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (existingUser) {
            return res.status(400).json({ message: "User already exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword, isVerified: false,avatar });

        //Later fix it 👍👍
        // await sendEmailVerificationEmail({
        //     email,
        //     username: name,
        //     userId: user._id,
        // });

        return res.status(201).json({
            message: "User created successfully",
            user,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error", success: false,
            error: error?.message
        });
    }
}


export const verifyEmail = async (req, res) => {
    const { token } = req.params;

    const sendPage = (status, title, message) =>
        res.status(status).send(`
            <!DOCTYPE html>
            <html>
            <head><meta charset="utf-8"><title>${title}</title></head>
            <body style="font-family: Arial, sans-serif; max-width: 480px; margin: 48px auto; text-align: center;">
                <h1>${title}</h1>
                <p>${message}</p>
            </body>
            </html>
        `);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return sendPage(400, "Verification failed", "User not found.");
        }

        if (user.isVerified) {
            return sendPage(200, "Already verified", "Your email is already verified. You can log in.");
        }

        user.isVerified = true;
        await user.save();

        if (process.env.FRONTEND_URL) {
            return res.redirect(`${process.env.FRONTEND_URL}/login?verified=true`);
        }

        return sendPage(
            200,
            "Email verified",
            "Your email has been verified successfully. You can now log in."
        );
    } catch (error) {
        const message =
            error.name === "TokenExpiredError"
                ? "This verification link has expired. Please register again or request a new link."
                : "Invalid or expired verification link.";

        return sendPage(400, "Verification failed", message);
    }
};



export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isVerified = user?.isVerified;
        if (!isVerified) {
            return res.status(400).json({ message: "User is not verified" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified,
            },
            token,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export const logoutUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User found", user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}


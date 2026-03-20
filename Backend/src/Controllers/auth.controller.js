import mongoose from 'mongoose'
import express from 'express'
import UserModel from '../Models/User.model'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../Services/mail.service'


/**
 * Registers a new user by creating a user account and sending a verification email.
 * @route POST /api/v1/auth/register
 * @body {string} userName - The user's username.
 * @body {string} email - The user's email address.
 * @body {string} password - The user's password.
 * @returns {object} 201 - User registered successfully with user details.
 * @returns {object} 400 - User already exists or error message.
 * 
 */
export const registerUserController = async (req, res) => {
    const { userName, email, password } = req.body
    try {
        const isAlreadyUserExist = await UserModel.findOne({
            $or: [{ userName }, { email }]
        })
        if (isAlreadyUserExist) {
            return res.status(400).json({
                success: false,
                message: `User already existed with given email or userName!!`
            })
        }
        const User = await UserModel.create({
            userName, email, password
        })
        const emailVerificationToken = jwt.sign({
            email: User.email,
        }, process.env.JWT_SECRET)
        sendEmail(email,
            "Welcome to our platform!",
            `Hi ${userName},\n\nThank you for registering on our platform. We're excited to have you on board! If you have any questions or need assistance, feel free to reach out.\n\nBest regards,\nThe Perplexity Team`,
            `<p>Hi ${userName},</p><p>Thank you for registering on our perplexity platform. We're excited to have you on board! Please Verify your email address by clicking the link below : </p>
            <a style="color:green" href="http://localhost:3000/api/v1/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
            <p>If you have any questions or need assistance, feel free to reach out .Best regards,<br>The Perplexity Team</p>`
        )
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                userName: User.userName,
                email: User.email,
                _id: User._id
            }
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: `Error occured : ${err.message}`
        })
    }

}

/**
 * Logs in a user by validating their credentials.
 * @route POST /api/v1/auth/login
 * @body {string} userName - The user's username (optional if email is provided).
 * @body {string} email - The user's email address (optional if userName is provided).
 * @body {string} password - The user's password.
 * @returns {object} 200 - User logged in successfully with user details.
 * @returns {object} 400 - User not found or invalid credentials message.
 * 
 */

export const loginUserController = async (req, res) => {
    const { userName, email, password } = req.body
    try {
        const user = await UserModel.findOne({
            $or: [{ userName }, { email }]
        }).select("+password")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `User not found with given email or userName!!`
            })
        }
        const isPasswordMatch = await user.comparePassword(password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: `Invalid credentials!!`
            })
        }
        if (!user.verified) {
            return res.status(400).json({
                success: false,
                message: `Please verify your email before logging in!!`,
                err: "Email not verified"
            })
        }
        const token = jwt.sign({
            email: user.email,
            userName: user.userName,
            _id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        res.cookie("token", token)
        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                userName: user.userName,
                email: user.email,
                _id: user._id
            }
        })
    } catch (err) {
        return res.status(400).json({
            message: `Error : ${err.message}`,
            success: false
        })
    }
}


/**
 * Verifies the user's email address using the provided token.
 * @route GET /api/v1/auth/verify-email
 * @query {string} token - The email verification token sent to the user's email.
 * @returns {object} 200 - Email verified successfully message.
 * @returns {object} 400 - Invalid token or user not found message.
 */

export async function verifyEmail(req, res) {
    const { token } = req.query;
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const User = await UserModel.findOne({
            email: decoded.email
        })
        if (!User) {
            return res.status(400).json({
                err: "User Not verified",
                success: false,
                message: "Invalid token"
            })
        }
        User.verified = true;
        await User.save()
        res.cookie('token',token)
        const html = `<h1>Email Verified Successfully</h1><p>Thank you for verifying your email address. Your account is now active and you can log in to our platform.</p><p>Best regards,<br>The Perplexity Team</p>`
        res.send(html)
        return res.status(200).json({
            message: "Email verified successfully",
            success: true
        })
    } catch (err) {
        return res.status(400).json({
            err: "User Not verified",
            success: false,
            message: `Error : ${err.message}`
        })
    }
}



export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                userName: user.userName,
                email: user.email,
                _id: user._id
            }
        });

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};
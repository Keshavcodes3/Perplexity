import jwt from 'jsonwebtoken';
import UserModel from '../Models/User.model';

export const IdentifyUser = async (req, res, next) => {
    let token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
            err: "No token provided",
            success: false
        });
    }
    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token",
            success: false
        });
    }
    req.user = decoded;
    next();
};
import jwt from "jsonwebtoken";

export const IdentifyUser = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access",
            success: false,
        })
    }
    let decoded;
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(400).json({
            message: "Internal Server error",
            success: false,
            error: err.message
        })
    }
}
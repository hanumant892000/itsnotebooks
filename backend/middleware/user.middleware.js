import User from "../schema/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.JWT_SECRET);

const userMiddleware = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token missing. Please login first.",
        });
    }
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access"
        });
    }

    try {
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Internal server error"
        });
    }
}

export default userMiddleware;
import jwt from "jsonwebtoken";
import { ENV } from "./env.js";


export const generateToken = (userId, res) => {
    //token creation
    const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
        expiresIn: "7d",
    })

    //cookie creation
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,//prevent XSS attacks:cross -side attacks
        sameSite: "strict",//prevent CSRF attacks:cross-site request forgery
        secure: ENV.NODE_ENV === "devlopment"?false:true
    })

    return token
}
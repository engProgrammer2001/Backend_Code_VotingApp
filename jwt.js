const { request } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtAuthMiddleware = (req, res, next) => {

    // first i'll check that request header has athorization or not
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ message: "Token not found" });
    }

    // if it has athorization then i'll extract jwt token from the request header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "You are Unauthorized" });
    }

    // now i'll verify the jwt tokn
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // attach user information to the request object 
        req.user = decoded;
        next();

    } catch (error) {
        console.log("jwt error",error);
        return res.status(401).json({ message: "Invailid Token" });
    }
};


// function to genrate jwt token for user
const generateToken = (userData) => {
    return jwt.sign({ userData }, process.env.JWT_SECRET, {
        expiresIn: "4d",
    });
};

module.exports = { jwtAuthMiddleware, generateToken };
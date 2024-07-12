const express = require("express");
const router = express.Router();
const userContoller = require("../controller/user.controller.js");
const { jwtAuthMiddleware } = require("../jwt.js");


router.post("/signup",  userContoller.register);
router.post("/signin",  userContoller.login);
router.get("/profile", jwtAuthMiddleware, userContoller.getUserProfile);
router.put("/profile/password", jwtAuthMiddleware,userContoller.changeUserPassword);

module.exports = router;

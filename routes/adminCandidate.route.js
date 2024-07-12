const express = require("express");
const router = express.Router();
const adminCandidateController = require("../controller/adminCandidate.controller.js");
const { jwtAuthMiddleware } = require("../jwt.js");


router.post("/add", jwtAuthMiddleware, adminCandidateController.addCandidate);
router.put("/update/:candidateId", jwtAuthMiddleware, adminCandidateController.updateCandidate);
router.delete("/delete/:candidateId", jwtAuthMiddleware, adminCandidateController.deleteCandidate);



module.exports = router;
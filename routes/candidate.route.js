const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../jwt");
const cadidateController = require("../controller/candidate.controller.js");


router.get("/vote/:candidateId",jwtAuthMiddleware, cadidateController.candidatVoting );
// router.get("/vote/count",jwtAuthMiddleware, cadidateController.totalVoteCount );
// router.get("/vote/candidatelist",jwtAuthMiddleware, cadidateController.candidateList );

module.exports = router;
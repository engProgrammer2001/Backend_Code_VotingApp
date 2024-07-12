const express = require("express");
const app = express();
const db = require("./db.js");
require('dotenv').config();


const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Congratulation! Your server is running");
})

const userRoutes = require("./routes/user.route.js");
app.use("/user", userRoutes);

const adminCandidateRouters = require("./routes/adminCandidate.route.js");
app.use("/candidate", adminCandidateRouters);

const voteCandidateRouters = require("./routes/candidate.route.js");
app.use("/voter", voteCandidateRouters);

app.listen(PORT, () => {
    console.log("server is running on port 3000");
});




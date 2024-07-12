const generateToken = require("../config/jwtProvider");
const Candidate = require("../models/candidate.model.js");
const User = require("../models/user.model.js");

const checkAdminRole = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (user.role === "admin") {
      return true;
    }
  } catch (error) {
    return false;
  }
};
const addCandidate = async (req, res) => {
  try {

    // if you have admin role then you can add data
    if (!(await checkAdminRole(req.user.userId.id)))
      return res.status(403).json({ message: "User has not admin role" });

    // assuming the request body contain the candidate data
    const data = req.body;

    // create a new candidate using the Candidate models
    const newCandidate = new Candidate(data);

    // save the new candidate to the database
    const response = await newCandidate.save();
    console.log("new Candidate data saved");
    // return data
    return res.status(200).json({ response: response });
  } catch (error) {
    console.log("addCandidate controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCandidate = async (req, res) => {
  try {
    // if you have admin role then you can update data
    if (!(await checkAdminRole(req.user.userId.id)))
      return res
        .status(403)
        .json({ message: "user does not have admin role" });

    // assuming the request body contain the candidate data
    const candidateId = req.params.candidateId; // exact the id from the URL parameter
    const UpdatedcandidatData = req.body; // the data which we want to update
    const response = await User.findByIdAndUpdate(
      candidateId,
      UpdatedcandidatData,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log("response", response);

    // check id is present in my data base or not
    if (!response) {
      return res.status(403).json({ error: "Candidate not found" });
    }
    console.log("Candidate data update successfully");
    res.status(200).json({ response: response });
  } catch (error) {
    console.log("Update Candidate Controller Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.userId.id)))
      return res
        .status(403)
        .json({ message: "user dones not have admin role" });

    // exact the id from the URL parameter which we want to delete
    const candidateId = req.params.candidateId;
    const response = await User.findByIdAndDelete(candidateId);

    // check id is present in my data base or not
    if (!response) {
      return res.status(404).json({ error: "Candidate data not found" });
    }
    console.log("Candidate data deleted successfully");
    res.status(200).json({ message: "Candidate data deleted successfully" });
  } catch (error) {
    console.log("Delete Candidate Controller Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addCandidate,
  updateCandidate,
  deleteCandidate,
};

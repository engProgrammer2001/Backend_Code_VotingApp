
const Candidate = require("../models/candidate.model");
const User = require("../models/user.model");

// Start voting API
const candidatVoting = async (req, res) => {
  // admin can not give vote
  // user can give only once

  // Extract the candidate id from params
  const candidateId = req.params.candidateId;
  const userId = req.user.userId.id;
  console.log("candidateId", candidateId, "userId", userId);

  try{
    // Find the Candidate document with the specified candidateID
    const candidate = await Candidate.findById(candidateId);
    if(!candidate){
        return res.status(404).json({ message: 'Candidate not found' });
    }
    const user = await User.findById(userId);
    if(!user){
        return res.status(404).json({ message: 'user not found' });
    }
    if(user.role == 'admin'){
        return res.status(403).json({ message: 'admin is not allowed'});
    }
    if(user.isVoted){
        return res.status(400).json({ message: 'You have already voted' });
    }

    // Update the Candidate document to record the vote
    candidate.vote.push({user: userId})
    candidate.voteCount++;
    await candidate.save();

    // update the user document
    user.isVoted = true
    await user.save();

    return res.status(200).json({ message: 'Vote recorded successfully' });
}catch(err){
    console.log(err);
    return res.status(500).json({error: 'Internal Server Error'});
}
};

// vote count 
// const totalVoteCount = async (req, res) => {
//     try {
//         // Find all candidates and sort them by voteCount in descending order
//         const candidate = await Candidate.find().sort({ voteCount: 'desc' });
//         console.log("candidate", candidate);

//         // Map the candidates to only return their name and voteCount
//         const voteRecord = candidate.map((data) => {
//             return {
//                 party: data.party,
//                 count: data.voteCount
//             };
//         });

//         return res.status(200).json(voteRecord);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// get list of all candidate only party name and vote count
// const candidateList = async (req, res) => {
//     try {
//         // Find all candidates and select only the name and party fields, excluding _id
//         const candidates = await Candidate.find({}, 'name party -_id');

//         // Return the list of candidates
//         res.status(200).json(candidates);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

module.exports = { candidatVoting };

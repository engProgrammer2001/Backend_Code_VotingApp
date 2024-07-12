const generateToken = require("../config/jwtProvider");
const User = require("../models/user.model.js");

// register
const register = async (req, res) => {
  try {
    // assuming the request body contain the user details
    const data = req.body;

    // create a new user using the User models
    const newUser = new User(data);

    // save the new user to the database
    const response = await newUser.save();
    console.log("data saved");

    const payload = {
      id: response._id,
    };
    console.log("payload", JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("token_is : ", token);

    return res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log("user register controller error ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// login
const login = async (req, res) => {
  try {
    // assuming the request body contain the user aadharCardNumber and password
    const { aadharCardNumber, password } = req.body;

    // Check if aadharCardNumber or password is missing
    if (!aadharCardNumber || !password) {
      return res.status(400).json({ error: 'Aadhar Card Number and password are required' });
  }
    // find the user using the aadharCardNumber
    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    // check user and password
    if (!user || !(await user.comparePassword(password)))
      return res
        .status(401)
        .json({ error: "Invalid Aadhar Card Number or Password" });

    const payload = {
      id: user._id,
    };
    console.log("payload", JSON.stringify(payload));
    const token = generateToken(payload);

    // return token as response to the client
    res.json({ token: token });
  } catch (error) {
    console.log("user login controller error ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // const userData = req.user;
    const userId = req.user.userId.id;

    // fatch the user data from the database by using his userId
    const user = await User.findById(userId);

    console.log("user", user);

    return res.status(200).json({ user: user });
  } catch (error) {
    console.log("Get USer progile controller error ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const changeUserPassword = async (req, res) => {
  try {
   
    // extract useId from the token
    const userId = req.user.userId.id;

    // extract the current pass and new pass from the request body
    const { password, newPassword } = req.body;
    const user = await User.findById(userId);
    console.log("user", user);

    // if password does not match then throw error
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid Username or Password" });
    }
    // update the User password
    user.password = newPassword;
    await user.save();
    console.log("Password Updated Successfully!");
    return res.status(200).json({ message: "Password Updated Successfully" });
  } catch (error) {
    console.log("Change User Password controller error ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  register,
  login,
  getUserProfile,
  changeUserPassword,
};

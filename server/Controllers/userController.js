const userModel = require('../Models/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const createToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET)
}

//Route for user login
exports.loginUser = async(req, res) => {
    try {
        
      const {email, password} = req.body;

      const user = await userModel.findOne({email});

      if (!user) {
          return res.json({success:false, message:"User dont exists"})
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {

        const token = createToken(user._id);
        res.json({success:true, token})
      }
      else {
         res.json({success:false, message: "Invalid credentials"})
      }

    } catch (error) {
         console.log(error);
         res.json({success:false, message:error.message})
    }
}


// Route for user register
exports.registerUser = async (req, res ) => {
      

  try {

    const {name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    //checking user already exits or not
    const exists = await userModel.findOne({email})
       if (exists) {

         return res.json({success: false, message: "User already exists"})
       }

       //validating email format & strong password
       if (!validator.isEmail(email)) {
           return res.json({success: false, message: "Please enter a valid email"})
       }
      if (password.length < 8) {
           return res.json({success: false, message: "Please enter a strong password"})
       }

      // hashing user password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser = new userModel({
        name,
        email,
        password:hashedPassword
      })

      const user = await newUser.save()

      const token = createToken(user._id)

      res.json({success: true, token})

  } catch (error) {
     console.log(error)
     res.json({success:false, message:error.message})
  }
}


//Route for admin login
// exports.adminLogin = async () => {

// }
const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// registers
exports.registerController = async (req, res) => {

     console.log(req.body);
     const { id, firstName, lastName, email, password, phone } = req.body
     console.log(id, firstName, lastName, email, password, phone);
     try {
         const existingUser = await users.findOne({ id, email })
         if (existingUser) {
             res.status(406).json("You are already registered!!!")
         } else {
             const hashPassword = await bcrypt.hash(password, 10)

             const newUser = new users({
                 id, firstName, lastName, email, password: hashPassword, phone
             })
             await newUser.save()
             res.status(200).json(newUser)
         }
     } catch (error) {
         console.log(error);
 
     }
 }

// Login 
exports.loginController = async (req, res) => {
     console.log("Inside login Controller");
     const { email, password } = req.body

     try {
         existingUser = await users.findOne({ email })
         if (existingUser) {
             const token = jwt.sign({ userId: existingUser.id }, process.env.JWTPASSWORD)
             // console.log(token);
             const isMatch = await bcrypt.compareSync(password, existingUser.password)
           
             if (isMatch) {
                 res.status(200).json({
                     user: existingUser,token
                 })
             } else {
                 res.status(404).json("Incorrect Password")
             }
         } else {
             res.status(404).json("Incorrect Email or Password!!!")
         }
     } catch (error) {
         console.log(error);
     }
 }

 //all users
 exports.userViewController = async (req, res) => {
     console.log("Inside viewController");
     try {
         const allUser = await users.find()
         // console.log(allUser);
         res.status(200).json(allUser.map(user => ({ firstName: user.firstName, email: user.email })));
     } catch (err) {
         console.log(err);
 
     }
 }

 // user details

exports.userDetailViewController = async (req, res) => {
     console.log("Inside userDetailViewController");
     const email = req.body.email
 
     try {
         const userDetails = await users.find({ email })
          console.log(userDetails);
 
         if (userDetails) {
             res.status(200).json(userDetails.map(detail => ({ firstName: detail.firstName, lastName: detail.lastName, email: detail.email, phone: detail.phone })))
         } else {
             res.status(404).json("User Not Found")
         }
     } catch (error) {
         console.log(error);
 
     }
 
 }

 
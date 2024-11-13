const express = require('express')
const userController = require('../controllres/userControllers')
const jwtMiddleware =  require('../middlerwears/jwtMiddleware')

const router = new express.Router()

// Register : http://localhost:3000/register
router.post('/register', userController.registerController)

// Login : http://localhost:3000/login
router.post('/login', userController.loginController)

// All Users View : http://localhost:3000/allusersview
router.get('/allusersview',jwtMiddleware,userController.userViewController)

//User Details  : http://localhost:3000/userdetails
router.get('/userdetails',jwtMiddleware,userController.userDetailViewController)

module.exports = router 

const express = require('express');
const authController=require('./../controllers/authController')
const userController=require('./../controllers/userController')

const router = express.Router();

router.post('/signup',authController.signup)
router.post('/login',authController.login)

router.route('/').get(userController.getAllUsers)

router
    .route('/me')
    .get(authController.protect,userController.getMe,userController.getUser)
    .delete(authController.protect,userController.deleteUser)

router.route('/doctorSlots/:id').get(userController.getDoctorSlots)
//router.route()
module.exports = router;


const express = require('express');
const appointmentController=require('./../controllers/appointmentController')
const authController=require('./../controllers/authController')


const router = express.Router();

router
    .route('/')
    .get(authController.protect,appointmentController.getAllAppointments)
    .post(authController.protect,appointmentController.createAppointment)
router
    .route('/:id')
    .get(authController.protect,appointmentController.getAppointment)
   .patch(authController.protect,appointmentController.updateAppointment)
    .delete(authController.protect,appointmentController.deleteAppointment)



module.exports = router;


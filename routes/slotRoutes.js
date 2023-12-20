const express = require('express');
const slotController=require('./../controllers/slotController')
const authController=require('./../controllers/authController')

const router = express.Router();

router
    .route('/')
    .get(authController.protect,slotController.getAllSlots)
    .post(authController.protect,slotController.createSlot)
router
    .route('/:id')
    .get(authController.protect,slotController.getSlot)
    .patch(authController.protect,slotController.updateSlot)
    .delete(authController.protect,slotController.deleteSlot)

module.exports = router;


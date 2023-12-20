const Appointment  = require('./../models/appointmentModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const Slot = require("../models/slotModel");

exports.getAllAppointments=catchAsync(async (req,res,next)=>{
    const appointments=await Appointment.find();
    res.status(200).json({
        status:'success',
        results:appointments.length,
        data:{
            appointments
        }
    })
})
exports.getAppointment=catchAsync(async (req,res,next)=> {

    const  appointment= await Appointment.findById(req.params.id)//.populate('doctor')
    if (!appointment) return next(new AppError("NO APPOINTMENT FOUND", 404))
    res.status(200).json({
        status: 'success',
        data: {
            appointment
        }
    })
})
exports.createAppointment=catchAsync(async (req,res,next)=>{
    if (!req.body.slot)return next(new AppError("u have to select slot", 404))
    req.body.patient=req.user.id;
    const updatedSlot = await Slot.findByIdAndUpdate(req.body.slot, {available:false}, {
        new: true,
        runValidators: true
    });
    if (!updatedSlot) return next(new AppError("NO SLOT FOUND", 404))
    const newAppointment=await Appointment.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            newAppointment
        }
    })

})

exports.deleteAppointment = catchAsync(async (req, res, next) => {
    const  deletedtAppointment= await Appointment.findById(req.params.id)
    if (!deletedtAppointment) return next(new AppError("NO APPOINTMENT FOUND", 404))
    const updatedSlot = await Slot.findByIdAndUpdate(deletedtAppointment.slot, {available:true}, {
        new: true,
        runValidators: true
    });
    const appointment= await Appointment.findByIdAndDelete(req.params.id)
    if (!appointment) return next(new AppError("NO APPOINTMENT FOUND", 404))
    res.status(204).json({
        status: 'success',
        data: null
    })
})

exports.updateAppointment = catchAsync(async (req, res, next) => {
    const updatedAppointment=await Appointment.findById(req.params.id);
    if (!updatedAppointment)return next(new AppError("NO APPOINTMENT FOUND", 404))
    const oldSlot = await Slot.findByIdAndUpdate(updatedAppointment.slot, {available:true}, {
        new: true,
        runValidators: true
    });

    console.log(req.slot);
    console.log(updatedAppointment);
    // if (mongoose.Types.ObjectId(id1).equals(mongoose.Types.ObjectId(id2)))
    const newSlot = await Slot.findByIdAndUpdate(req.body.slot, {available:false}, {
        new: true,
        runValidators: true
    });


    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!appointment) {
        return next(new AppError('No appointment found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            appointment
        }
    });
});
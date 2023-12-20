const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const Slot = require("../models/slotModel");

exports.getAllUsers = catchAsync(async (req, res, next) => {
console.log(req.query)
    const users = await User.find({role:req.query.role});
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
});
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};
exports.getUser=catchAsync(async (req,res,next)=> {

    const user = await User.findById(req.params.id).populate({
        path:'slots',
        match: { available: true }
    }).populate({
        path:  'appointments'
    })
    if (!user) return next(new AppError("NO USER FOUND", 404))
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})
//     exports.createUser = catchAsync(async (req, res, next) => {
//         const user = await User.create(req.body);
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 user
//             }
//         });
//     })
// })
    exports.deleteUser = catchAsync(async (req, res, next) => {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return next(new AppError("NO User FOUND", 404))
        res.status(204).json({
            status: 'success',
            data: null
        })
        })

exports.getDoctorSlots=catchAsync(async (req,res,next)=> {
    const doctor = await User.findById(req.params.id).populate({
        path:'slots',
        match: { available: true }
    })//.populate('doctor')
    if (!doctor) return next(new AppError("NO DOCTOR FOUND", 404))
    console.log(doctor)
    slots=doctor.slots
    console.log(slots)
    res.status(200).json({
        status: 'success',
        data: {
            slots:slots
        }
    })
})

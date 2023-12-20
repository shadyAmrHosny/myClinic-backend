const Slot  = require('./../models/slotModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
exports.getAllSlots=catchAsync(async (req,res,next)=>{
    const slots=await Slot.find();
    res.status(200).json({
        status:'success',
        results:slots.length,
        data:{
            slots
        }
    })
})
exports.getSlot=catchAsync(async (req,res,next)=> {
    const slot = await Slot.findById(req.params.id)//.populate('doctor')
    if (!slot) return next(new AppError("NO SLOT FOUND", 404))
    res.status(200).json({
        status: 'success',
        data: {
            slot
        }
    })
})
exports.createSlot=catchAsync(async (req,res,next)=>{
    req.body.doctor=req.user.id;
    const newSlot=await Slot.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            newSlot
        }
    })
})

exports.updateSlot = catchAsync(async (req, res, next) => {
    req.body.doctor=req.user.id
    const slot = await Slot.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!slot) {
        return next(new AppError('No slot found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            slot
        }
    });
});

exports.deleteSlot = catchAsync(async (req, res, next) => {
    const slot = await Slot.findByIdAndDelete(req.params.id)
    if (!slot) return next(new AppError("NO SLOT FOUND", 404))
    res.status(204).json({
        status: 'success',
        data: null
    })
})
exports.getDoctorSlot=catchAsync(async (req,res,next)=> {
    const slot = await Slot.findById(req.params.id)//.populate('doctor')
    if (!slot) return next(new AppError("NO SLOT FOUND", 404))
    res.status(200).json({
        status: 'success',
        data: {
            slot
        }
    })
})
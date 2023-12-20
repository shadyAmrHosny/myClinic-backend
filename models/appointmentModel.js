const mongoose = require('mongoose');
const validator = require('validator');

const schemaAppointment=new mongoose.Schema({
    slot:{
        type:mongoose.Schema.ObjectId,
        ref:'Slot'
    },
    patient:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }

},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
schemaAppointment.pre(/^find/,function (next){
    this.populate({
        path:'slot',
    })
    next();
})
// slotSchema.pre(/^find/,function (next){
//     this.populate({
//         path:' Patient',
//         select:"name"
//     }).populate('slot')
//     next();
// })
const Appointment = mongoose.model('Appointment', schemaAppointment)


module.exports = Appointment;

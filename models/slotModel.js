const mongoose = require('mongoose');
const validator = require('validator');

const slotSchema=new mongoose.Schema({
    hour: {
        type: Number,
        validate: {
            validator: function (value) {
                return value >= 1 && value <= 12;
            },
            message: 'Hour must be between 12 pm to 12 am.',
        },
    },
    date:String,
    doctor:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    available:{
        type:Boolean,
        default:true
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
slotSchema.pre(/^find/,function (next){
    this.populate({
        path:'doctor',
        select:"name"
    })
    next();
})
//
// slotSchema.pre(/^find/, function(next) {
//     // this points to the current query
//     this.find({ reserved: { $ne: false } });
//     next();
// });

const Slot = mongoose.model('Slot', slotSchema)


module.exports = Slot;

const express=require('express');
const morgan = require('morgan');
const cors=require('cors');

const appError=require('./utils/AppError')
const globalErrorHandler=require('./controllers/errorController')

 const userRouter=require('./routes/userRoutes');
const slotRouter =require('./routes/slotRoutes');
const appointmentsRouter=require('./routes/appointmentRoutes')

const application=express();
application.use(cors());
application.use(express.json({ limit: '100kb' }));

// Development logging

if (process.env.NODE_ENV==='development') {
    application.use(morgan('dev'))
}

//
application.use('/api/v1/users',userRouter);
application.use('/api/v1/slots',slotRouter);
application.use('/api/v1/appointments',appointmentsRouter);


application.all('*',(req, res, next)=>{
    next(new appError(`can't find ${req.originalUrl}`,404))
})


application.use(globalErrorHandler)

module.exports=application;
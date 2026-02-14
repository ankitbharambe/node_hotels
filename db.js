const mongoose=require('mongoose');

// define mongoDB connection url
const mongoURL ='mongodb://localhost:27017/hotels'

//set up connection
mongoose.connect(mongoURL)
                // ,{
                //    useNewUrlParser:true,
                //    useUnifiedTopology:true
                // })
                

//get default connection
const db=mongoose.connection;

 //set listners
db.on('connected',()=>{
    console.log('connected to mongoServer');
});

db.on('err',(err)=>{
    console.log('MongoDB connection error',err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

//export the database connection
module.exports=db;

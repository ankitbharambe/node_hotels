const express=require('express')
const app=express();
const db=require('./db');
require('dotenv').config();

//const bodyParser=require('body-parser'); YT advice but not recomaded bcz of app.use(express.json());
// app.use(bodyParser.json())
app.use(express.json());

const PORT=process.env.PORT || 3000; 



const MenuItem = require('./models/MenuItem.js')

app.get('/', function(req,res){
    res.send('welcome to our hotel ')
})
 


// import router file
const personRoutes=require('./routes/personRoutes'); 
const menuItemRoutes=require('./routes/menuItemRoutes');

//use router file
app.use('/person',personRoutes);  
app.use('/menu',menuItemRoutes); 


app.listen(PORT,()=>{
    console.log('Listning port no.3000');
})


const express=require('express');
const router=express.Router();
const Person = require('./../models/person.js') // '../ ' bcz it beyond 2 files

//post methode to add person
router.post('/', async (req,res)=>{
    try{
    const data=req.body // assuming the req body contain person data and store that data in " data "

    // create new person doc using the mongoose model
    const newPerson= new Person(data);

    //Save the new person to database 
    const response=await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
}
catch(err){
    console.log(err);
    res.status(500).json({error :'Internal server error'});
 }
})

// Get method to get the person
router.get('/', async(req,res)=>{
    try{
        const data =await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error :'Internal server error'});
    }
})

//get method to get specific col in schema
router.get('/:workType',async (req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef'|| workType=='manager'|| workType=='waiter'){
            const response=await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error :'Internal server error'});
    }
})

// put method for update
router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;

        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true, // return updated documnet
            runValidators:true, // run moongose validator
        })

        if(!response){
           return res.status(404).json({error:'person not found'});
        }
         console.log('data updated');
            res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error :'Internal server error'});
    }
})

//Delete methode for delete
router.delete('/:id',async(req,res)=>{
    try{
       const personId=req.params.id;
       // assuming you have a person model
       const response=await Person.findByIdAndRemove(personId);
        
       if(!response){
           return res.status(404).json({error:'person not found'});
        }

        console.log('data deleted');
        res.status(200).json({message:'Person deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error :'Internal server error'});
    }
})

module.exports=router;
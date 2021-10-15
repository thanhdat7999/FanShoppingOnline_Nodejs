const express=require('express');
var router=express.Router();
var ObjectId=require('mongoose').Types.ObjectId;

var {Users} = require('../models/users');

//=>localhost:3000/user/
router.get('/',(req,res)=>{
    Users.find((err,docs)=>{
        if(!err){res.send(docs); }
        else{
            console.log('Error in retriving Users :',+JSON.stringify(err,undefined,2));
        }
    })
});

//detail
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id:${req.params.id}`);
    }
        
    Users.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Retriving Users: '+JSON.stringify(err,undefined,2));
        }
    });
});

//userEmail
router.get('/usermail/:email',(req,res)=>{
    // if(!ObjectId.isValid(req.params.id)){
    //     return res.status(400).send(`No record with given id:${req.params.id}`);
    // }
    
    Users.find({email:req.params.email},(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Retriving User: '+JSON.stringify(err,undefined,2));
        }
    });
});

//add dâtbase
router.post('/',(req,res)=>{
    var user=new Users({
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password
        // address:req.body.address,
        // phoneNumber:req.body.phoneNumber,
    });
    user.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Users Save :'+JSON.stringify(err,undefined,2));
        }
    });
});

//edit
router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id:${req.params.id}`);
    }

    var user=({
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password,
        address:req.body.address,
        phoneNumber:req.body.phoneNumber,
    });
    Users.findByIdAndUpdate(req.params.id,{$set:user},{new:true},(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log(`Error in Users Update: `+JSON.stringify(err,undefined,2));
        }
    })
})

//delete
router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id:${req.params.id}`);
    }
    Users.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log(`Error in Users Update: `+JSON.stringify(err,undefined,2));
        }
    });
})

module.exports=router;
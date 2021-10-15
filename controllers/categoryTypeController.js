const express=require('express');
var router=express.Router();
var ObjectId=require('mongoose').Types.ObjectId;

var {CategoryType} = require('../models/categoryType');

//=>localhost:3000/categoryType/
router.get('/',(req,res)=>{
    CategoryType.find((err,docs)=>{
        if(!err){res.send(docs); }
        else{
            console.log('Error in retriving CategoryType :',+JSON.stringify(err,undefined,2));
        }
    })
});

//detail
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id:${req.params.id}`);
    }
        
    CategoryType.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Retriving CategoryType: '+JSON.stringify(err,undefined,2));
        }
    });
});

//add dâtbase
router.post('/',(req,res)=>{
    var cateType=new CategoryType({
        name:req.body.name,
    });
    cateType.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in CategoryType Save :'+JSON.stringify(err,undefined,2));
        }
    });
});

//edit
router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id:${req.params.id}`);
    }

    var cateType={
        name:req.body.name,
    };
    CategoryType.findByIdAndUpdate(req.params.id,{$set:cateType},{new:true},(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log(`Error in CategoryType Update: `+JSON.stringify(err,undefined,2));
        }
    })
})

//delete
router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id:${req.params.id}`);
    }
    CategoryType.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log(`Error in CategoryType Update: `+JSON.stringify(err,undefined,2));
        }
    });
})

module.exports=router;
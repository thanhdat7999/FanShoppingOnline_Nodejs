const express=require('express');
var router=express.Router();
var ObjectId=require('mongoose').Types.ObjectId;

var {Products} = require('../models/products');

//=>localhost:3000/products/
router.get('/',(req,res)=>{
    Products.find((err,docs)=>{
        if(!err){res.send(docs); }
        else{
            console.log('Error in retriving Products :',+JSON.stringify(err,undefined,2));
        }
    })
});

//detail
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id:${req.params.id}`);
    }
        
    Products.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Retriving Products: '+JSON.stringify(err,undefined,2));
        }
    });
});

//CategoryType
router.get('/filterbytype/:cateid',(req,res)=>{
    // if(!ObjectId.isValid(req.params.id)){
    //     return res.status(400).send(`No record with given id:${req.params.id}`);
    // }
    
    Products.find({cateid:req.params.cateid},(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Retriving Products: '+JSON.stringify(err,undefined,2));
        }
    });
});

//add database
router.post('/',(req,res)=>{
    var pro = new Products({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            cateid:req.body.cateid,
            image:req.body.image,
        });
    pro.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Products Save :'+JSON.stringify(err,undefined,2));
        }
    });
    console.log(pro.id);
});

//edit
router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id:${req.params.id}`);
    }

    var pro=({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        cateid:req.body.cateid,
        image:req.body.image,
    });
    Products.findByIdAndUpdate(req.params.id,{$set:pro},{new:true},(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log(`Error in Products Update: `+JSON.stringify(err,undefined,2));
        }
    })
})

//delete
router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id:${req.params.id}`);
    }
    Products.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log(`Error in Products Update: `+JSON.stringify(err,undefined,2));
        }
    });
})

module.exports=router;
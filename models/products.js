const mongoose =require('mongoose');

var Products=mongoose.model('Products',{
    name:{type:String},
    price:{type:Number},
    description:{type:String},
    cateid:{type:String},
    image:{type:String},
});

module.exports={Products};
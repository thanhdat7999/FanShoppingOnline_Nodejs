const mongoose =require('mongoose');

var Order=mongoose.model('Order',{
    name:{type:String},
    position:{type:String},
    office:{type:String},
    salary:{type:Number},
});

module.exports={Employee};
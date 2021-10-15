const mongoose =require('mongoose');

var CategoryType=mongoose.model('CategoryType',{
    name:{type:String},
});

module.exports={CategoryType};
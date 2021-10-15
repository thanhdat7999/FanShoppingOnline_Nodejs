const mongoose =require('mongoose');

var Users=mongoose.model('Users',{
    fullName:{type:String},
    email:{type:String},
    password:{type:String},
    // address:{type:String},
    // phoneNumber:{type:String}
});

module.exports={Users};
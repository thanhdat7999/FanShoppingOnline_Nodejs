const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const {mongoose}=require('./db.js');

var employeeController=require('./controllers/employeeController.js');
var productsController=require('./controllers/productsController.js');
var cateTypeController=require('./controllers/categoryTypeController.js');
var userController=require('./controllers/userController.js');

var app=express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.listen(3000,()=>console.log('Server stated at pot: 3000'));

app.use('/employees',employeeController); 
app.use('/products',productsController); 
app.use('/cateTypes',cateTypeController); 
app.use('/user',userController); 
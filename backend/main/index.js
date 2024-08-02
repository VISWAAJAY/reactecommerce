const express = require('express');
const app = express();
const cors = require('cors');
const cookieparser = require('cookie-parser');
const path = require('path');
var bodyParser = require('body-parser');
const connecttodb = require('./dbconnection/db');


const port = 5000
const frontendurl = "http://localhost:3000" ; 
app.use(cors({
    origin: frontendurl,
    credentials: true,
}));
app.use(express.json());
app.use(cookieparser());  //to access cookies
app.use(bodyParser.json()); //making sure req.body is available
app.use(bodyParser.urlencoded({
    extended: false
 }));
//models
require('./models/usermodel')
require('./models/productModel')
require('./models/addtocartmodel')
require('./models/orderhistorymodel')

//ROUTES
app.use(require('../routes/allroutes'));
app.use(require('../routes/productuploadroute'));
app.use(require('./multerupload'));
app.use(require('../routes/updateProduct'));


//CONNECTION TO DB
connecttodb().then(
    app.listen(port,()=>{
        console.log(`Server started at ${port}`);
    })
)









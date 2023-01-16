const express=require("express");
const app =express();
var cors = require('cors');
var http = require('http');
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(bodyParser.json());


 app.listen(4000,()=>console.log("server is running!!!"));
const server = http.createServer(app);
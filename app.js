var express = require('express');
const app=express()
const cors = require("cors")
const mongoose=require('mongoose')
require("dotenv").config({path:"./config/config.env"})

var Router = require('./routes/index');
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
});

mongoose.connection.on("connected", () => {
console.log("connected to mongo yeah !");
});
mongoose.connection.on("error",()=>{
  console.log("error connecting to mongo " ,)
}).catch(err =>{
console.log("error is",err)
})


app.use(cors())
app.use(express.json())
app.use('/',Router)


app.listen(process.env.PORT, () => {
  console.log("running on PORT ",process.env.PORT);
});

module.exports = app;

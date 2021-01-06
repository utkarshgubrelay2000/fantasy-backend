const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type:String
  },
  description:{
  
    type:String
  },
  subCategory:{type: String},
     content:{type:String},
  RentalType:{type:String},
  address: {
    pincode:{
      type:Number,
    },
    Address_line_1:{
      type:String
    },
    Adresss_line_2:{
      type:String
    },
    City:{
      type:String
    },
    State:{
      type:String
    },
    Country:{
      type:String
    }
  },
  price:{
    required:true,
    type:Number
  },
 images:{
     required:true,
     type:Array
 },
 userId:{
     required:true,
     type:mongoose.Schema.Types.ObjectId,
     ref:"User"
 },
 mobileNumber:{
     required:true,
     type:Number
 },
 email:{
     required:true,
     type:String
 },
 verified:{
     type:Boolean,   
 },
 date:{
   required:true,
   type:Date
 }

 
});

const Products = mongoose.model("Product", productSchema);
module.exports = Products;

const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  address: {
    pincode:{
      type:Number,
    },
    Adresss_line_1:{
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
  Price:{
    required:true,
    type:Number
  },
 Images:{
     required:true,
     type:Array
 },
 UserId:{
     required:true,
     type:Object
 },
 mobileNumber:{
     required:true,
     type:Number
 },
 Email:{
     required:true,
     type:String
 },
 Verified:{
     type:Boolean,   
 },
 Date:{
   required:true,
   type:Date
 }

 
});

const Products = mongoose.model("Product", ProductSchema);
module.exports = Products;

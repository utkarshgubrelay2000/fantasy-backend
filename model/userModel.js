const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    pincode:{
      type:Number,
    },
    Addresss_line_1:{
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
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  profileImage:{
      type:String
  },
  userId:{type:String},
  myWishlist:[{
    _id:false,
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'}
  }
  ],
                   otp: {
                        type: String,
                    },
 
});

const User = mongoose.model("User", userSchema);
module.exports = User;

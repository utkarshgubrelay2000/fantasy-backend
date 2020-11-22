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
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  profileImg:{
      required:true,
      type:String
  }

     /*               ResetToken: {
                        type: String,
                    },
                    expireToken: {
                        type: Date,
                    },
*/
 
});

const User = mongoose.model("User", userSchema);
module.exports = User;

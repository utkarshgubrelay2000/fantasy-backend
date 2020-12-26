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
  mobileNumber: {
    type: Number,
  },
  profileImg:{
      type:String
  },
  uid:{type:String}

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

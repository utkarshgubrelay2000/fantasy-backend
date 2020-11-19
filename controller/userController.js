const userModel = require("../module/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs=require('bcryptjs')
/////////------ User SignUp ----////////////////
exports.Signup = (req, res) => {
  const { name, email, mobileNumber, password, profileUrl, address } = req.body;
  /**  name:string, 
   * mobileNumber:number,
   * profileUrl:string,
   * password:string,
   * address:Object */
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.status(404).json({ error: "email Address is already taken" });
    } else {
        bcryptjs.hash(password, 12).then((hashedpassword) => {   
      let newUser = new userModel({
        email: email,
        profileImg: profileUrl,
        password: hashedpassword,
        mobileNumber: mobileNumber,
        name: name,
        address: address,
      });
      newUser
        .save()
        .then((user) => {
          res.json("user saved successfully");
        })
        .catch((err) => {
          //   console.log(err.message)
          res.status(404).json({ error: err.message });
        });
 
        
    })}
  });
};
/////////------ User SignIn ----////////////////
exports.Signin = (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
     // console.log(password,user.password)
        bcryptjs
        .compare(password, user.password)
        .then((ifSame) => {
          //if user is normal user 
          if (ifSame) {
            const token = jwt.sign({ secretId: user._id }, process.env.JWT_SECRET);
            res.json({
              code: "SignSuccess",
              token:token
            });
          } else {
            res.status(400).json({ error: "Invalid email or password" });
          }
        })
        .catch((err) => {
          console.log("error in comparing password", err);
        });
    } else {
      res
        .status(404)
        .json({ error: "User not found of " + email + " address" });
    }
  });
};
exports.getAllUser=(req,res)=>{
  userModel.find({},{_id:0}).then(user=>{
    res.json(user)
  }).catch(err=>{
    res.status(404).json('Something went wrong'+ err)
  })
}
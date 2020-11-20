const userModel = require("../module/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs=require('bcryptjs');
var validate=require('validate.js')
/////////------ User SignUp ----////////////////
exports.Signup = (req, res) => {
  const { name, email, mobileNumber, password, profileUrl, address } = req.body;
  /**  name:string, 
   * mobileNumber:number,
   * profileUrl:string,
   * password:string,
   * address:Object */
  let validation = validate(req.body, {
    name: {
      presence: true,
      format: {
        pattern: "^([a-zA-z]*\\s*)*[a-zA-z]$",
        message:
          "Enter full name and it can only contain alphabets and space in between",
      },
    },
    email: {
      presence: true,
      email: true,
    },
    password: {
      presence: true,
      length: { minimum: 6, message: "password must be 6 characters long" },
    },
    mobileNumber: {
      presence: true,
    },
    profileUrl:{
      presence:true
    }
  });

  if (validation) {
    res.status(400).json({ error: validation });
    return console.log(validation);
  }
   else{
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
 }};
 /////////------ User SignIn ----////////////////
 exports.Signin = (req, res) => {
  const { email, password } = req.body;
  let validation = validate(req.body, {
    email: {
      presence: true,
      
    },
    password: {
      presence: true,
    },
  });
  
  if (validation) {
    res.status(400).json({ error: validation });
    return console.log(validation);
  }
  else{
    
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
  }};
  
/////////------  getAllUser ----//////////////// 
exports.getAllUsers=(req,res)=>{
  userModel.find({},{_id:0}).then(user=>{
    res.json(user)
  }).catch(err=>{
    res.status(404).json('Something went wrong'+ err)
  })
}
  
/////////------  getUserById post request ----////////////////
exports.getUserByUserId=(req,res)=>{
  const {userId}=req.body
  // console.log(userId)
  userModel.findOne({_id:userId}).then(user=>{
    if(user){
      res.json(user)
    }
    else{
      res.status(404).json({error:'user not found .. something wrong with userId'})
    }
  }).catch(err=>{
    res.json({})
  })
}

/////////------  getEdit User Profile ----////////////////
exports.editUserProfile = (req, res) => {
                      const { _id,newname, newemail, newmobileNumber,  newprofileUrl, newaddress } = req.body;
                      /**  name:string, 
                       * mobileNumber:number,
                       * profileUrl:string,
                       * password:string,
                       * address:Object */
                    
                      userModel.findOneAndUpdate({ _id:_id },{name:newname,email:newemail,address:newaddress,mobileNumber:newmobileNumber,profileImg:newprofileUrl,})
                      .then((user) => {
                        if (user) {
                          res.json({ message:'User Details Updated' });
                        } 
                      }).catch(err=>{
                        res.status(404).json({error:"Something went wrong"})
                      });
                     };

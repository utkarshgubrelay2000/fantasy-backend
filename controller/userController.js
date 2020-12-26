const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs=require('bcryptjs');
var validate=require('validate.js')
/////////------ User SignUp ----////////////////
exports.Signup = (req, res) => {
  const { name, email, password,uid } = req.body;
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
        password: hashedpassword,
        name: name,
        uid:uid
      });
      newUser
        .save()
        .then((user) => {
          const token = jwt.sign({ secretId: user._id }, process.env.JWT_SECRET);
          res.json({
            code: "SignUp Successfull ",
            token:token
          }); })
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
exports.getUserById=(req,res)=>{
  const {userId}=req.params
   console.log(userId)
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
                      const { _id,newName, newEmail, newMobileNumber,  newProfileUrl, newAddress } = req.body;
                      let validation = validate(req.body, {
                        newName: {
                          presence: true,
                          format: {
                            pattern: "^([a-zA-z]*\\s*)*[a-zA-z]$",
                            message:
                              "Enter full name and it can only contain alphabets and space in between",
                          },
                        },
                        newEmail: {
                          presence: true,
                          email: true,
                        },
                      
                        newMobileNumber: {
                          presence: true,
                        },
                        newProfileUrl:{
                          presence:true
                        }
                      });                    
                      if (validation) {
                        res.status(400).json({ error: validation });
                        return console.log(validation);
                      }
                      else{
                    userModel.findOne({_id:_id}).then(foundUser=>{
                      if(foundUser){
                      userModel.findOneAndUpdate({ _id:_id },{name:newName,email:newEmail,address:newAddress,mobileNumber:newMobileNumber,profileImg:newProfileUrl,})
                      .then((user) => {
                        if (user) {
                          res.json({ message:'User Details Updated' });
                        } 
                      })
                      .catch(err=>{
                        res.status(404).json({error:"Something went wrong"})
                      }); }
                      else{
                        res.status(404).json({error:'user not found'})
                      }
                    }).catch(res=>{
                      res.status(400).json({error:'something went wrong',err})
                    })
                      }   };
  exports.addMobileNumber=(req,res)=>{
    const {number,id}=req.body
    userModel.findOne({_id:id}).then(foundUser=>{
      if(foundUser){
foundUser.mobileNumber=number
foundUser.save()
res.json("saved")
      }
      else{
        res.status(404).json('user not found')
      }
    }).catch(err=>{
      res.status(404).json(err)
    })
  }

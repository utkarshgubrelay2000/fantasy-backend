const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs=require('bcryptjs');
var validate=require('validate.js')
/////////------ User SignUp ----////////////////
exports.Signup = (req, res) => {
  const { name, email, password,profileImage,phoneNumber } = req.body;

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
        profileImage:profileImage,phoneNumber:phoneNumber
        
      });
      newUser
        .save()
        .then((user) => {
          if(req.body.userid){
            user.userid=req.body.userid
          }
          else{
            user.userid=user._id
          }
          user.save()
          const token = jwt.sign({ secretId: user._id }, process.env.JWT_SECRET);
          res.json({
            code: "SignUp Successfull ",
            token:token,userId:user._id
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
              token:token,userId:user._id,userDetails:user
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
  exports.SigninWithGoogle=(req,res)=>{
    console.log(req.body)
    userModel.findOne({userid:req.body.userid}).then(foundUser=>{
      if(foundUser){
       // console.log(foundUser)
        const token = jwt.sign({ secretId: foundUser._id }, process.env.JWT_SECRET);
        res.json({
          code: "SignSuccess",
          token:token,userId:foundUser._id
        });
      }
      else {
        bcryptjs.hash(req.body.name+"@123", 12).then((hashedpassword) => {   
      let newUser = new userModel({
        email: req.body.email,
        password: hashedpassword,
        name: req.body.name, 
        profileImg:req.body.profileImage,
        phoneNumber:req.body.phoneNumber,
      });
      newUser
        .save()
        .then((user) => {
          if(req.body.userId){
            user.userid=req.body.userId
          }
          else{
            user.userid=user._id
          }
          user.save()
          const token = jwt.sign({ secretId: user._id }, process.env.JWT_SECRET);
          res.json({
            code: "SignUp Successfull ",
            token:token,userId:user._id
          }); })
        .catch((err) => {
          //   console.log(err.message)
          res.status(404).json({ error: err.message });
        });
 
        
    })}
    })
  }
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
  exports.addAddress=(req,res)=>{
    const {City,Addresss_line_1,id}=req.body
    let Address={
      City:City,
      Addresss_line_1:Addresss_line_1
    }
    userModel.findOne({_id:id}).then(foundUser=>{
      if(foundUser){
foundUser.address=Address
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
  exports.getMyWishlist=(req,res)=>{
    userModel.findOne({_id:req.params.id}).populate('myWishlist.product').populate({path:'myWishlist.product'
   ,model:"Product" ,populate:{path:'userId',model:'User'}}).then(foundUser=>{
if(foundUser){
 res.json(foundUser.myWishlist)
}else{
  res.status(400).json('User Not Found')

}
    }).catch(err=>{
      res.status(400).json('something went wrong with db')
    })
  }

 
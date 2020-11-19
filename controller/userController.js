const userModel=require('../module/userModel')
/////////------ User SignUp ----////////////////

exports.Signup = (req, res) => {
const {name,email,mobileNumber,password,profileUrl}=req.body
userModel.findOne({email:email}).then(user=>{
if(user){
    res.status(404).json({error:'email Address is already taken'})
}
else{
    let newUser=new userModel({
        email:email,profileImg:profileUrl,password:password,mobileNumber:mobileNumber,name:name
    })
    newUser.save().then(user=>{
        res.json('user saved successfully')
    }).catch(err=>{
     //   console.log(err.message)
        res.status(404).json({error:err.message})
    })
}
})
};
/////////------ User SignIn ----////////////////
exports.Signin = (req, res) => {
    const {email,password}=req.body
userModel.findOne({email:email}).then(user=>{
    if(user){
        if(user.password===password){
            
            res.json('successfully signed In')
        }
        else{
            res.status(404).json('Password is Wrong')
        }
    }
    else{
        res.status(404).json({error:'User not found of '+email+' address'})
    }
})
};

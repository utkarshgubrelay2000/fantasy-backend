RentApp -->>>>>>>
Api's-->>>>>

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


     SignUp->
     Request type-: Post,
     Url:url/signup,
     Body-include-: {email:string,password:string,address:Object {
    pincode:{   type:Number  }, Adresss_line_1:{   type:String }, Adresss_line_2:{   type:String }, City:{   type:String }, State:{   type:String }, Country:{
      type:String
    }
  },,profileImg:String ,MobileNumber:number}..
  Response:"Successfully user saved"
  important:validation applied 
  //////////////////////////////////////////////////
  
     SignIn->
     Request type-: Post,
     Url:url/signin,
     Body-include-: {email:string,password:string,}
  Response:{code:'signed in successfully',token:jwttoken}
  Details:  find email in UserSchema and then it  compare password with bcrypt.js..if password matchs then it send response as code:success and token which is generarted with the help of jsonwebtoken.
  important:validation applied 




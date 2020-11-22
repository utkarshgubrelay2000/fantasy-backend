# RentApp
## Requirement
node js
git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/contentful/the-example-app.nodejs.git
cd the-example-app.nodejs
```

```bash
npm install
```

## Steps for read-only access

To start the express server, run the following

```bash
npm run start:dev
```

Open [http://localhost:4500](http://localhost:4500) and take a look around.

## Api's-->>>>>


  #### SignIn->
   ###### Request type-: Post,
   ##### Url:url/signin,
   ######  Details:  find email in UserSchema and then it  compare password with bcrypt.js..if password matchs then it send response as code:success and token which is generarted with   the help of jsonwebtoken.
   ######   Body-include-: {email:string,password:string,}
 ##### Response:{code:'signed in successfully',token:jwttoken}

  ##### important:validation applied 


   ####  SignUp->
   ###### Request type-: Post,
   ######  Url:url/signup,
   ######  Body-include-: {email:string,password:string,address:Object {
 ######    pincode:{   type:Number  }, Adresss_line_1:{   type:String }, Adresss_line_2:{   type:String }, City:{   type:String }, State:{   type:String }, ###### Country:{
 ######      type:String
 ######    }
 ######  },
  ###### profileImg:String ,MobileNumber:number}
  ###### Response:"Successfully user saved"
  ##### important:validation applied 

   ####  EditUserProfile->
   ###### Request type-: Post,
   ######  Url:url/editUserProfile,
   ######  Body-include-: {email:string,password:string,address:Object {
  ######  pincode:{   type:Number  }, Adresss_line_1:{   type:String }, Adresss_line_2:{   type:String }, City:{   type:String }, State:{   type:String },######Country:{
   ######   type:String
  ######  }
 ###### },
  ###### profileImg:String ,MobileNumber:number}
  ###### Response:"made changes"
  ##### important:validation applied 
  ###### details- all the user details are passed.. and which are not changed remains unchanged
  

  ## getAllUsers

  ###### Request type-: Get,
  ######  Url:url/getAllUsers,
  ###### Response:{ users as Array }
  ###### users and send in the form of array  as response
  ##### important:validation applied 
  
  ## getAllProducts

  ###### Request type-: Get,
  ######  Url:url/getAllProducts,
  ###### Response:{ products as Array }.. 
  ###### sorted from latest uploaded .. and only verfied products which are verfied by admin..(access admin)
 
  ## getAllCatgories
     
  ###### Request type-: Get,
  ######  Url:url/getAllProducts,
  ###### Response:{ category as Array }.. 
  ###### aggregate function of mongodb is used to take categories of products..

  ## getProductByProductId
     
  ###### Request type-: Get,
  ######  Url:url/getProductByProductId/:productId,
  ######  params:{productId},
  ###### Response:{ response as single product }.. 
  ###### aggregate function of mongodb is used to take categories of products..

  ## getProductByUserId
     
  ###### Request type-: Get,
  ######  Url:url/getProductByUserId/:userId,
  ######  params:{userId},
  ###### Response:{ products of particular user as Array }.. 
  ###### aggregate function of mongodb is used to take categories of products..

  ## getProductByCategory
     
  ###### Request type-: Get,
  ######  Url:url/getProductByCategory/:category,
  ######  params:{category},
  ###### Response:{ products of particular user as Array }.. 
  ###### aggregate function of mongodb is used to take categories of products..



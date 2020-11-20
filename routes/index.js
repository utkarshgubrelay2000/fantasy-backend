var express = require('express');
var router = express.Router();
var user=require('../controller/userController')
var product=require('../controller/productController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to RentApp');
});

/*    Get Request  of User.... All the Get Request of Users */
router.get("/getAllUsers", user.getAllUsers, err => {
  console.log("error in Getting user details", err)
})
/*    Get Request  of Categories.... */
router.get("/getAllCatgories", product.getCategories, err => {
  console.log("error in Getting user details", err)
})
/*    Get Request  of Products.... All Products */
router.get("/getAllProducts", product.getAllProducts, err => {
  console.log("error in Getting user details", err)
})

/// Post Requests Starts Here

/*    Post Request  for User Auth */
/* //////////    Signup         /////////////*/
router.post("/signup", user.Signup, err => {
  console.log("error in signup", err)
})
/* //////////    SignIn         /////////////*/
router.post("/signin", user.Signin, err => {
  console.log("error in signin", err)
  
  
  /*Post Request of User.. (accesss:user) */
  router.post('/getUserByUserId/:Id',user.getUserByUserId,err=>{
    console.group('error in getting particular user ',err)
  })
  /*    Post Request  Product --- post product  */
  router.post('/postProduct',product.postProductAd,err=>{
    console.log('error in getting product details',err)
  })
  

  /// Put Request for Edit profile

  router.put('/editUserProfile/',user.editUserProfile,err=>{
    console.group('error in editing  user ',err)
  })
})
module.exports = router;

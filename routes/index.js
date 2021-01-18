var express = require("express");
var router = express.Router();
var user = require("../controller/userController");
var product = require("../controller/productController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Welcome to RentApp");
});

/// All USER CONTROLLER GET REQUEST

/*    Get All Users */
router.get("/getAllUsers", user.getAllUsers, (err) => {
  console.log("error in Getting user details", err);
});
/*    Get User by Id */
router.get("/getUserbyId/:userId", user.getUserById,err=>{
  console.log('error in getting user by userId',err)
});

/// All User CONTROLLER POST REQUEST
router.post("/signup", user.Signup, (err) => {
  console.log("error in signup", err);
});

/* //////////    SignIn         /////////////*/
router.post("/signin", user.Signin, (err) => {
  console.log("error in signin", err);
});
router.post("/SigninWithGoogle", user.SigninWithGoogle, (err) => {
  console.log("error in signin", err);
});
router.get('/forgotPassword/:email',user.ForgetPassword)
router.post('/newPassword',user.newPassword)

/* Get User by Id. (accesss:user) */


/// All  USER CONTROLLER PUT REQUEST

// Edit user profile
router.patch("/editUserProfile", user.editUserProfile, (err) => {
  console.group("error in editing  user ", err);
});
router.put('/addMobileNumber',user.addMobileNumber)
router.put('/addAddress',user.addAddress)
router.put('/addProductToWishlist',product.addProductToWishlist)
router.put('/removeProductToWishlist',product.removeProductToWishlist)
router.get('/productBySubCategory/:subCategory',product.productBySubCategory)

/// All  PRODUCT CONTROLLER GET REQUEST

/*  get All Categories.... */

router.get("/getAllCatgories", product.getCategories, (err) => {
  console.log("error in Getting user details", err);
});

/*   All Products */
router.get('/getMyWishlist/:id',user.getMyWishlist)
router.get("/getAllProducts", product.getAllProducts, (err) => {
  console.log("error in Getting user details", err);
});
router.get("/getProductByUserId/:userId",product.getProductByUserId,err=>{
  console.log("error is getting product by userId",err)
})

router.get('/getProductByCategory/:category',product.getProductByCategory,err=>{
  console.log('error in getting product by category',err)
})
router.get('/getProductByProductId/:productId',product.getProductByProductId,err=>{
  console.log('error in getting product by category',err)
})
/* ////   All PRODUCT CONTROLLER POST REQUEST */
router.post("/postProduct", product.postProductAd, (err) => {
  console.log("error in getting product details", err);
});

router.get('/getMyPostedProduct/:id',product.getMyPostedProduct)

 router.delete('/deleteUserProduct',product.deleteUserProduct)
module.exports = router;

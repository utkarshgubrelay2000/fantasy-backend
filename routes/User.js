var express = require('express');
var router = express.Router();
var user=require('../controller/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to RentApp');
});

/*    Get Request  of User.... All the Get Request of Users */
router.get("/getAllUser", user.getAllUser, err => {
  console.log("error in signup", err)
})


/*    Post Request  for User Auth */
/* //////////    Signup         /////////////*/
router.post("/signup", user.Signup, err => {
  console.log("error in signup", err)
})
/* //////////    SignIn         /////////////*/
router.post("/signin", user.Signin, err => {
  console.log("error in signup", err)
})
module.exports = router;

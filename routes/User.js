var express = require('express');
var router = express.Router();
var user=require('../controller/userController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to RentApp');
});
router.post("/signup", user.Signup, err => {
  console.log("error in signup", err)
})
router.post("/signin", user.Signin, err => {
  console.log("error in signup", err)
})
module.exports = router;

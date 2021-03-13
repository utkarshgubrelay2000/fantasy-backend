const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
var validate = require("validate.js");

const nodemailer = require("nodemailer");

//const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "rentzyapp2@gmail.com",
//     pass: "AIMHIGH$1",
//   },
// });
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log("error in setting transporter", error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

// exports.ForgetPassword = (req, res) => {
//   var otpGenerator = require('otp-generator')
//    let ResetOTP=otpGenerator.generate(6, { upperCase: false, specialChars: false,alphabets:false });
//   //     console.log(ResetOTP);
//       userModel.findOne({ email: req.params.email }).then((user) => {
//         if (!user) {
//           return res.status(404).json({ error: "User doesn't exist" });
//         } else {
//           user.otp = ResetOTP;
//         //  user.expireToken = Date.now() + 3600000;
//           user.save().then((r) => {
//             let toSubsciberMail = {
//               from: "RentZy@gmail.com",
//               to: `${user.email}`,
//               subject: "Welcome to RentZy Coaching",
//               html:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//               <html xmlns="http://www.w3.org/1999/xhtml">
//               <head>
//                 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
//                 <meta name="format-detection" content="telephone=no">
//                 <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;">
//                 <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />

//                 <title>RentZy Online learning Programs For Pre-Primary, K3, K10, K12, NEET, JEE, EAMCET Exams.</title>

//                 <style>

//                   @import url(http://fonts.googleapis.com/css?family=Roboto:300); /*Calling our web font*/

//                 </style>

//               </head>

//               <body style="padding:0; margin:0; background-color: #fff;">

//                 <div >
//                 <font face="'Roboto', Arial, sans-serif">
//                   <table width="" cellspacing="0" cellpadding="0" bgcolor="#" style="width: 600px; margin: 0 auto; background-color: #fff; border: 1px solid #e1e1e1;">
//                     <tr>
//                       <td  style=" text-align: center; padding-top: 10px; padding-bottom: 10px;
//                       background-color: #f5f5f5;border-bottom: 1px solid #eb5019;">
//                         <img src="http://www.RentZy.guru/assets/images/logo/ekt-logo.png" width="200">
//                       </td>
//                     </tr>
//                     <tr>
//                     <tr>
//                     <td align="center" valign="top">
//                         <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailContainer" style="font-family:Arial; color: #333333;">
//                             <tr>
//                             </tr>
//                             <!-- Title -->
//                             <tr>
//                                 <td align="left" valign="top" colspan="2" class="text-center " style="border-bottom: 1px solid #CCCCCC; font-weight: 700; padding: 20px 0 10px 0;">
//                                     <span style="font-size: 15px; font-weight: 600; ">FORGOT PASSWORD</span>
//                                 </td>
//                             </tr>
//                     </tr>
//                     <tr>
//                     <td  class="span" align="top" colspan="2" style="padding-top: 10px;">
//                         <span style=" line-height: 1.5;">
//                             We have sent you this email in response to your request to
//                             reset your password on RentZy. After you reset your password, any credit card information stored in My Account will be deleted as a security measure.
//                             <br/><br/>
//                             To reset your password for please follow the link below:
//                             <br/><br/>
//                             <div class=" text-center ">
// <h1>${user.otp}</h1>

//                             </div>

//                             <br/><br/>
//                             If you need help, or you have any other questions, feel free to email
//                           RentZywebapp@gmail.com.
//                             or call RentZy customer service toll-free at <a href="tel:7489279080">7489279080</a>.
//                             <br/><br/>
//                             RentZy Customer Service
//                         </span>
//                     </td>
//                 </tr>
//                     <tr>

//               <td style=" padding: 0 10px; border-top: #eb5019 1px solid;">
//                         <p>RentZy Online learning Programs For Pre-Primary, K3, K10, K12, NEET, JEE, EAMCET Exams.RentZy Online learning Programs For Pre-Primary, K3, K10, K12, NEET, JEE, EAMCET Exams.</p>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td height="20">
//                       </td>
//                     </tr>
//                     <tr align="center">
//                       <td style="padding:0px; padding-bottom:15px; padding-top: 10px; background: #f5f5f5;">
//                         <table border="0" align="center" cellpadding="0" cellspacing="0">
//                           <tbody>
//                             <tr>
//                               <td >GET IN TOUCH</td>
//                               <td align="center" valign="top" width="38">
//                                 <a href="https://twitter.com/RentZyTweets" target="_blank">
//                                   <img src="http://www.RentZy.guru/assets/images/social-logo/RentZy-twitter.png" >
//                                 </a>
//                               </td>
//                               <td align="center" width="38" valign="top">
//                                 <a href="https://www.facebook.com/RentZy.Guru" target="_blank">
//                                   <img src="http://www.RentZy.guru/assets/images/social-logo/RentZy-facebook.png">
//                                 </a>
//                               </td>
//                               <td align="center" width="38" valign="top">
//                                 <a href="https://www.instagram.com/RentZy.guru/" target="_blank">
//                                   <img src="http://www.RentZy.guru/assets/images/social-logo/RentZy-instagram.png" >
//                                 </a>
//                               </td>
//                               <td align="center" width="38" valign="top">
//                                 <a href="https://www.linkedin.com/company/RentZy-guru/" target="_blank">
//                                   <img src="http://www.RentZy.guru/assets/images/social-logo/RentZy-linkedin.png">
//                                 </a>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </td>
//                     </tr>
//                     <tr align="center" style="font-size:12px">
//                       <td style="background:rgb(23, 22, 33); padding-top:14px; padding-bottom:14px; color: #ababab;">
//                         <span style="margin-right:10px">Call : <a href="tel:+91-7575022486" style="text-decoration:none; color: #ababab;">+91-7575-022-486</a></span>
//                         &nbsp;  <span>Mail : <a href="mailto:enquiry@RentZy.guru" style="text-decoration:none; color: #ababab;">enquiry@RentZy.guru </a></span>
//                         <br>
//                         <a style="text-transform:uppercase; text-decoration:none; color: #ababab;; padding-top:15px; display:inline-block" href="https://classes.RentZy.guru/" target="_blank">w w w . classes.RentZy. g u r u</a>
//                         <p style=" padding-top:15px; margin:0px; font-size:12px;  color: #ababab;">If you prefer not to receive promotional email from RentZy, you can always <unsubscribe>Unsubscribe here</unsubscribe>.</p>
//                         </td>
//                       </tr>
//                     </table>
//                   </font> </div>
//                 </body>
//                 </html>`,
//               };
//               transporter.sendMail(toSubsciberMail, (err) => {
//                 if (err) {
//                   console.log("some error in sending mail to subscriber", err);
//                   return res
//                     .status(400)
//                     .json({ error: "some error in sending mail to admin" });
//                 }
//                 console.log("message sent successfully");
//                // res.json("Thanks for subscribing!");
//               });
//           });
//           res.json({response:"check your email",otp:ResetOTP});
//         }
//       });

// };

// exports.newPassword = (req, res) => {
//   //console.log(req.body);
//   try {
//   userModel.findOne({
//       email:req.body.email
//     }).then((user) => {
//       if (!user) {
//         res.status(404).json("token expires");
//       //  console.log("jjj", user.expireToken, Date.now());
//       } else {
//         //console.log(req.body.password)
//         bcryptjs.hash(req.body.password, 12).then((newpassword) => {
//           user.password = newpassword;
//           user.save().then((u) => {
//             if (!u) {
//               console.log("wrong");
//               res.status(404).json("not changed");
//             } else {
//               console.log("changed");
//               user.otp = null;
//               user.save();
//               res.json("successfully changed password");
//             }
//           });
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

/////////------ User SignUp ----////////////////
exports.Signup = (req, res) => {
  const { name, email, password, profileImage, phoneNumber } = req.body;

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
  } else {
    userModel.findOne({ email: email }).then((user) => {
      if (user) {
        res.status(404).json({ error: "email Address is already taken" });
      } else {
        bcryptjs.hash(password, 12).then((hashedpassword) => {
          let newUser = new userModel({
            email: email,
            password: hashedpassword,
            name: name,
            phoneNumber: phoneNumber,
          });
          newUser
            .save()
            .then((user) => {
              if (req.body.userid) {
                user.userid = req.body.userid;
              } else {
                user.userid = user._id;
              }
              user.save();
              const token = jwt.sign(
                { secretId: user._id },
                process.env.JWT_SECRET
              );
              res.json({
                code: "SignUp Successfull ",
                token: token,
                userId: user._id,
              });
            })
            .catch((err) => {
              //   console.log(err.message)
              res.status(404).json({ error: err.message });
            });
        });
      }
    });
  }
};
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
            const token = jwt.sign(
              { secretId: user._id },
              process.env.JWT_SECRET
            );
            res.json({
              code: "SignSuccess",
              token: token,
              userId: user._id,
              userDetails: user,
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
exports.SigninWithGoogle = (req, res) => {
  console.log(req.body);
  userModel.findOne({ userId: req.body.userId }).then((foundUser) => {
    if (foundUser) {
      // console.log(foundUser)
      const token = jwt.sign(
        { secretId: foundUser._id },
        process.env.JWT_SECRET
      );
      res.json({
        code: "SignSuccess",
        token: token,
        userId: foundUser._id,
      });
    } else {
      bcryptjs.hash(req.body.name + "@123", 12).then((hashedpassword) => {
        let newUser = new userModel({
          email: req.body.email,
          password: hashedpassword,
          name: req.body.name,
          profileImg: req.body.profileImage,
          phoneNumber: req.body.phoneNumber,
        });
        newUser
          .save()
          .then((user) => {
            if (req.body.userId) {
              user.userId = req.body.userId;
            } else {
              user.userId = user._id;
            }
            user.save();
            const token = jwt.sign(
              { secretId: user._id },
              process.env.JWT_SECRET
            );
            res.json({
              code: "SignUp Successfull ",
              token: token,
              userId: user._id,
            });
          })
          .catch((err) => {
            //   console.log(err.message)
            res.status(404).json({ error: err.message });
          });
      });
    }
  });
};
/////////------  getAllUser ----////////////////
exports.getAllUsers = (req, res) => {
  userModel
    .find({}, { _id: 0 })
    .sort({ _id: -1 })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(404).json("Something went wrong" + err);
    });
};

/////////------  getUserById post request ----////////////////
exports.getUserById = (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  userModel
    .findOne({ _id: userId })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ error: "user not found .. something wrong with userId" });
      }
    })
    .catch((err) => {
      res.json({});
    });
};

/////////------  getEdit User Profile ----////////////////
exports.editUserProfile = (req, res) => {
  const {
    _id,
    newName,
    newEmail,
    newMobileNumber,
    newProfileUrl,
    newAddress,
  } = req.body;
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
    newProfileUrl: {
      presence: true,
    },
  });
  if (validation) {
    res.status(400).json({ error: validation });
    return console.log(validation);
  } else {
    userModel
      .findOne({ _id: _id })
      .then((foundUser) => {
        if (foundUser) {
          userModel
            .findOneAndUpdate(
              { _id: _id },
              {
                name: newName,
                email: newEmail,
                address: newAddress,
                mobileNumber: newMobileNumber,
                profileUrl: newProfileUrl,
              }
            )
            .then((user) => {
              if (user) {
                res.json(user);
              }
            })
            .catch((err) => {
              res.status(404).json({ error: "Something went wrong" });
            });
        } else {
          res.status(404).json({ error: "user not found" });
        }
      })
      .catch((res) => {
        res.status(400).json({ error: "something went wrong", err });
      });
  }
};
exports.addMobileNumber = (req, res) => {
  const { number, id } = req.body;
  userModel
    .findOne({ _id: id })
    .then((foundUser) => {
      if (foundUser) {
        foundUser.mobileNumber = number;
        foundUser.save();
        res.json("saved");
      } else {
        res.status(404).json("user not found");
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
exports.addAddress = (req, res) => {
  const { City, Addresss_line_1, id } = req.body;
  let Address = {
    City: City,
    Addresss_line_1: Addresss_line_1,
  };
  userModel
    .findOne({ _id: id })
    .then((foundUser) => {
      if (foundUser) {
        foundUser.address = Address;
        foundUser.save();
        res.json("saved");
      } else {
        res.status(404).json("user not found");
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
exports.getMyWishlist = (req, res) => {
  userModel
    .findOne({ _id: req.params.id })
    .populate("myWishlist.product")
    .populate({
      path: "myWishlist.product",
      model: "Product",
      populate: { path: "userId", model: "User" },
    })
    .then((foundUser) => {
      if (foundUser) {
        res.json(foundUser.myWishlist);
      } else {
        res.status(400).json("User Not Found");
      }
    })
    .catch((err) => {
      res.status(400).json("something went wrong with db");
    });
};

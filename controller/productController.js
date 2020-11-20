const userModel = require("../module/userModel");
const productSchema = require("../module/productSchema");
var validate = require("validate.js");
/*
/////////////////////post Ad controller./////////////
body:{  Email,  category,  Images,  UserId,  mobileNumber,  name,  Price} 
model data:{
category,  Images,  mobileNumber, productName, Email,  UserId,  Verified, Price, Date,
}
verified- is false until admin accepts the orders
}
*/
exports.postProductAd = (req, res) => {
  console.log('h')
  const {
    Email,
    category,
    Images,
    UserId,
    mobileNumber,
    name,
    Price,
  } = req.body;
  let validation = validate(req.body, {
    name: {
      presence: true,
      format: {
        pattern: "^([a-zA-z]*\\s*)*[a-zA-z]$",
        message:
          "Enter full name and it can only contain alphabets and space in between",
      },
    },
    Email: {
      presence: true,
      email: true,
    },
    mobileNumber: {
      presence: true,
      length: { minimum: 10, maximum: 13, message: "Not valid" },
    },
    Price: {
      presence: true,
    },
  });

  if (validation) {
    res.status(400).json({ error: validation });
  } else {
    userModel
      .findById({ _id: UserId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ error: "User not found Can not add Product" });
        } else {
          const today = new Date();
          const newProduct = new productSchema({
            category: category,
            Images: Images,
            mobileNumber: mobileNumber,
            productName: name,
            Email: Email,
            UserId: UserId,
            Verified: false,
            Price: Price,
            Date:
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate(),
          });
          newProduct.save().then((user) => {
            res.json("product saved");
          });
        }
      })
      .catch((err) => {
        res.status(404).json({ error: "something went wrong" + err.message });
    });
}
};
exports.getAllProducts=(req,res)=>{
    productSchema.find({}).sort({_id:-1}).then(allProducts=>{
        if(allProducts){
          let productArray=[];
          allProducts.map(items=>{
if(items.Verified){
  productArray.push(items)
}
          })
            res.json(productArray)
        }
        else{
            res.status(404).json({error:"it seens like your product database is empty"})
        }
    }).catch(err=>{
        res.status(404).json({ error: "something went wrong" + err.message });
        
    })
    
}
exports.getCategories=(req,res)=>{
    productSchema.aggregate([
        {
            $group: {
                _id: { Category: "$category"},
            }
        }]).sort({_id:-1}).then(categories=>{
            if(categories){
               res.json(categories)
            }
            else{
                res.status(404).json({error:"categories not found"})
            }
        }).catch(err=>{

            res.status(404).json({ error: "something went wrong" + err.message });
        })
    }
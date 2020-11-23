const userModel = require("../model/userModel");
const productSchema = require("../model/productModel");
var validate = require("validate.js");

/// POST AD.. REQUIRES DETAILS{BODY}
exports.postProductAd = (req, res) => {
  /// add address field ..  for TESTING NOT ADDED
  //console.log('h')
  const {
    email,
    category,
    images,
    userId,
    mobileNumber,
    name,
    price,
    
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
    email: {
      presence: true,
      email: true,
    },
    mobileNumber: {
      presence: true,
      length: { minimum: 10, message: "Not valid" },
    },
    price: {
      presence: true,
    },
  });

  if (validation) {
    res.status(400).json({ error: validation });
  } else {
    userModel
      .findById({ _id: userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ error: "User not found Can not add Product" });
        } else {
          const today = new Date();
          const newProduct = new productSchema({
            category: category,
            images: images,
            mobileNumber: mobileNumber,
            productName: name,
            email: email,
            userId: userId,
            verified: false,
            price: price,
            date:
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
/// GET ALL PRODUCTS WHICH ARE VERIFIED

exports.getAllProducts=(req,res)=>{
    productSchema.find({verified:true}).sort({_id:-1}).then(allProducts=>{
            res.json(allProducts)
    }).catch(err=>{
        res.status(404).json({ error: "something went wrong" + err.message });
        
    })
    
}
exports.getCategories=(req,res)=>{
  /// AGGREAGATE FUNCTION WILL HELP US GET SINGLE SINGLE CATEGORIES.. EXAMPLE PRODUCT A AND B HAVE CATEORY CAR THEN IT WILL ONLY GIVE US ONE CATEGORY.. COMMON
    productSchema.aggregate([
        {
            $group: {
                _id: { Category: "$category", verified:"$verified" },
            }
        }]).sort({_id:-1}).then(categories=>{
          if(categories){
          let verfiedCategories=[]
          categories.map(foundCat=>{
            if(foundCat._id.verified){
              verfiedCategories.push(foundCat)
            }

          })
               res.json(verfiedCategories)
            }
            else{
                res.status(404).json({error:"categories not found"})
            }
        }).catch(err=>{

            res.status(404).json({ error: "something went wrong" + err.message });
        })
    }
 exports.getProductByUserId=(req,res)=>{
   /// GET ALL PRODUCTS BY USERID{PARTICULAR USER} AND IT SHOULD BE VERIFIED
  const {userId} =req.params
   productSchema.find({userId:userId,verified:true}).then(product=>{
     res.json(product)
   }).catch(err=>{
     res.status(400).json({error:err})
   })
 }
 exports.getProductByProductId=(req,res)=>{
  const {productId}=req.params
   productSchema.find({_id:productId,verified:true}).then(product=>{
     res.json(product)
   }).catch(err=>{
     res.status(400).json({error:err})
   })
 }
 exports.getProductByCategory=(req,res)=>{
   console.log(req.params.category)
   const category=req.params.category
   productSchema.find({category:category,verified:true}).then(product=>{
     res.json(product)
   }).catch(err=>{
     res.status(400).json({error:err})
   })
 }
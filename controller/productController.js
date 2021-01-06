const userModel = require("../model/userModel");
const productSchema = require("../model/productModel");
var validate = require("validate.js");
const category = require("../model/categoryModel");


/// POST AD.. REQUIRES DETAILS{BODY}
exports.postProductAd = (req, res) => {
  /// add address field ..  for TESTING NOT ADDED
  //console.log('h')
  const {
    email,
    category,
    subCategory,
    images,
    userId,
    mobileNumber,
    name,
    price,
    content,rentalType,description
    
  } = req.body;
  let validation = validate(req.body, {
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
          let address=req.body.address|| user.userId.address
          const today = new Date();
          const newProduct = new productSchema({
            category: category,
            subCategory:subCategory,
            images: images,
            mobileNumber: mobileNumber,
            productName: name,
            email: email,
            userId: userId,
            verified: false,
            price: price,
            RentalType:rentalType,
            content:content,
            address:address,
            description:description,
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
    productSchema.find({verified:true}).populate('userId').sort({_id:-1}).then(allProducts=>{
            res.json(allProducts)
    }).catch(err=>{
        res.status(404).json({ error: "something went wrong" + err.message });
        
    })
    
}
exports.getCategories=(req,res)=>{
  /// AGGREAGATE FUNCTION WILL HELP US GET SINGLE SINGLE CATEGORIES.. EXAMPLE PRODUCT A AND B HAVE CATEORY CAR THEN IT WILL ONLY GIVE US ONE CATEGORY.. COMMON
    category.find({}).sort({_id:-1}).then(found=>{
      res.json(found)
    }).catch(err=>{

            res.status(404).json({ error: "something went wrong" + err.message });
        })
    }
 exports.getProductByUserId=(req,res)=>{
   /// GET ALL PRODUCTS BY USERID{PARTICULAR USER} AND IT SHOULD BE VERIFIED
  const {userId} =req.params
   productSchema.find({userId:userId,verified:true}).populate('userId').then(product=>{
     res.json(product)
   }).catch(err=>{
     res.status(400).json({error:err})
   })
 }
 exports.getProductByProductId=(req,res)=>{
  const {productId}=req.params
   productSchema.find({_id:productId,verified:true}).populate('userId').then(product=>{
     res.json(product)
   }).catch(err=>{
     res.status(400).json({error:err})
   })
 }
 exports.getProductByCategory=(req,res)=>{
  //console.log(req.params.category)
  const categoryId=req.params.category
  category.findOne({_id:categoryId}).then(foundCategory=>{
    if(foundCategory){
      try {
        productSchema.find({category:foundCategory.categoryName,verified:true}).populate('userId').then(show=>{
         // console.log(show)
          res.json(show)
        }).catch(err=>{
          res.status(400).json({error:err})
        }) }
       catch (error) {
        console.log(error)
      }
    }
    else{

      res.status(400).json({error:'category id is not valid'})
    }
  }).catch(err=>{
    res.status(400).json({error:err})
    })
  // productSchema.find({category:category,verified:true}).then(product=>{
  //   res.json(product)
  // }).catch(err=>{
  //   res.status(400).json({error:err})
  // })

  //  console.log(req.params.category)
  //  const category=req.params.category
  //  productSchema.find({category:category,verified:true}).then(product=>{
  //    res.json(product)
  //  }).catch(err=>{
  //    res.status(400).json({error:err})
  //  })
 }
 exports.productBySubCategory=(req,res)=>{
   const {subCategory}=req.params
   productSchema.find({subCategory:subCategory,verified:true}).populate('userId').then((products) => {
   // res.json(products);
  });
  productSchema.aggregate([
    // {
    //   $match:{subCategory:subCategory}
    // },{
    //   $group:{_id:"$subCategory",products:{$push:{name:"$productName"}}}
    // }
    {$project:{productName:1}}
  ]).then(found=>{
res.json(found)
  })
 }
 exports.addProductToWishlist=(req,res)=>{
   const {productId,userId}=req.body
   userModel.findOne({_id:userId}).then(foundUser=>{
if(foundUser){
  let response=false;
  let MyWishlist=foundUser.myWishlist
 MyWishlist.map(wishlist=>{
   if(wishlist.product==productId){
     res.status(203).json('Already Added')
     response=true
     return 0;
   }
 })
 if(!response){
   MyWishlist.push({product:productId})
   foundUser.myWishlist=MyWishlist
   foundUser.save()
   res.json('product Added')
 }
}
else{
  res.status(404).json("User not found")

}
   }).catch(err=>{
     res.status(404).json("something went wrong")
   })
 }
 exports.removeProductToWishlist=(req,res)=>{
  const {productId,userId}=req.body
  userModel.findOne({_id:userId}).then(foundUser=>{
if(foundUser){
 let response=false;
 let MyWishlist=[]
 foundUser.myWishlist.map(wishlist=>{
   console.log('hete',wishlist.product==productId)
  if(wishlist.product==productId){
    response=true
  }
  else{
    MyWishlist.push({product:wishlist.product})
  }
})
if(response){
  foundUser.myWishlist=MyWishlist;
  foundUser.save()
  res.json('Removed')
}
else{
  
  res.status(203).json('Product not in wishlist')
}
}
else{
 res.status(404).json("User not found")

}
  }).catch(err=>{
    res.status(404).json("something went wrong")
  })
}
exports.deleteUserProduct=(req,res)=>{
  const {productId,userId}=req.body
  productSchema.findOneAndDelete({_id:productId,userId:userId}).then(sucess=>{
    res.json('success')
  }).catch(err=>{
    res.status(400).json('something wentwrong with data base')
  })
   }
   exports.getMyPostedProduct=(req,res)=>{
     productSchema.find({userId:req.params.id}).populate('userId').then(found=>{
       let verified=[]
       let Unverified=[]

       found.map(products=>{
         if(products.verified){
           verified.push(products)
         }
         else{
           Unverified.push(products)
         }

       })
       setTimeout(() => {
         res.json({verifiedProducts:verified,UnverifiedProducts:Unverified})
       }, 2000);
     }).catch(err=>{
      res.status(400).json('something wentwrong with data base')
    })
   }
const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
categoryName:{type:String},subCategory:[],imageUrl:{type:String}
});

const category = mongoose.model("Category", categorySchema);
module.exports = category;

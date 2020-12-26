const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
categoryName:{type:String},subCategory:[]
});

const category = mongoose.model("Category", categorySchema);
module.exports = category;

const { model, Schema } = require("mongoose");

const Product = new Schema({
  id: Number,
  modelo: String,
  category: String,
  landing: String,
  badge: String,
  new: Boolean,
  usLang: {
      description:String,
      description_small: String,
      features: [String]
  },
  esLang:{
    description:String,
    description_small: String,
    features: [String]
  },
  mainImage:String,
  rutas:[String]
});

module.exports = model("Product", Product);
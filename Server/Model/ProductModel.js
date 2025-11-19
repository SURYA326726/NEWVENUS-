const mongo=require('mongoose');

const productSchema= {
  productImage: String,
  productName: String,
  productPrice:Number,
  productDescription: String,
  productService: String,
};

const productModel=mongo.model('Product',productSchema)
module.exports=productModel;
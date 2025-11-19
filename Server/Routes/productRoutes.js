const {Router}=require('express');
const { getProducts, addProduct,removeProduct } = require('../Controller/productController');
const route=Router();


route.get('/products', getProducts);

route.post('/product', addProduct);

route.delete('/product/:name',removeProduct);

module.exports=route
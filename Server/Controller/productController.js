const Product=require('../Model/ProductModel')


 const getProducts=async (req, res) => {
  try{
 const productList=await Product.find();
  res.status(200).json({status:'success',data:productList});
  }
  catch(error){
      res.status(400).json({status:'failed',error});
  }
 
}

 const addProduct=async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).send({ status: 'success', data: savedProduct });
    console.log('Product added successfully');
  } catch (error) {
     res.status(400).json({status:'failed',error});
  }
}

const removeProduct=async (req,res)=>{
    try{
      const name=req.params.name;
      const deletedProduct=await Product.findOneAndDelete({productName:name});
       if (!deletedProduct) {
      return res.status(404).json({ status: 'failed', message: 'Product not found' });
    }

    res.status(200).json({ status: 'success', message: 'Product deleted' });
    }catch(error){
 res.status(400).json({status:'failed',error});
    }
}

module.exports={getProducts,addProduct,removeProduct}



const express = require('express');
const app = express();
const DBconnection=require('./DBconnection/DBconfig')
const productRouter=require('./Routes/productRoutes')

app.use(express.json());
app.use(productRouter)


app.listen(3000, () => {
  console.log('Server is running');
});
require('./DBconnection/DBconfig');
DBconnection();



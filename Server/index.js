const express = require('express');
const path=require('path')

const cors=require('cors');
const app = express();
const DBconnection=require('./DBconnection/DBconfig')
const productRouter=require('./Routes/productRoutes')



app.use('/productImages',express.static(path.join(__dirname,'productImages')))
app.use(cors({
  origin: 'https://gomathtech.netlify.app/'
}));
app.use(express.json());
app.use(productRouter)


app.listen(3000, () => {
  console.log('Server is running');
});
require('./DBconnection/DBconfig');
DBconnection();



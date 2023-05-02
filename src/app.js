
const fs = require('fs');
const express = require('express');
const { object } = require('joi');
const app = express();
const router = new express.Router();
const bodyParser = require('body-parser');

//middleware
router.use(express.json());
router.use(bodyParser.json());

const product = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/product.json`)
);

// Defining The Router
// Handling PATCH request
router.patch('/api/v1/product/:id', (req, res) => {
  try {
    //Write your code here
    const id = req.params.id;
    const productIndex = product.findIndex((p) => p.id == id);
    if (productIndex === -1) {
      return res.status(404).json({
        message: 'Product Not Found',
        status: 'Error',
      });
    }
    product[productIndex] = Object.assign(product[productIndex], req.body);
    fs.writeFileSync(
      `${__dirname}/../dev-data/product.json`,
      JSON.stringify(product)
    );
    return res.status(201).json({
      message: 'success',
      data: {
        product,
      },
    });
    
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Product Updation Failed',
      status: 'Error',
    });
  }
});

//Deleting Product
router.delete('/api/v1/product/:id', (req, res) => {
  try {
    //Write your code here
     const id = req.params.id;
    const productIndex = product.findIndex((p) => p.id == id);
    if (productIndex === -1) {
      return res.status(404).json({
        message: 'Product Not Found',
        status: 'Error',
      });
    }
    product.splice(productIndex, 1);
    fs.writeFileSync(
      `${__dirname}/../dev-data/product.json`,
      JSON.stringify(product)
    );
    return res.status(201).json({
      status: 'success',
      data: {
        product,
      },
    });
    
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Product Deletion Failed',
      status: 'Error',
    });
  }
});

//Registering our Router
app.use(router);

module.exports = app;

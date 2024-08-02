const express = require('express');
const router = express.Router();
const productModel = require('../main/models/productModel');
const authtoken = require('../main/middleware/authtoken');
//UPDATING EXISTING PRODUCT


router.put('/api/updateProduct', authtoken, async (req, res) => {
  try {
    const { _id, data } = req.body;
    console.log('ID:', _id);
    console.log('Request Body:', req.body);

    const update = await productModel.findByIdAndUpdate(_id, data, { new: true });

    if (!update) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product Updated', data: update });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

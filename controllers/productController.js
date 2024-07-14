const Product = require('../models/Product');
const upload = require('../middleware/upload');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      imageUrl: req.file ? req.file.path : null
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      const updatedData = {
        ...req.body,
        imageUrl: req.file ? req.file.path : product.imageUrl
      };
      await product.update(updatedData);
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

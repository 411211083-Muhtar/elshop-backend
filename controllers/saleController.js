const db = require('../db');

// Get all sales
exports.getSales = (req, res) => {
  db.query('SELECT * FROM sales', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Get sale by id
exports.getSaleById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM sales WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json(results[0]);
  });
};

// Create new sale
exports.createSale = (req, res) => {
  const { product_id, customer_id, quantity, total_price } = req.body;
  db.query('INSERT INTO sales (product_id, customer_id, quantity, total_price) VALUES (?, ?, ?, ?)', 
           [product_id, customer_id, quantity, total_price], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: results.insertId, product_id, customer_id, quantity, total_price });
  });
};

// Update sale by id
exports.updateSale = (req, res) => {
  const { id } = req.params;
  const { product_id, customer_id, quantity, total_price } = req.body;
  db.query('UPDATE sales SET product_id = ?, customer_id = ?, quantity = ?, total_price = ? WHERE id = ?', 
           [product_id, customer_id, quantity, total_price, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, product_id, customer_id, quantity, total_price });
  });
};

// Delete sale by id
exports.deleteSale = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM sales WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Sale deleted' });
  });
};

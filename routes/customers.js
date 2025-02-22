const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Get all customers
  router.get('/', (req, res) => {
    db.query('SELECT * FROM customers', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

  // Get customer by id
  router.get('/:customer_id', (req, res) => {
    const { customer_id } = req.params;
    db.query('SELECT * FROM customers WHERE customer_id = ?', [customer_id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.json(results[0]);
    });
  });

  // Create new customer
  router.post('/', (req, res) => {
    const { name, email, phone } = req.body;
    db.query('INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ customer_id: results.insertId, name, email, phone });
    });
  });

  // Update customer by id
  router.put('/:customer_id', (req, res) => {
    const { customer_id } = req.params;
    const { name, email, phone } = req.body;
    db.query('UPDATE customers SET name = ?, email = ?, phone = ? WHERE customer_id = ?', [name, email, phone, customer_id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ customer_id, name, email, phone });
    });
  });

  // Delete customer by id
  router.delete('/:customer_id', (req, res) => {
    const { customer_id } = req.params;
    db.query('DELETE FROM customers WHERE customer_id = ?', [customer_id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Customer deleted' });
    });
  });

  return router;
};

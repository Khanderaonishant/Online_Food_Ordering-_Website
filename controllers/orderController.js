const db = require("../config/db");

exports.placeOrder = (req, res) => {
  const { user_id, items, total } = req.body;

  db.query("INSERT INTO orders (user_id, total) VALUES (?, ?)",
    [user_id, total],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      const orderId = result.insertId;
      items.forEach(item => {
        db.query("INSERT INTO order_items (order_id, menu_id, quantity) VALUES (?, ?, ?)",
          [orderId, item.menu_id, item.quantity]);
      });

      res.json({ msg: "Order placed successfully", orderId });
    });
};

exports.getOrders = (req, res) => {
  const { user_id } = req.params;
  db.query("SELECT * FROM orders WHERE user_id = ?", [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

const db = require("../config/db");

exports.getMenu = (req, res) => {
  db.query("SELECT * FROM menu", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.addMenuItem = (req, res) => {
  const { name, price, description } = req.body;
  db.query("INSERT INTO menu (name, price, description) VALUES (?, ?, ?)",
    [name, price, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ msg: "Menu item added successfully" });
    });
};

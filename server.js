require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ------------------------
// MySQL Connection
// ------------------------
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1); // Stop server if DB fails
  }
  console.log('Connected to MySQL database');
});

// ------------------------
// Serve frontend files
// ------------------------
app.use(express.static(path.join(__dirname, '../frontend')));

// ------------------------
// API Routes
// ------------------------

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(query, [email, password], (err, result) => {
    if (err) return res.status(400).json({ message: 'Registration failed', err });
    res.json({ message: 'User registered successfully' });
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email=? AND password=?";
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(400).json({ message: 'Login error', err });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ user: results[0] });
  });
});

// Menu Route
app.get('/api/menu', (req, res) => {
  const query = "SELECT * FROM menu";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Menu fetch error', err });
    res.json(results);
  });
});

// Orders Route
app.post('/api/orders', (req, res) => {
  const { userId, items } = req.body;
  const query = "INSERT INTO orders (user_id, items) VALUES (?, ?)";
  db.query(query, [userId, JSON.stringify(items)], (err, result) => {
    if (err) return res.status(500).json({ message: 'Order placement failed', err });
    res.json({ message: 'Order placed successfully' });
  });
});

app.get('/api/orders/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT * FROM orders WHERE user_id=?";
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Order fetch error', err });
    res.json(results);
  });
});

// ------------------------
// Start Server
// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

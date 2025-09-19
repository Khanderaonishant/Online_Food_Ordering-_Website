-- Create database
CREATE DATABASE IF NOT EXISTS food_ordering;
USE food_ordering;

-- ----------------------------
-- Table structure for users
-- ----------------------------
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------
-- Table structure for menu
-- ----------------------------
CREATE TABLE IF NOT EXISTS menu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ----------------------------
-- Table structure for order_items
-- ----------------------------
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_id) REFERENCES menu(id) ON DELETE CASCADE
);

-- ----------------------------
-- Sample Data for menu
-- ----------------------------
INSERT INTO menu (name, description, price) VALUES
('Margherita Pizza', 'Classic delight with 100% real mozzarella cheese', 6.99),
('Veggie Burger', 'Loaded with fresh vegetables and sauces', 5.49),
('French Fries', 'Crispy golden fries with ketchup', 2.99),
('Chocolate Milkshake', 'Rich and creamy chocolate shake', 3.99),
('Caesar Salad', 'Fresh lettuce with Caesar dressing', 4.99);

-- ----------------------------
-- Sample User (password: "123456")
-- ----------------------------
INSERT INTO users (name, email, password) VALUES
('Test User', 'test@example.com', '$2a$08$G3l7F5VQd0Qf5U2yLq6j6.u4E1K3QWlVjz3Bz8Q8c3J/FkKDv/qg6');

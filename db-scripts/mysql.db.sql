-- create databse
CREATE DATABASE pinoybites;

-- use the database
USE pinoybites;

-- users table
CREATE TABLE users (
      user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(200) NOT NULL,
      contact_num VARCHAR(20), -- use VARCHAR for phone numbers (more flexible)
      address VARCHAR(255),
      role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'customer')), -- portable enum
      password VARCHAR(255) NOT NULL,
      hash_pass VARCHAR(255) NOT NULL,
      date_created DATE NOT NULL
);

-- products table
CREATE TABLE products (
      product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      image_url TEXT NOT NULL,
      avg_rating DECIMAL(3,2) NOT NULL CHECK(avg_rating BETWEEN 0 AND 5),
      total_reviews INT NOT NULL DEFAULT 0,
      category VARCHAR(100) NOT NULL,
      ingredients TEXT NOT NULL,
      steps TEXT NOT NULL,
      stock INT NOT NULL DEFAULT 0,
      is_new ENUM('yes','no') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- orders table 
CREATE TABLE orders (
      order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      order_date TIMESTAMP NOT NULL,
      shipping_address TEXT NOT NULL,
      special_instruction TEXT NOT NULL,
      status ENUM('Processing','In-Transit','Cancelled','Returned','Delivered','Pending') NOT NULL,
      total_price DECIMAL(10,2) NOT NULL,
      payment_method ENUM('Gcash','COD') NOT NULL,

      -- Foreign key
      CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- order item table
CREATE TABLE order_items (
      order_item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      product_image TEXT NOT NULL,
      product_price DECIMAL(10,2) NOT NULL,
      quantity INT NOT NULL,
      subtotal DECIMAL(10,2) NOT NULL,
      delivery_fee DECIMAL(10,2) NOT NULL,

      -- Foreign key
      CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE, 
      CONSTRAINT fk_order_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- cart table
CREATE TABLE carts (
      cart_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,

      -- Foreign key
      CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- cart items table
CREATE TABLE cart_items(
      cart_item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      cart_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL,
      
      -- Foreign key
      CONSTRAINT fk_cart_id FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE CASCADE,
      CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- user favorites table
CREATE TABLE favorites (
      favorite_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,

      -- Foreign key
      CONSTRAINT fk_favorite_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- favorites items table
CREATE TABLE favorite_items(
      favorite_item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      favorite_id INT NOT NULL,
      product_id INT NOT NULL,
      
      -- Foreign key
      CONSTRAINT fk_favorite_id FOREIGN KEY (favorite_id) REFERENCES favorites(favorite_id) ON DELETE CASCADE,
      CONSTRAINT fk_favorite_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- products review table
CREATE TABLE product_reviews (
      prod_review_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      product_id INT NOT NULL,
      order_id INT NOT NULL,
      rating DECIMAL(3,2) NOT NULL CHECK (rating BETWEEN 0 AND 5),
      comment TEXT NOT NULL,
      date_created DATE NOT NULL ,
      
      -- Foreign key constraints
      CONSTRAINT fk_product_review_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE, -- when user is removed, all his data will be removed also here
      CONSTRAINT fk_product_review_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
      CONSTRAINT fk_product_review_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- system review table
CREATE TABLE system_reviews (
      sys_review_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      rating DECIMAL(3,2) NOT NULL CHECK (rating BETWEEN 0 AND 5),
      comment TEXT NOT NULL,
      date_created TIMESTAMP NOT NULL ,
      
      -- Foreign key constraints
      CONSTRAINT fk_system_review_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE -- when user is removed, all his data will be removed also here
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- notifications table
CREATE TABLE notifications (
      notif_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      order_id INT NOT NULL,
      is_read TINYINT(1) NOT NULL DEFAULT 0,
      date_created DATE NOT NULL,
      message VARCHAR(255) NOT NULL,
      data JSON,

      -- Foreign key
      CONSTRAINT fk_notif_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE, 
      CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


-- INDEXES 

-- products
CREATE INDEX idx_products_category ON products(category, name, price );

-- product reviews
CREATE INDEX idx_reviews_product ON product_reviews(product_id);
CREATE INDEX idx_reviews_user ON product_reviews(user_id);

-- orders
CREATE INDEX idx_orders_user_status ON orders(order_id, status);

-- order items
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- carts
CREATE INDEX idx_carts_user ON carts(user_id);

-- cart items
CREATE INDEX idx_cart_items_cart ON cart_items(cart_id);
CREATE INDEX idx_cart_items_product ON cart_items(product_id);

-- favorites
CREATE INDEX idx_favorites_user ON favorites(user_id);

-- favorite items
CREATE INDEX idx_favorite_items_fav ON favorite_items(favorite_id);
CREATE INDEX idx_favorite_items_product ON favorite_items(product_id);

-- notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_order ON notifications(order_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
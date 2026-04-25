

-- users table for PostgreSQL
CREATE TYPE user_role AS ENUM ('admin', 'user');

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,          -- auto-incrementing ID
	username VARCHAR(255) NOT NULL,
	email VARCHAR(200) NOT NULL UNIQUE,
	contact_num VARCHAR(20) NULL,
	address VARCHAR(255) NULL,
	role user_role NOT NULL,   -- use the ENUM type here
	password TEXT NOT NULL,
	hash_pass TEXT NOT NULL,
      profile_image TEXT NOT NULL DEFAULT 'None',
	loyalty_tier VARCHAR(255) NOT NULL DEFAULT 'None',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- products table
CREATE TABLE products (
	product_id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	description TEXT NOT NULL,
	stock INT NOT NULL DEFAULT 0,
	price DECIMAL(10,2) NOT NULL,
	image_url TEXT NOT NULL,
	avg_rating DECIMAL(3,2) NOT NULL CHECK(avg_rating BETWEEN 0 AND 5),
	total_reviews INT NOT NULL DEFAULT 0,
	category VARCHAR(255) NOT NULL,
      ingredients JSONB NOT NULL,
      steps JSONB NOT NULL
	is_new BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- orders table 
CREATE TYPE order_status AS ENUM ('Processing','In_Transit','Cancelled','Returned','Delivered','Pending');
CREATE TYPE payment_method_type AS ENUM ('Gcash', 'COD');
CREATE TABLE orders (
      order_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      order_date DATE,
      shipping_address TEXT NOT NULL,
      special_instruction TEXT NOT NULL,
      status order_status NOT NULL,
      total_price DECIMAL(10,2) NOT NULL,
      payment_method payment_method_type NOT NULL,
      date_completed DATE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),

      -- Foreign key
      CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE 
);

-- order item table
CREATE TABLE order_items (
      order_item_id SERIAL PRIMARY KEY,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      name TEXT NOT NULL,
      image_url TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      quantity INT NOT NULL,
      subtotal DECIMAL(10,2) NOT NULL,
      delivery_fee DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      -- Foreign key
      CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE, 
      CONSTRAINT fk_order_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- cart table
CREATE TABLE carts (
      cart_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,

      -- Foreign key
      CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- cart items table
CREATE TABLE cart_items(
      cart_item_id SERIAL PRIMARY KEY,
      cart_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      
      -- Foreign key
      CONSTRAINT fk_cart_id FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE CASCADE,
      CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- user favorites table
CREATE TABLE favorites (
      favorite_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,

      -- Foreign key
      CONSTRAINT fk_favorite_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- favorites items table
CREATE TABLE favorite_items(
      favorite_item_id SERIAL PRIMARY KEY,
      favorite_id INT NOT NULL,
      product_id INT NOT NULL,
      
      -- Foreign key
      CONSTRAINT fk_favorite_id FOREIGN KEY (favorite_id) REFERENCES favorites(favorite_id) ON DELETE CASCADE,
      CONSTRAINT fk_favorite_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- user reviews from the system to the products
CREATE TABLE reviews (
      review_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      -- context (optional depending on type)
      product_id INT NULL,
      order_id INT NULL,
      type TEXT NOT NULL CHECK (type IN ('product', 'system')),
      rating DECIMAL(3,2) NOT NULL CHECK (rating BETWEEN 0 AND 5),
      comment TEXT NOT NULL,
      is_featured_review BOOLEAN DEFAULT FALSE,
      is_replied BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),

      CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      CONSTRAINT fk_reviews_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
      CONSTRAINT fk_reviews_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

-- admin replies to user feedback
CREATE TABLE feedback_replies (
      reply_id SERIAL PRIMARY KEY,
      review_id INT NOT NULL,
      reply TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),

      CONSTRAINT fk_feedback_reply_review FOREIGN KEY (review_id) REFERENCES reviews(review_id) ON DELETE CASCADE,
      CONSTRAINT fk_feedback_reply_admin FOREIGN KEY (admin_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- notifications table
CREATE TYPE notif_types AS ENUM ('new_order', 'order_update', 'order_cancelled', 'new_user', 'promo', 'account_banned', 'account_active', 'review', 'admin_feedback');
CREATE TYPE target_role_type AS ENUM ('admin', 'user');
CREATE TABLE notifications (
      notif_id SERIAL PRIMARY KEY,
      user_id INT NULL,
      notif_type notif_types NOT NULL, -- e.g., 'order', 'promo', 'alert'
      target_role target_role_type NOT NULL,
      order_id INT,                     -- nullable, only used if notif_type = 'order'
      is_read BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      message TEXT NOT NULL,
      reply_id INT NULL,
      status order_status NULL,

      -- Foreign keys
      CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      CONSTRAINT fk_notif_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
      CONSTRAINT fk_feedback_replies FOREIGN KEY (reply_id) REFERENCES feedback_replies(reply_id) ON DELETE CASCADE
);

-- loyalty tiers or rules on how a user can acquire a promo based on its total spent
CREATE TABLE loyalty_tiers (
      id SERIAL PRIMARY KEY,
      tier_name VARCHAR(50) NOT NULL,
      required_spent NUMERIC(10,2) NOT NULL,
      discount_percent INTEGER NOT NULL CHECK (discount_percent > 0),
      valid_days INTEGER NOT NULL CHECK (valid_days > 0),
      created_at TIMESTAMP DEFAULT NOW()
);

-- table for all the promo codes given to a user together with its info 
CREATE TABLE user_promos (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      tier_id INTEGER NOT NULL,
      discount INTEGER NOT NULL CHECK (discount > 0),
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      
      CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
      CONSTRAINT fk_tier FOREIGN KEY(tier_id) REFERENCES loyalty_tiers(id) ON DELETE CASCADE
);

-- create a ban  table for users who are banned
CREATE TYPE ban_status as ENUM('active', 'revoked', 'expired');
CREATE TABLE user_bans (
      ban_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      reason TEXT NOT NULL,
      banned_at TIMESTAMP DEFAULT NOW(),
      expires_at TIMESTAMP,

      CONSTRAINT fk_ban_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- table for the recovery code
CREATE TABLE password_resets (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      code CHAR(6) NOT NULL,
      expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
      used BOOLEAN DEFAULT FALSE,

      CONSTRAINT fk_reset_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Optional: index for faster lookup by user_id
CREATE INDEX idx_password_resets_user_id ON password_resets(user_id);

-- default admin credentials
INSERT INTO users (username, email, role, password, hash_pass) values ('admin123', 'rustomgalicia253@gmail.com', 'admin', '12345', '$2b$10$KbQiQfK6Q8z1QYl0z3hJ8e3TQ6zF5Gq2Zk8z9KXJ7FhYj8YlGz0wO')

-- default loyalty tiers
INSERT INTO loyalty_tiers (
      tier_name,
      required_spent,
      discount_percent,
      valid_days
) VALUES
('Suki Starter', 500.00, 5, 7),
('Ka-Bites Regular', 1500.00, 10, 10),
('Pinoy Bites Loyal', 3000.00, 15, 14),
('Barkada VIP', 5000.00, 20, 30);

-- insert products data
INSERT INTO products (
      name,
      description,
      price,
      image_url,
      avg_rating,
      total_reviews,
      category,
      ingredients,
      steps,
      stock,
      is_new
) VALUES
(
      'Malungay Pandesal',
      'Classic Filipino bread roll with a light crunchy crumb coating',
      2.00,
      'pandesal',
      0,
      0,
      'Bread',
      '["Flour","Yeast","Sugar","Salt","Milk","Butter","Malunggay leaves","Bread crumbs"]'::jsonb,
      '["Mix ingredients until dough behaves","Knead like you''re mad at your keyboard","Add malunggay for instant health upgrade","Roll into small balls","Bake until the whole house smells amazing"]'::jsonb,
      0,
      false
),
(
      'Ensaymader',
      'Soft buttery brioche topped with sugar, butter, and grated cheese',
      5.50,
      'ensaymada',
      0,
      0,
      'Bread',
      '["Flour","Yeast","Butter","Sugar","Eggs","Milk","Cheese"]'::jsonb,
      '["Mix dough and let it rest like it''s on vacation","Roll dough into spiral shapes","Bake until golden and fluffy","Spread butter generously","Add sugar and cheese like calories don''t exist"]'::jsonb,
      0,
      false
),
(
      'Pan de Bisakol',
      'Sweet rolled bread filled with buttery sugary crumbs',
      3.25,
      'spanishBread',
      0,
      0,
      'Bread',
      '["Flour","Yeast","Sugar","Butter","Bread crumbs"]'::jsonb,
      '["Prepare soft dough","Add sweet crumb filling","Roll tightly like a burrito","Place on tray nicely","Bake until golden and delicious"]'::jsonb,
      0,
      false
),
(
      'Banana Shanghai',
      'Fried banana spring roll with caramelized sugar and jackfruit',
      3.50,
      'turon',
      0,
      0,
      'Fried',
      '["Saba banana","Brown sugar","Lumpia wrapper","Jackfruit","Cooking oil"]'::jsonb,
      '["Slice bananas like a pro","Roll them in sugar goodness","Wrap with lumpia wrapper tightly","Fry until golden and crispy","Try not to eat them immediately"]'::jsonb,
      0,
      false
),
(
      'Banana Qt',
      'Deep fried saba bananas coated in caramelized brown sugar',
      2.75,
      'bananaCue',
      0,
      0,
      'Fried',
      '["Saba bananas","Brown sugar","Cooking oil","Bamboo skewers"]'::jsonb,
      '["Fry bananas in hot oil","Add brown sugar for caramel magic","Let sugar coat the bananas","Stick them on skewers","Feel like a street food vendor"]'::jsonb,
      0,
      false
),
(
      'Putotoy',
      'Soft steamed rice cake commonly paired with butter or cheese',
      2.25,
      'puto',
      0,
      0,
      'Steamed',
      '["Rice flour","Sugar","Baking powder","Water","Cheese or butter"]'::jsonb,
      '["Mix batter until smooth","Pour into tiny molds","Steam until fluffy","Add cheese on top","Enjoy soft cloud-like puto"]'::jsonb,
      0,
      false
),
(
      'Puto Kutsinta',
      'Chewy brown rice cake topped with freshly grated coconut',
      2.50,
      'kutsinta',
      0,
      0,
      'Steamed',
      '["Rice flour","Brown sugar","Lye water","Annatto","Grated coconut"]'::jsonb,
      '["Mix ingredients until smooth","Pour into molds carefully","Steam until chewy magic happens","Top with coconut snow","Eat before others see it"]'::jsonb,
      0,
      false
),
(
      'Bibingka Ni Inday',
      'Rice cake baked in banana leaves topped with salted egg and cheese',
      4.50,
      'bibingka',
      0,
      0,
      'Rice Cakes',
      '["Rice flour","Coconut milk","Eggs","Sugar","Salted egg","Cheese","Banana leaves"]'::jsonb,
      '["Mix batter like pancake royalty","Line pan with banana leaves","Bake until fluffy","Add salted egg and cheese","Serve warm and feel festive"]'::jsonb,
      0,
      false
),
(
      'Puto ni Bongbong Marcos',
      'Purple steamed rice cake topped with coconut, butter, and brown sugar',
      4.75,
      'putoBumbong',
      0,
      0,
      'Rice Cakes',
      '["Purple rice flour","Butter","Brown sugar","Grated coconut"]'::jsonb,
      '["Steam purple rice mixture","Push it out like a purple noodle","Add butter immediately","Sprinkle coconut and sugar","Enjoy Christmas vibes anytime"]'::jsonb,
      0,
      true
),
(
      'Bibiko',
      'Sticky rice dessert cooked with coconut milk and topped with caramel latik',
      3.75,
      'biko',
      0,
      0,
      'Rice Cakes',
      '["Sticky rice","Coconut milk","Brown sugar","Latik"]'::jsonb,
      '["Cook sticky rice first","Add coconut milk and sugar","Stir until thick and sweet","Spread in tray","Top with latik like a dessert boss"]'::jsonb,
      0,
      false
),
(
      'Balanghoy Cake',
      'Rich balanghoy dessert topped with creamy custard layer',
      4.25,
      'cassavaCake',
      0,
      0,
      'Dessert',
      '["Cassava","Coconut milk","Eggs","Sugar","Condensed milk"]'::jsonb,
      '["Mix cassava batter","Bake until firm","Add custard topping","Bake again for creamy goodness","Slice and share (or not)"]'::jsonb,
      0,
      false
),
(
      'Letche Flan',
      'Rich caramel custard dessert with smooth creamy texture',
      4.50,
      'lecheFlan',
      0,
      0,
      'Dessert',
      '["Egg yolks","Condensed milk","Evaporated milk","Sugar"]'::jsonb,
      '["Melt sugar until caramel magic","Mix eggs and milk gently","Pour mixture into mold","Steam until silky smooth","Flip carefully like a dessert ninja"]'::jsonb,
      0,
      false
);
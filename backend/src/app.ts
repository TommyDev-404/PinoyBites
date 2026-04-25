import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan'; // HTTP request logger middleware
import cors from 'cors';
import { errorHandler } from './middleware/error.middleware';
import cookieParser from "cookie-parser";

// user routes import
import authRoutes from './routes/user/auth.routes';
import accountRoutes from './routes/user/account.routes';
import productRoutes from './routes/user/product.routes';
import cartRoutes from './routes/user/cart.routes';
import orderRoutes from './routes/user/order.routes';
import ratingRoutes from './routes/user/rating.routes';
import reviewsRoutes from './routes/user/featured-review.routes';
import notificationRoutes from './routes/user/notification.routes'; 

// admin routes import
import allOrdersRoutes from './routes/admin/orders.routes';
import allProductsRoutes from './routes/admin/products.routes'; 
import allCustomersRoutes from './routes/admin/customer.routes';
import promoRoutes from './routes/admin/promo.routes';  
import dashboardRoutes from './routes/admin/dashboard.routes'; 
import adminNotifRoutes from './routes/admin/notification.routes'; 
import adminAuthRoutes from './routes/admin/auth.routes';
import adminFeedbackRoutes from './routes/admin/feeedback.routes';

// auth user checker
import userCheckerRoutes from './routes/acccount-info.routes';

const app: Application = express();

// Middleware
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan('dev'));

// User authentication Routes
app.use('/auth', authRoutes);

// User Routes
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/notifications', notificationRoutes);
app.use('/account', accountRoutes);
app.use('/rating', ratingRoutes);
app.use('/reviews', reviewsRoutes);

// Admin Routes
app.use('/admin/auth', adminAuthRoutes);
app.use('/admin/notifications', adminNotifRoutes);
app.use('/admin/dashboard', dashboardRoutes);
app.use('/admin/orders', allOrdersRoutes);
app.use('/admin/products', allProductsRoutes);
app.use('/admin/customers', allCustomersRoutes);
app.use('/admin/promo', promoRoutes);
app.use('/admin/feedbacks', adminFeedbackRoutes);

// Check who is the logged in user
app.use('/auth/account-check', userCheckerRoutes);

// Health Check
app.get('/', (req: Request, res: Response) => {
      res.send('PinoyBites API is running...');
});

// Error Handling
app.use(errorHandler);

export default app;
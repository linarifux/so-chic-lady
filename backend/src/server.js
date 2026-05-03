import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Import our new routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors(
  {
    origin: [
      "https://maps.googleapis.com",
      "http://localhost:5173",
      "http://localhost:5000",
    ]
  }
));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Basic Route for testing
app.get('/', (req, res) => {
  res.send('So Chic Lady API is running...');
});

// --- API Routes ---
// Any request that goes to /api/products will be handled by productRoutes
app.use('/api/products', productRoutes);

// Any request that goes to /api/users will be handled by userRoutes
app.use('/api/users', userRoutes);

// Custom Error Middleware (Must be placed after all routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
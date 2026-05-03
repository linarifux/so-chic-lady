import express from 'express';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController.js';

// Import our security bouncers!
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route: /api/products
// Anyone can GET all products. Only Admins can POST a new product.
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

// Route: /api/products/:id
// Anyone can GET one product. Only Admins can UPDATE (put) or DELETE it.
router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
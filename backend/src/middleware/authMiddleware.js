import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - Verify the JWT Token
export const protect = async (req, res, next) => {
  let token;

  // Check if the token is passed in the authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (Format: "Bearer [token]")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sochiclady_secret_key');

      // Find the user in the database (excluding the password) and attach it to the request object
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      next(new Error('Non autorisé, token invalide'));
    }
  }

  if (!token) {
    res.status(401);
    next(new Error('Non autorisé, pas de token'));
  }
};

// Admin middleware - Check if the user is an admin
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    next(new Error('Non autorisé en tant qu\'administrateur'));
  }
};
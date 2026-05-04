import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by email
    const user = await User.findOne({ email });

    // If user exists and password matches
    if (user && (await user.matchPassword(password))) {
      
      // Generate a JSON Web Token (JWT) valid for 30 days
      const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET || 'sochiclady_secret_key', // We will add JWT_SECRET to your .env later
        { expiresIn: '30d' }
      );

      // Send the user data and token back to the frontend
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      });
      
    } else {
      res.status(401); // 401 means Unauthorized
      throw new Error('Email ou mot de passe incorrect');
    }
  } catch (error) {
    next(error);
  }
};
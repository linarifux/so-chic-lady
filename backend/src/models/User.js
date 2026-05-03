import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom est requis'],
    },
    email: {
      type: String,
      required: [true, 'L\'email est requis'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est requis'],
      minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // Customers are false by default, you will be true
    },
    // Future expansion: we can add order history array here later
  },
  {
    timestamps: true,
  }
);

// This safely compares the plain-text password typed by the user with the hashed one in the DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
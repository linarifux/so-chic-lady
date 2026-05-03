import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/User.js';
import Product from './models/Product.js';
import connectDB from './config/db.js'; // Assuming you extracted your DB connection logic here

dotenv.config();

// Connect to the database
connectDB();

const importData = async () => {
  try {
    // 1. Wipe the database clean to avoid duplicates
    await Product.deleteMany();
    await User.deleteMany();

    // 2. Insert Users
    await User.insertMany(users);

    // 3. Insert Products
    await Product.insertMany(products);

    console.log('✅ Données importées avec succès ! (Data Imported)');
    process.exit();
  } catch (error) {
    console.error(`❌ Erreur lors de l'importation : ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Wipe everything
    await Product.deleteMany();
    await User.deleteMany();

    console.log('🗑️ Données supprimées avec succès ! (Data Destroyed)');
    process.exit();
  } catch (error) {
    console.error(`❌ Erreur lors de la suppression : ${error.message}`);
    process.exit(1);
  }
};

// Check what command was passed in the terminal
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom du produit est requis'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Le prix est requis'],
      min: [0, 'Le prix ne peut pas être négatif'],
    },
    category: {
      type: String,
      required: [true, 'La catégorie est requise'],
      enum: ['tops', 'dresses', 'outerwear', 'accessories'], // Matches your frontend filters
    },
    image: {
      type: String,
      required: [true, 'L\'image principale est requise'],
    },
    hoverImage: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'La description est requise'],
    },
    sizes: {
      type: [String],
      required: true,
      default: ['S', 'M', 'L'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
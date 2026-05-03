import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Produit non trouvé');
    }
  } catch (error) {
    res.status(404);
    next(new Error('Produit non trouvé / ID invalide'));
  }
};

// --- ADMIN ONLY OPERATIONS ---

// @desc    Create a product (Draft)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      name: 'Nouveau Produit',
      price: 0,
      category: 'tops',
      image: 'https://via.placeholder.com/800x1200?text=Image+Produit',
      description: 'Description du produit...',
      sizes: ['S', 'M', 'L'],
      inStock: false,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, hoverImage, category, sizes, inStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.hoverImage = hoverImage || product.hoverImage;
      product.category = category || product.category;
      product.sizes = sizes || product.sizes;
      // We check undefined for booleans so false doesn't trigger the fallback
      product.inStock = inStock !== undefined ? inStock : product.inStock; 

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Produit non trouvé');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Produit supprimé avec succès' });
    } else {
      res.status(404);
      throw new Error('Produit non trouvé');
    }
  } catch (error) {
    next(error);
  }
};
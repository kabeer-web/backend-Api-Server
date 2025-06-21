const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();

// ✅ CORS Setup (Allow only your dashboard)
app.use(cors({
  origin: "https://k-flex-dashboard.vercel.app",
  credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // static folder

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://Kaberqadir:123@cluster0.blp7f13.mongodb.net/allproducts", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB...'))
.catch(err => console.error('❌ Could not connect to MongoDB...', err));

// ✅ Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String
});

const Product = mongoose.model('Product', productSchema);

// ✅ Multer Setup for File Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// ✅ Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

// ✅ Add product
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const product = new Product({ name, description, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).send('Failed to add product');
  }
});

// ✅ Update product
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData = { name, description, price };
    if (image) updatedData.image = image;

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedProduct) return res.status(404).send('Product not found');

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).send('Failed to update product');
  }
});

// ✅ Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Product not found');
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).send('Failed to delete product');
  }
});

// ✅ Server Listen (only for local dev)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;

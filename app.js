const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// ✅ CORS Configuration for frontend hosted on Vercel
app.use(cors({
  origin: "https://k-flex-dashboard.vercel.app", // <-- allow your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://Kaberqadir:123@cluster0.blp7f13.mongodb.net/allproducts", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Product Schema & Model
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

// Get one product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

// Add new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).send('Failed to create product');
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image },
      { new: true }
    );
    if (!updated) return res.status(404).send('Product not found');
    res.json(updated);
  } catch (err) {
    res.status(400).send('Failed to update');
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Product not found');
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).send('Failed to delete');
  }
});

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

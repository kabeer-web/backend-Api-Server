const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Kaberqadir:123@cluster0.blp7f13.mongodb.net/allproducts", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  image: String
});

const Product = mongoose.model('Product', productSchema);

const products = [
  { name: 'Shirt', category: 'Shirts', price: 25.00, image: 'https://image.spreadshirtmedia.net/image-server/v1/products/T875A2PA5134PT17X43Y37D193212613W20830H24997/views/1,width=650,height=650,appearanceId=2,backgroundColor=ffffff.jpg' },
  { name: 'Shirt', category: 'Shirts', price: 30.00, image: 'https://i.pinimg.com/564x/25/ea/dc/25eadc5ea96e8fd0ecfcc6103786ab2c.jpg' },
  { name: 'Shoes', category: 'Shoes', price: 50.00, image: 'https://ae01.alicdn.com/kf/S4492940afecc4b6db6b5967428ff29fau/Children-Sneakers-High-top-Sneakers-Lace-up-2024-New-Children-Fashion-Casual-Shoes-Boys-Sport-Shoes.jpg' },
  { name: 'Shoes', category: 'Shoes', price: 70.00, image: 'https://static-01.daraz.pk/p/17a46295d6cbfb3e6e72e99c602ebadb.jpg' },
  { name: 'Laptop', category: 'Laptops', price: 1000.00, image: 'https://i.pcmag.com/imagery/roundups/01hiB08j7yaJGJmPl2YhRRH-59..v1713199550.jpg' },
  { name: 'Laptop', category: 'Laptops', price: 1200.00, image: 'https://www.mega.pk/items_images/HP+15-DA1075TU+Core+i5+8th+Generation+Laptop+4GB+RAM+1TB+HDD+Natural+Silver+Price+in+Pakistan%2C+Specifications%2C+Features_-_19596.webp' },
  { name: 'Watch', category: 'Watches', price: 150.00, image: 'https://static-01.daraz.pk/p/c25d86550629262b1b30c31850b421ee.jpg_750x400.jpg_.webp' },
  { name: 'Watch', category: 'Watches', price: 200.00, image: 'https://img.etimg.com/thumb/width-1200,height-1200,imgsize-24688,resizemode-75,msid-104399247/top-trending-products/electronics/accessories/smartwatches-below-500-wrist-tech-on-a-budget.jpg' },
  { name: 'Cap', category: 'Caps', price: 15.00, image: 'https://alprints.com/wp-content/uploads/2018/04/caps-printing.jpg' },
  { name: 'Cap', category: 'Caps', price: 20.00, image: 'https://static-01.daraz.pk/p/054d350a3bf48a51828e96c96524e792.jpg_750x400.jpg_.webp' },
  { name: 'Earbuds', category: 'Earbuds', price: 75.00, image: 'https://images.priceoye.pk/n35-gaming-wireless-earbuds-pakistan-priceoye-1qm5j-500x500.webp' },
  { name: 'Earbuds', category: 'Earbuds', price: 100.00, image: 'https://megazone.pk/wp-content/uploads/2023/02/71WN8yTlSL.jpg' },
  { name: 'wall clock', category: 'Earbuds', price: 100.00, image: 'https://i0.wp.com/hajverydecor.com/wp-content/uploads/2021/06/2.jpg?fit=800%2C800&ssl=1' },
  { name: 'wallet', category: 'Earbuds', price: 100.00, image: 'https://www.kpopstore.pk/cdn/shop/products/d533277bb7b24d324bd7fa0bfdd572bd_800x.jpg?v=1676926958' },
  { name: 'wallet', category: 'Earbuds', price: 100.00, image: 'https://www.approxclothing.com/wp-content/uploads/2023/09/20230905_224219-copy.jpg' }
];

async function insertSampleData() {
  try {
    await Product.deleteMany({}).maxTimeMS(30000); // Increase timeout if needed, e.g., 30 seconds
    await Product.insertMany(products);
    console.log('Sample data inserted');
  } catch (err) {
    console.error('Error inserting sample data:', err);
  } finally {
    mongoose.disconnect();
  }
}

insertSampleData();

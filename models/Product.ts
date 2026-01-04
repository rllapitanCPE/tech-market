import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  shopeeLink: String,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
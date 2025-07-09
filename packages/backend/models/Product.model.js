import mongoose from 'mongoose';

// Schéma pour les avis, qui sera imbriqué dans le produit
const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
  },
  { timestamps: true },
);

// Schéma principal pour les produits
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    sku: { type: String, required: true, unique: true, trim: true },
    status: { type: String, enum: ['active', 'draft', 'archived'], default: 'draft' },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    brand: { type: String, trim: true },
    images: { type: [String], required: true },
    price: { type: Number, required: true, min: 0 },
    offerPrice: { type: Number, min: 0 },
    stock: { type: Number, required: true, default: 0, min: 0 },
    reviews: { type: [reviewSchema] },
    isCampaignProduct: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

// Champ virtuel pour calculer la note moyenne
productSchema.virtual('averageRating').get(function () {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / this.reviews.length) * 10) / 10;
});

// Champ virtuel pour compter le nombre d'avis
productSchema.virtual('totalReviews').get(function () {
  return this.reviews ? this.reviews.length : 0;
});

const Product = mongoose.model('Product', productSchema);
export default Product;

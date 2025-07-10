import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom de la catégorie est obligatoire.'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // Option pour des catégories imbriquées (ex: Vêtements > Hommes > T-shirts)
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
  },
  { timestamps: true },
);

// Middleware pour générer automatiquement le slug à partir du nom
categorySchema.pre('validate', function (next) {
  if (this.name && this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);
export default Category;

import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom du tag est obligatoire.'],
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
  },
  { timestamps: true },
);

// Middleware pour générer le slug
tagSchema.pre('validate', function (next) {
  if (this.name && this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
  next();
});

const Tag = mongoose.model('Tag', tagSchema);
export default Tag;

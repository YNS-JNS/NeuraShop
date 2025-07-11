import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Importer les modèles
import Product from '../src/models/Product.model.js';
import Category from '../src/models/Category.model.js';
import Tag from '../src/models/Tag.model.js';
import User from '../src/models/User.model.js'; // Pour nettoyer les utilisateurs aussi

// Importer les données
// import { categories, tags, products } from './seed-data.js';

// Importez uniquement les catégories et tags depuis le fichier de données
import { categories, tags } from './seed-data.js';

// Configuration de l'environnement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding...');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    // 1. Nettoyer la base de données
    console.log('Clearing data...');
    await Product.deleteMany();
    await Category.deleteMany();
    await Tag.deleteMany();
    console.log('Data cleared.');

    // 2. Insérer les catégories et les tags
    const createdCategories = await Category.insertMany(categories);
    const createdTags = await Tag.insertMany(tags);
    console.log('Categories & Tags Imported!');

    // 3. --- NOUVELLE LOGIQUE DE GÉNÉRATION ---
    console.log('Generating products...');
    const productsToCreate = [];
    const numberOfProducts = 50; // <-- Augmentez ce nombre pour plus de données !

    for (let i = 1; i <= numberOfProducts; i++) {
      // Sélectionner une catégorie et un tag au hasard pour chaque produit
      const randomCategory = createdCategories[i % createdCategories.length];
      const randomTag1 = createdTags[i % createdTags.length];
      const randomTag2 = createdTags[(i + 1) % createdTags.length];

      const product = {
        name: `Produit Test ${i}`,
        sku: `SKU-TEST-${String(i).padStart(4, '0')}`,
        status: i % 10 === 0 ? 'draft' : 'active', // 1 produit sur 10 est en brouillon
        description: `Ceci est la description détaillée pour le produit de test numéro ${i}. Il appartient à la catégorie ${randomCategory.name}.`,
        category: randomCategory._id,
        brand: `Marque ${String.fromCharCode(65 + (i % 5))}`, // Marque A, B, C, D, E
        images: [`https://example.com/images/product-${i}.jpg`],
        price: parseFloat((Math.random() * 200 + 10).toFixed(2)), // Prix aléatoire entre 10 et 210
        stock: Math.floor(Math.random() * 250), // Stock aléatoire
        tags: [randomTag1._id, randomTag2._id],
        isCampaignProduct: i % 7 === 0, // 1 produit sur 7 est en campagne
      };

      // Ajouter un prix promotionnel pour certains produits
      if (i % 5 === 0) {
        product.offerPrice = parseFloat((product.price * 0.8).toFixed(2));
      }

      productsToCreate.push(product);
    }
    console.log(`${numberOfProducts} products generated.`);

    // 4. Insérer les produits générés
    await Product.insertMany(productsToCreate);
    console.log('Products Imported!');

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error during import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();
    await Tag.deleteMany();
    // await User.deleteMany();

    console.log('🔥 Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error during destruction: ${error}`);
    process.exit(1);
  }
};

// Logique pour exécuter le script depuis la ligne de commande
const run = async () => {
  await connectDB();

  if (process.argv[2] === '-d') {
    await destroyData();
  } else {
    await importData();
  }
};

run();

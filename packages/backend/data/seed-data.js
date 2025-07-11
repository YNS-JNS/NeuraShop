// Les catégories et les tags de base restent les mêmes.
export const categories = [
  { name: 'Électronique', description: 'Gadgets et appareils électroniques.' },
  { name: 'Vêtements', description: 'Vêtements pour hommes, femmes et enfants.' },
  { name: 'Livres', description: 'Livres de fiction, non-fiction et éducatifs.' },
  { name: 'Maison & Jardin', description: 'Articles pour la maison et le jardinage.' },
  { name: 'Sports & Loisirs', description: 'Équipements sportifs et articles de loisir.' },
];

export const tags = [
  { name: 'Nouveauté' },
  { name: 'En Promotion' },
  { name: 'Éco-responsable' },
  { name: 'Meilleure Vente' },
  { name: 'Fabriqué en France' },
  { name: 'Édition Limitée' },
];

// Nous n'avons plus besoin de la liste de produits statiques ici.
// Elle sera générée dynamiquement dans le seeder.

// Note : Pour les produits, nous allons assigner les catégories et tags par leur nom.
// Le script de seeding se chargera de trouver les bons IDs.
// export const products = [
//   {
//     name: 'Smartphone Pro X',
//     sku: 'SP-PRO-X',
//     status: 'active',
//     description: 'Le dernier smartphone avec une caméra 48MP et un écran OLED.',
//     categoryName: 'Électronique',
//     brand: 'TechCorp',
//     images: ['https://example.com/images/phone-1.jpg'],
//     price: 899.99,
//     offerPrice: 849.99,
//     stock: 150,
//     tagsNames: ['Nouveauté', 'Meilleure Vente'],
//   },
//   {
//     name: 'Casque Audio sans fil',
//     sku: 'HDPH-BT-500',
//     status: 'active',
//     description: "Casque avec réduction de bruit active et 30h d'autonomie.",
//     categoryName: 'Électronique',
//     brand: 'AudioBrand',
//     images: ['https://example.com/images/headphones-1.jpg'],
//     price: 199.99,
//     stock: 200,
//     tagsNames: ['En Promotion'],
//   },
//   {
//     name: 'T-Shirt en Coton Bio',
//     sku: 'TS-COT-BIO-M',
//     status: 'active',
//     description: 'T-shirt confortable et durable, 100% coton biologique.',
//     categoryName: 'Vêtements',
//     brand: 'EcoWear',
//     images: ['https://example.com/images/tshirt-1.jpg'],
//     price: 29.99,
//     stock: 500,
//     tagsNames: ['Éco-responsable'],
//   },
//   {
//     name: 'Le Labyrinthe des Esprits',
//     sku: 'BOOK-LAB-ESP',
//     status: 'draft',
//     description: 'Un thriller captivant par un auteur de renom.',
//     categoryName: 'Livres',
//     brand: 'Éditions Plume',
//     images: ['https://example.com/images/book-1.jpg'],
//     price: 22.5,
//     stock: 80,
//     tagsNames: ['Nouveauté'],
//   },
//   {
//     name: "Ensemble d'outils de jardinage",
//     sku: 'GARDEN-TOOL-SET',
//     status: 'active',
//     description: "Set complet d'outils en acier inoxydable pour tous vos besoins de jardinage.",
//     categoryName: 'Maison & Jardin',
//     brand: 'GreenThumb',
//     images: ['https://example.com/images/gardentools-1.jpg'],
//     price: 49.99,
//     stock: 120,
//     tagsNames: ['Fabriqué en France'],
//   },
//   {
//     name: 'Jean Slim Fit',
//     sku: 'JEAN-SLIM-32',
//     status: 'archived',
//     description: 'Un jean moderne et confortable pour toutes les occasions.',
//     categoryName: 'Vêtements',
//     brand: 'DenimCo',
//     images: ['https://example.com/images/jean-1.jpg'],
//     price: 79.99,
//     stock: 0,
//     tagsNames: [],
//   },
// ];

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler.js';
// --- Importation des Routes ---
// TODO: Importer les routes ici
import productAdminRoutes from './routes/admin/product.routes.js';
import productPublicRoutes from './routes/public/product.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// --- Configuration des Middlewares ---

// Options pour CORS (Cross-Origin Resource Sharing)
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware pour parser les requêtes JSON (limite de taille pour la sécurité)
app.use(express.json({ limit: '16kb' }));

// Middleware pour parser les requêtes URL-encoded
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Pour pouvoir lire/écrire des cookies
app.use(cookieParser()); 


// --- Déclaration des Routes ---
// On utilise une version d'API (v1), c'est une bonne pratique
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin/products', productAdminRoutes);
app.use('/api/v1/public/products', productPublicRoutes);

// --- Middleware de Gestion des Erreurs ---
// Doit être le dernier middleware ajouté
app.use(errorHandler);

export default app;

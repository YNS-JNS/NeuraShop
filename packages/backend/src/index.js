import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const PORT = process.env.PORT || 8000;

/**
 * Fonction principale pour démarrer le serveur.
 * Elle se connecte d'abord à la base de données,
 * puis lance le serveur Express.
 */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();

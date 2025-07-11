import multer from 'multer';
import path from 'path';

// Configuration du stockage pour Multer
const storage = multer.diskStorage({
  /**
   * Définit le dossier de destination pour les fichiers uploadés.
   * Les fichiers seront stockés temporairement ici avant d'être envoyés à Cloudinary.
   */
  destination: function (req, file, cb) {
    // Le chemin est relatif à la racine du projet backend
    cb(null, './public/temp');
  },
  /**
   * Définit le nom du fichier. On garde le nom original pour plus de simplicité.
   */
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

/**
 * Middleware Multer configuré pour gérer les uploads de fichiers.
 */
export const upload = multer({
  storage,
  // On pourrait ajouter ici des limites de taille ou des filtres de type de fichier
  // limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5MB
});

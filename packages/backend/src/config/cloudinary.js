import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration du SDK Cloudinary avec les variables d'environnement
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Fonction pour uploader un fichier local vers Cloudinary dans un dossier spécifique.
 * @param {string} localFilePath - Le chemin du fichier temporaire sur le serveur.
 * @param {string} folderName - Le nom du dossier de destination sur Cloudinary.
 * @returns {Promise<object|null>} - L'objet de réponse de Cloudinary ou null en cas d'échec.
 */
const uploadOnCloudinary = async (localFilePath, folderName = 'default_folder') => {
  try {
    if (!localFilePath) return null;

    // Uploader le fichier sur Cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
        folder: folderName,
        resource_type: 'auto', // Détecte automatiquement le type de fichier (image, vidéo, etc.)
      });

    // Le fichier a été uploadé avec succès
    // console.log("File is uploaded on Cloudinary:", response.url);

    // Supprimer le fichier local temporaire après l'upload
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // En cas d'échec, supprimer le fichier local temporaire
    fs.unlinkSync(localFilePath);
    console.error('Cloudinary upload failed:', error);
    return null;
  }
};

export { uploadOnCloudinary };

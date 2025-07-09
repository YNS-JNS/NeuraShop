import mongoose from 'mongoose';

/**
 * Établit la connexion à la base de données MongoDB.
 * @returns {Promise<void>} Une promesse qui se résout lorsque la connexion est établie.
 */
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`\n☘️  MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection FAILED:', error);
    process.exit(1);
  }
};

export default connectDB;

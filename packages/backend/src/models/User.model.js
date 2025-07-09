import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom est obligatoire.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "L'email n'est pas valide."],
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est obligatoire.'],
      minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères.'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    // On pourrait ajouter plus tard un refreshToken pour une sécurité accrue
    // refreshToken: { type: String }
  },
  { timestamps: true },
);

/**
 * Middleware Mongoose (hook) qui s'exécute AVANT de sauvegarder un document.
 * Il est utilisé ici pour hacher le mot de passe si celui-ci a été modifié.
 * On ne stocke JAMAIS les mots de passe en clair dans la base de données.
 */
userSchema.pre('save', async function (next) {
  // Ne hache le mot de passe que s'il a été modifié (ou s'il est nouveau)
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Méthode pour comparer le mot de passe fourni avec celui haché dans la base de données.
 * @param {string} candidatePassword - Le mot de passe entré par l'utilisateur.
 * @returns {Promise<boolean>} - True si les mots de passe correspondent.
 */
userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * Méthode pour générer un JSON Web Token (JWT) d'accès.
 * Ce token sera utilisé pour authentifier l'utilisateur sur les routes protégées.
 * @returns {string} - Le token JWT signé.
 */
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    },
  );
};

const User = mongoose.model('User', userSchema);
export default User;

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { APIFeatures } from '../utils/APIFeatures.js';

/**
 * Factory pour créer un handler de suppression générique.
 * @param {import('mongoose').Model} Model - Le modèle Mongoose à utiliser.
 */
export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new ApiError(404, 'No document found with that ID'));
    }
    res.status(204).json(new ApiResponse(204, null, 'Document deleted successfully'));
  });

/**
 * Factory pour créer un handler de mise à jour générique.
 * @param {import('mongoose').Model} Model - Le modèle Mongoose à utiliser.
 */
export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new ApiError(404, 'No document found with that ID'));
    }
    res.status(200).json(new ApiResponse(200, doc, 'Document updated successfully'));
  });

/**
 * Factory pour créer un handler de création générique.
 * @param {import('mongoose').Model} Model - Le modèle Mongoose à utiliser.
 */
export const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json(new ApiResponse(201, doc, 'Document created successfully'));
  });

/**
 * Factory pour créer un handler de récupération d'un document générique.
 * @param {import('mongoose').Model} Model - Le modèle Mongoose à utiliser.
 * @param {object} [popOptions] - Options pour Mongoose populate.
 */
export const getOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(new ApiError(404, 'No document found with that ID'));
    }
    res.status(200).json(new ApiResponse(200, doc));
  });

/***
 * Factory pour créer un handler de récupération de tous les documents génériques.
 * Gère maintenant la recherche textuelle pour tous les modèles qui le supportent.
 * @param {import('mongoose').Model} Model - Le modèle Mongoose à utiliser.
 */
export const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    // 1. Préparer les requêtes
    const queryForFeatures = { ...req.query };
    let mongoQuery = Model.find();

    // 2. Gérer la recherche textuelle comme un cas spécial
    if (req.query.search) {
      // Vérifier si le modèle a un index de texte pour éviter les erreurs
      // Note : `Model.schema.indexes()` peut être complexe, une vérification sur le champ est plus simple.
      // Pour l'instant, on suppose que seuls les produits l'ont, mais cette logique est extensible.
      if (Model.modelName === 'Product') {
        mongoQuery = mongoQuery.find({ $text: { $search: req.query.search } });
      }
      // On retire 'search' pour que .filter() ne le traite pas
      delete queryForFeatures.search;
    }

    // 3. Appliquer les autres fonctionnalités via APIFeatures
    const features = new APIFeatures(mongoQuery, queryForFeatures)
      .filter()
      .sort() // .sort() gère déjà la pertinence si req.query.search existe
      .limitFields()
      .paginate();

    // 4. Exécuter la requête principale
    const docs = await features.query;

    // 5. Gérer le comptage pour la pagination
    let countQuery = Model.find();
    if (req.query.search && Model.modelName === 'Product') {
      countQuery = countQuery.find({ $text: { $search: req.query.search } });
    }
    const totalQueryFeatures = new APIFeatures(countQuery, queryForFeatures).filter();
    const totalDocuments = await Model.countDocuments(totalQueryFeatures.query.getFilter());

    // 6) Envoyer la réponse
    res.status(200).json(
      new ApiResponse(
        200,
        {
          results: docs.length,
          data: docs,
        },
        'Documents retrieved successfully',
        {
          pagination: {
            currentPage: parseInt(req.query.page, 10) || 1,
            limit: parseInt(req.query.limit, 10) || 100,
            totalPages: Math.ceil(totalDocuments / (parseInt(req.query.limit, 10) || 100)),
            totalDocuments,
          },
        },
      ),
    );
  });

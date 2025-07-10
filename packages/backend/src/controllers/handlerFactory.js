import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

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

/**
 * Factory pour créer un handler de récupération de tous les documents génériques.
 * @param {import('mongoose').Model} Model - Le modèle Mongoose à utiliser.
 */
export const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    // Pour des fonctionnalités de filtrage avancées plus tard
    const features = {};
    const docs = await Model.find(features);
    res.status(200).json(new ApiResponse(200, docs));
  });

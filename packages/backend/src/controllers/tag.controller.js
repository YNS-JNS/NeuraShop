import Tag from '../models/Tag.model.js';
import * as factory from './handlerFactory.js';

export const createTag = factory.createOne(Tag);
export const getAllTags = factory.getAll(Tag);
export const getTag = factory.getOne(Tag);
export const updateTag = factory.updateOne(Tag);
export const deleteTag = factory.deleteOne(Tag);

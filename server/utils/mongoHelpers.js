import { Types } from 'mongoose';

export const mongoQueryBuilder = (operator, value) => ({ [`$${operator}`]: value });

export const newMongoId = () => Types.ObjectId();

export const MongoIdType = id => Types.ObjectId(id);

export const IsValidMongoId = id => Types.ObjectId.isValid(id);

export const compareMongoId = (x, y) => x.toString() === y.toString();

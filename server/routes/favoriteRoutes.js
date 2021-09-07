import { Router } from 'express';
import { validate } from '../middleware';
import { Favorite } from '../models';
import { idSchema } from '../services/yup';
import {
  aggregateQuery,
  cleanMongoObject,
  createDocumentQuery,
  createLookup,
  createMatch,
  findOneAndDeleteQuery,
  findOneQuery,
  isNotEmptyArray,
  MongoIdType
} from '../utils';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const query = [
      createMatch({ userId: MongoIdType(req.user.id) }),
      createLookup({
        from: 'movies',
        localField: 'movieId',
        foreignField: '_id',
        as: 'movie_details'
      })
    ];

    const records = await aggregateQuery(Favorite, query);

    // const records = await findQuery(Favorite, { userId: req.user.id });
    if (isNotEmptyArray(records)) return res.status(200).send(cleanMongoObject(records));
    res.status(404).send({ message: "don't have a favorite list" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put('/:id', validate(idSchema, 'params'), async (req, res) => {
  let record;
  const params = { movieId: req.params.id, userId: req.user.id };
  try {
    record = await findOneQuery(Favorite, params);
    record = record ? await findOneAndDeleteQuery(Favorite, params) : await createDocumentQuery(Favorite, params);
    res.status(200).send(cleanMongoObject(record));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;

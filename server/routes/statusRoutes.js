import { Router } from 'express';
import { validate } from '../middleware';
import { Status } from '../models';
import { idSchema, listSchema, querySchema } from '../services/yup';
import {
  aggregateQuery,
  cleanMongoObject,
  createLookup,
  createMatch,
  findOneAndDeleteQuery,
  findOneAndUpdateQuery,
  findOneQuery,
  isNotEmptyArray,
  MongoIdType
} from '../utils';

const router = new Router();

router.get('/:id', validate(idSchema, 'params'), async (req, res) => {
  try {
    const record = await findOneQuery(Status, { movieId: req.params.id, userId: req.user.id });
    if (record) return res.status(200).send(record.status);
    res.status(404).send({ message: 'The movie has no status' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/', validate(querySchema, 'query'), async (req, res) => {
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

    const records = await aggregateQuery(Status, query);
    // const records = await findQuery(Status, { userId: req.user.id });
    if (isNotEmptyArray(records)) return res.status(200).send(cleanMongoObject(records));
    res.status(404).send({ message: `There is no movies in ${req.query.sortBy}` });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/', validate(listSchema, 'body'), async (req, res) => {
  const { status, movieId } = req.body;
  const params = { movieId, userId: req.user.id };
  try {
    const record = await findOneAndUpdateQuery(Status, params, { $set: { status } }, { upsert: true, new: true });
    res.status(200).send(cleanMongoObject(record));
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: 'something went wrong' });
  }
});

router.delete('/:id', validate(idSchema, 'params'), async (req, res) => {
  try {
    const record = await findOneAndDeleteQuery(Status, { movieId: req.params.id, userId: req.user.id });
    if (record) return res.status(200).send({ message: 'successfully removed' });
    res.status(500).send({ message: "something went wrong, can't delete" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;

import { Router } from 'express';
import { validate } from '../middleware';
import { Movie } from '../models';
import { movieSchema } from '../services/yup';
import { cleanMongoObject, createDocumentQuery, findOneQuery } from '../utils';

const router = Router();

router.get('/:imdbID', async (req, res) => {
  try {
    const record = await findOneQuery(Movie, { imdbID: req.params.imdbID });
    if (record) return res.status(200).send(cleanMongoObject(record));
    res.status(404).send({ message: 'the movie is not present' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', validate(movieSchema, 'body'), async (req, res) => {
  try {
    const record = await createDocumentQuery(Movie, { ...req.body, imdbRating: +req.body.imdbRating });
    res.status(200).send(cleanMongoObject(record));
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;

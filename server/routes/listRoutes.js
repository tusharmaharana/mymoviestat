import { Router } from 'express';
import { StatusEnum, TypeEnum } from '../constants';
import { ensureAuth, validate } from '../middleware';
import List from '../models/List';
import { recordSchema } from '../services/yup';

const router = Router();

router.use(ensureAuth);

router.get('/title/:id', async (req, res) => {
  try {
    const record = await List.findOne({ imdbID: req.params.id, userId: req.user.id }).select('favourite status');
    if (record) res.status(200).send(record);
    else res.status(404).send({ message: 'The requested movie is not present' });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

router.put('/title/:id/:prop/:value', async (req, res) => {
  const { id: imdbID, prop, value } = req.params;
  const { id: userId } = req.user;
  let record;

  try {
    switch (true) {
      case prop === 'favourite' && value === 'toggle':
        record = await List.findOne({ imdbID, userId });
        record.favourite = !record.favourite;
        await record.save();
        res.status(200).send({ message: 'successfully toggled favourite' });
        break;

      case prop === 'status' && StatusEnum.hasOwnProperty(value):
        record = await List.findOneAndUpdate(
          { imdbID, userId },
          { $set: { status: StatusEnum[value] } },
          { new: true }
        );
        res.status(200).send({ message: 'successfully updated status' });
        break;

      case prop === 'status' && value === 'delete':
        record = await List.findOneAndUpdate({ imdbID, userId }, { $unset: { status: '' } }, { new: true });
        res.status(200).send({ message: 'successfully deleted status' });
        break;

      default:
        res.status(404).send({ message: 'not found' });
        return;
    }

    if (!record.favourite && !record.status) {
      await List.deleteOne({ imdbID, userId });
    }
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

router.get('/:type', async (req, res) => {
  const { type } = req.params;
  const { id: userId } = req.user;
  let results;

  try {
    switch (true) {
      case type === 'favourites':
        results = await List.find({ userId, favourite: true }).select('-status');
        break;
      case StatusEnum.hasOwnProperty(type):
        results = await List.find({ userId, status: StatusEnum[type] }).select('-favourite');
        break;
      case TypeEnum.hasOwnProperty(type):
        results = await List.find({ userId, type: TypeEnum[type] });
        break;
      default:
        res.status(404).send('not found');
        return;
    }
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

router.post('/', validate(recordSchema), async (req, res) => {
  const { id: userId } = req.user;
  try {
    const existingList = await List.findOne({ imdbID: req.body.imdbID, userId });
    if (!existingList) {
      await new List({ ...req.body, imdbRating: +req.body.imdbRating, userId }).save();
      res.status(200).send({ message: 'Successfully added to the list' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

export default router;

import reduce from 'lodash/reduce';
import pick from 'lodash/pick';
import omit from 'lodash/omit';

export const ArrayMaybe = arr => arr || [];
export const ObjectMaybe = obj => obj || {};
export const StringMaybe = str => str || '';

export const renameObjectKeys = (obj, newKeysmap) =>
  reduce(
    obj,
    (result, value, key) => {
      key = newKeysmap[key] || key;
      result[key] = value;
      return result;
    },
    {}
  );
export const pickWrapper = (keys, object) => pick(object, keys);
export const omitWrapper = (keys, object) => omit(object, keys);

export const isNotEmptyArray = x => x && x.length > 0;
export const isNotEmptyObject = obj => obj && Object.keys(obj).length > 0;

export const cleanMongoObject = (obj, customKeyName = 'id') =>
  omitWrapper(
    ['__v'],
    renameObjectKeys(obj, {
      _id: customKeyName
    })
  );

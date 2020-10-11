import omit from "lodash/omit";
import pick from "lodash/pick";
import reduce from "lodash/reduce";

export const ArrayMaybe = arr => arr || [];
export const ObjectMaybe = obj => obj || {};
export const StringMaybe = str => str || "";

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

export const cleanMongoObject = (obj, customKeyName = "id") => {
  const clean = obj =>
    omitWrapper(
      ["__v"],
      renameObjectKeys(obj, {
        _id: customKeyName
      })
    );
  if (Array.isArray(obj)) return obj.map(item => clean(item));
  return clean(obj);
};

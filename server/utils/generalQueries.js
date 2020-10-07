import { omitWrapper, isNotEmptyObject, ObjectMaybe } from './commonHelpers';

export const countQuery = async (Model, params) => {
  const data = await Model.count(omitWrapper(['skip', 'limit'], params)).exec();
  return data;
};

export const findQuery = async (Model, params) => {
  let data = Model.find(omitWrapper(['skip', 'limit', 'sortOrder', 'sortKey'], params));
  if (params.limit) {
    data = data.skip(parseInt(params.skip, 10)).limit(parseInt(params.limit, 10));
  }
  if (params.sortKey) {
    data = data.sort({ [params.sortKey]: params.sortOrder || 1 });
  }
  const res = await data.lean().exec();
  return res;
};

export const detailedFindQuery = async (Model, params, additionalParams) => {
  let data = Model.find(params);
  if ('withLimit' in additionalParams) {
    data = data.limit(parseInt(additionalParams.withLimit, 10));
  }
  if ('withSkip' in additionalParams) {
    data = data.skip(parseInt(additionalParams.withSkip, 10));
  }
  if ('withSort' in additionalParams) {
    data = data.sort(additionalParams.withSort || {});
  }
  data = await data.lean().exec();
  return data;
};

export const findOneQuery = async (Model, params, extraParams) => {
  let data;
  if (ObjectMaybe(extraParams).withoutLean) {
    data = await Model.findOne(params).exec();
    return data;
  }
  data = await Model.findOne(params).lean().exec();
  return data;
};

export const findOneAndUpdateQuery = async (Model, params, valuesToUpdate, options) => {
  const data = await Model.findOneAndUpdate(params, valuesToUpdate, options);
  return isNotEmptyObject(data) ? data.toObject() : null;
};

export const findOneAndDeleteQuery = async (Model, params, options) => {
  const data = await Model.findOneAndDelete(params, options);
  return isNotEmptyObject(data) ? data.toObject() : null;
};

export const saveQuery = async object => {
  const data = await object.save();
  return isNotEmptyObject(data) ? data.toObject() : null;
};

export const updateQuery = async (Model, params, valuesToUpdate, options) => {
  const data = await Model.updateOne(params, valuesToUpdate, options).exec();
  return data;
};

export const updateManyQuery = async (Model, params, valuesToUpdate, options) => {
  const data = await Model.updateMany(params, valuesToUpdate, options).exec();
  return data;
};

export const aggregateQuery = async (Model, query) => {
  const data = await Model.aggregate(query);
  return data;
};

export const createMatch = params => ({
  $match: params
});

export const createSort = params => ({
  $sort: params
});

export const createLimit = params => ({
  $limit: parseInt(params, 10)
});

export const createSkip = params => ({
  $skip: parseInt(params, 10)
});

export const createLookup = params => ({
  $lookup: params
});

export const createGroup = params => ({
  $group: params
});

export const createUnwind = ({ unwindOn, preserveNullAndEmptyArrays }) => ({
  $unwind: {
    path: `$${unwindOn}`,
    preserveNullAndEmptyArrays
  }
});

export const createAddFields = params => ({
  $addFields: params
});

export const createProject = params => ({
  $project: params
});

export const createDocumentQuery = async (Model, params) => {
  const data = await Model.create(params);
  return data.toObject();
};

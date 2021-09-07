export const renameKey = object => {
  for (const property in object) {
    if (property.startsWith('i')) continue;
    const newProperty = property?.toLowerCase();
    object[newProperty] = object[property];
    delete object[property];
  }
  return object;
};

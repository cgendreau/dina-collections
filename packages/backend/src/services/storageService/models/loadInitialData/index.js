const storageLocations = require('./storageLocations.json')

module.exports = function loadInitialData({ models }) {
  const items = storageLocations.map(({ id, parentId, name }) => {
    const doc = {
      locationText: name,
    }

    return {
      doc,
      id,
      parentVersionId: parentId,
    }
  })
  return models.storageLocation.bulkCreate(items)
}

const resolveItemRelationship = require('./resolveItemRelationship')

module.exports = function resolveItemRelationships({
  getItemByTypeId,
  item,
  relationships,
  relationshipSpecification,
}) {
  let updatedItem = item
  Object.keys(relationshipSpecification).forEach(relationshipKey => {
    const { path, type } = relationshipSpecification[relationshipKey]

    updatedItem = resolveItemRelationship({
      getItemByTypeId,
      item,
      path,
      relationshipKey,
      relationships,
      type,
    })
  })

  return updatedItem
}
const cloneObject = require('./utilities/cloneObject')
const {
  getNormalizeSpecification,
  getRelationshipSpecification,
} = require('./specifications')

const denormalizeItem = require('./normalize/denormalizeItem')
const resolveItemRelationships = require('./relationships/resolveItemRelationships')

module.exports = function coreToNested({
  denormalize = true,
  getItemByTypeId,
  item: rawItem,
  resolveRelationships = true,
  type,
}) {
  return Promise.resolve().then(() => {
    if (!rawItem) {
      return rawItem
    }

    let item = cloneObject(rawItem)
    const { id, relationships, attributes } = item
    item = {
      ...attributes,
      id,
    }

    const normalizeSpecification = getNormalizeSpecification(type)

    if (denormalize && normalizeSpecification) {
      item = denormalizeItem({ item, normalizeSpecification, type })
    }

    const relationshipSpecification = getRelationshipSpecification(type)

    if (resolveRelationships && relationshipSpecification) {
      item = resolveItemRelationships({
        coreToNested,
        getItemByTypeId,
        item,
        relationships,
        relationshipSpecification,
      })
    }

    return item
  })
}

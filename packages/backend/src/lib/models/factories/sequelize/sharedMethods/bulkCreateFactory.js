const bulkCreateWrapper = require('../../wrappers/methods/bulkCreate')
const createLog = require('../../../../../utilities/log')

const log = createLog(
  'lib/modelFactories/documentModel/methods/bulkCreateFactory'
)

module.exports = function bulkCreateFactory(
  { Model, schemaVersion, updatePrimaryKey, validate: validateFunction } = {}
) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  // This should only be used to create test initialData
  return bulkCreateWrapper(({ items = [], validate = false }) => {
    log.debug(`Start create ${items.length} items for: ${Model.tableName}`)
    if (items.length === 0) {
      return Promise.resolve({ meta: { count: 0 } })
    }

    return Model.bulkCreate(
      items.map(item => {
        if (validate) {
          const errors = validateFunction(item)
          if (errors) {
            throw errors
          }
        }
        const { attributes, id, internals = {}, relationships } = item
        return {
          document: attributes,
          id,
          relationships,
          schemaCompliant: true,
          schemaVersion: schemaVersion || undefined,
          ...internals,
        }
      })
    ).then(() => {
      log.debug(`Successfully created ${items.length} items`)
      const lastId = Number(items[items.length - 1].id)
      const newId = lastId + 1
      return updatePrimaryKey(newId).then(() => {
        return { meta: { count: items && items.length } }
      })
    })
  })
}
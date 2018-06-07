const createLog = require('../../../../../../utilities/log')

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
  return function bulkCreate({ items = [], validate = true } = {}) {
    log.debug(`Start create ${items.length} items for: ${Model.tableName}`)

    return Model.bulkCreate(
      items.map(({ doc, id, ...rest }) => {
        if (validate) {
          const errors = validateFunction(doc)
          if (errors) {
            throw errors
          }
        }

        const { relationships, ...attributes } = doc

        return {
          document: attributes,
          id,
          relationships,
          schemaCompliant: true,
          schemaVersion: schemaVersion || undefined,
          ...rest,
        }
      })
    ).then(() => {
      if (!items.length) {
        return null
      }
      log.debug(`Successfully created ${items.length} items`)
      const lastId = Number(items[items.length - 1].id)
      const newId = lastId + 1
      return updatePrimaryKey(newId)
    })
  }
}
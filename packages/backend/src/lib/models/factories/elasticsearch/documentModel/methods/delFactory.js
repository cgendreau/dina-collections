const delWrapper = require('../../../wrappers/methods/del')
const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/elasticsearch/modelFactories/normalizedElasticModel/methods/delFactory'
)

module.exports = function delFactory({ Model, elasticsearch, getById } = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return delWrapper(({ id }) => {
    log.debug(`Deactivating instance for model ${Model.name}`)

    return getById({ id }).then(({ item }) => {
      return elasticsearch
        .delete({
          id,
          index: Model.index,
          // refresh: !config.env.isProduction,
          refresh: false,
          type: Model.name,
        })
        .then(() => {
          log.debug(
            `Deleted instance for model ${Model.name}. id: ${
              item.id
            }, versionId: ${item.versionId}`
          )
          return {
            item,
          }
        })
        .catch(err => {
          log.err(`Error updating instance for model ${Model.name}`, err)
          throw err
        })
    })
  })
}

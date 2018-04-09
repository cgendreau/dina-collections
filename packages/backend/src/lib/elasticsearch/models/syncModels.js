const createLog = require('../../../utilities/log')

const log = createLog('lib/elasticsearch', 0)

const chainPromises = require('common/src/chainPromises')

module.exports = function syncModels({ config, modelArray }) {
  log.debug(`Syncing models: flushOnRestart = ${config.db.flushOnRestart}`)
  return chainPromises(
    modelArray.map(({ model, name }) => {
      return () => {
        log.scope().debug(`${name}`)
        return model.sync({ force: config.db.flushOnRestart })
      }
    })
  )
}
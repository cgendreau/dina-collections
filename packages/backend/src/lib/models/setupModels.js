const createLog = require('../../utilities/log')
const createModels = require('./createModels')
const createRelations = require('./createRelations')
const synchronizeModels = require('./synchronizeModels')

const log = createLog('lib/models')

module.exports = function setupModels({
  config,
  elasticsearch,
  inMemoryDb,
  sequelize,
  serviceOrder,
  services,
}) {
  return Promise.resolve().then(() => {
    log.info('Creating models:')
    return createModels({
      config,
      elasticsearch,
      inMemoryDb,
      sequelize,
      serviceOrder,
      services,
    }).then(({ modelArray, modelObject: models }) => {
      log.scope().info('Created: ', Object.keys(models).join(', '))
      log.info('Setting up relations')
      return createRelations({ modelArray, models }).then(() => {
        const syncModels = config.env.isTest && config.test.syncModels
        if (!syncModels) {
          return { models }
        }

        return synchronizeModels({ config, modelArray }).then(() => {
          return { models }
        })
      })
    })
  })
}

const now = require('performance-now')

const startTime = now()
const openApiSpec = require('common/dist/openApi.json')
const {
  getResourceRelationshipParamsMap,
} = require('common/src/schemaInterface')
const createLog = require('../../utilities/log')
const createServiceRouter = require('../serviceRouter')
const createApp = require('../app')
const initializeDataStores = require('../dataStores')
const createServiceInteractor = require('../serviceInteractor')
const setupModels = require('../models')
const createConnectors = require('../connectors')
const createServices = require('../services')
const setupIntegrations = require('../integrations')
const createWorker = require('../jobs/worker')
const createScheduler = require('../jobs/scheduler')
const createAuth = require('../auth')

const log = createLog('server')
log.info(`Dependencies required after: ${now() - startTime} milliseconds`)

const resourceRelationshipParamsMap = getResourceRelationshipParamsMap()

module.exports = function bootstrap({
  config,
  serviceDefinitions,
  serviceOrder,
}) {
  const services = createServices({
    config,
    resourceRelationshipParamsMap,
    serviceDefinitions,
  })

  const bootstrapStartTime = now()
  const auth = createAuth({ config })
  const serviceInteractor = createServiceInteractor({ config })

  initializeDataStores({
    config,
  }).then(({ inMemoryDb, sequelize }) => {
    return setupModels({
      config,
      inMemoryDb,
      sequelize,
      serviceOrder,
      services,
    })
      .then(({ models }) => {
        log.info(
          `Sequelize initialized after: ${now() - startTime} milliseconds`
        )

        return setupIntegrations({ config })
          .then(integrations => {
            log.info(
              `Integrations initialized after: ${now() -
                startTime} milliseconds`
            )
            return createConnectors({
              config,
              integrations,
              models,
              serviceInteractor,
              services,
            })
          })
          .then(({ connectors }) => {
            log.info(
              `Connectors created after: ${now() - startTime} milliseconds`
            )

            serviceInteractor.addConnectors(connectors)

            if (config.api.active) {
              const serviceRouter = createServiceRouter({
                auth,
                config,
                connectors,
              })
              const app = createApp({
                auth,
                config,
                openApiSpec,
                routers: [serviceRouter],
              })
              log.info(
                `App configured after: ${now() - startTime} milliseconds`
              )
              if (config.jobs.workerActive) {
                createWorker({
                  serviceInteractor,
                })
              }
              if (config.jobs.schedulerActive) {
                createScheduler({
                  serviceInteractor,
                })
              }

              return app.listen(config.api.port, () => {
                log.info(
                  `Server started after: ${now() -
                    startTime} milliseconds. Bootstrap time: ${now() -
                    bootstrapStartTime}`
                )
                log.info(`Api listening to port ${config.api.port}`)
              })
            }
            return null
          })
      })
      .catch(err => {
        throw err
      })
  })
}

process.on('uncaughtException', err => {
  log.crit('uncaughtException process exiting in 5000 ms')
  log.crit(err.stack)
  setTimeout(() => {
    process.exit(1)
  }, 10000)
})

process.on('unhandledRejection', err => {
  log.crit('unhandledRejection process exiting in 5000 ms')
  log.crit(err)
  log.crit(err.stack)
  setTimeout(() => {
    process.exit(1)
  }, 10000)
})

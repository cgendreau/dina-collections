const now = require('performance-now')

const startTime = now()
const openApiSpec = require('common/dist/normalizedOpenApi.json')
const createLog = require('../../utilities/log')
const createServiceRouter = require('../../lib/serviceRouter')
const createApp = require('../../lib/app')
const initializeSequelize = require('../../lib/sequelize')
const createModels = require('../../lib/sequelize/models')
const createConnectors = require('../../lib/connectors')
const serviceDefinitions = require('../../services')
const createServices = require('../../lib/services')
const config = require('./config')

const log = createLog('server')
log.info(`Dependencies required after: ${now() - startTime} milliseconds`)

const services = createServices({ config, serviceDefinitions })

const bootstrapStartTime = now()
initializeSequelize({
  config,
})
  .then(({ sequelize }) => {
    return createModels({
      config,
      sequelize,
      services,
    })
  })
  .then(({ models }) => {
    log.info(`Sequalize initialized after: ${now() - startTime} milliseconds`)
    return createConnectors({ config, models, services })
  })
  .then(({ connectors }) => {
    log.info(`Connectors created after: ${now() - startTime} milliseconds`)
    const serviceRouter = createServiceRouter({
      config,
      connectors,
    })
    const app = createApp({
      config,
      openApiSpec,
      routers: [serviceRouter],
    })
    log.info(`App configured after: ${now() - startTime} milliseconds`)
    return app.listen(config.api.port, () => {
      log.info(
        `Server started after: ${now() -
          startTime} milliseconds. Bootstrap time: ${now() -
          bootstrapStartTime}`
      )
      log.info(`Api listening to port ${config.api.port}`)
    })
  })
  .catch(err => {
    throw err
  })

process.on('uncaughtException', err => {
  log.crit('uncaughtException process exiting in 5000 ms')
  log.crit(err.stack)
  setTimeout(() => {
    process.exit(1)
  }, 10000)
})

process.on('unhandledRejection', err => {
  log.crit('unhandledRejection process exiting in 5000 ms')
  log.crit(err.stack)
  setTimeout(() => {
    process.exit(1)
  }, 10000)
})

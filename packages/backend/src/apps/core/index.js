const now = require('performance-now')
const express = require('express')
const startTime = now()
const openApiSpec = require('common/dist/openApi.json')
const SearchkitExpress = require('searchkit-express')
const createLog = require('../../utilities/log')
const createServiceRouter = require('../../lib/serviceRouter')
const createApp = require('../../lib/app')
const initializeSequelize = require('../../lib/sequelize')
const initializeElasticsearch = require('../../lib/elasticsearch')
const createElasticsearchModels = require('../../lib/elasticsearch/models')
const createModels = require('../../lib/sequelize/models')
const createConnectors = require('../../lib/connectors')
const serviceDefinitions = require('../../services')
const createServices = require('../../lib/services')
const createAuth = require('../../lib/auth')
const config = require('./config')

const log = createLog('server')
log.info(`Dependencies required after: ${now() - startTime} milliseconds`)

const services = createServices({ config, serviceDefinitions })

const bootstrapStartTime = now()
const auth = createAuth({ config })

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
    return initializeElasticsearch({
      config,
    }).then(({ elasticsearch }) => {
      return createElasticsearchModels({
        config,
        elasticsearch,
        sequelizeModels: models,
        services,
      })
        .then(({ models: elasticModels }) => {
          log.info(
            `Sequalize initialized after: ${now() - startTime} milliseconds`
          )
          return createConnectors({ config, elasticModels, models, services })
        })
        .then(({ connectors }) => {
          log.info(
            `Connectors created after: ${now() - startTime} milliseconds`
          )
          const serviceRouter = createServiceRouter({
            auth,
            config,
            connectors,
          })
          const testRouter = express.Router()

          const searchkitRouter = SearchkitExpress.createRouter({
            host: 'http://localhost:9200',
            index: 'specimen',
            queryProcessor: (query, req, res) => {
              console.log(query)
              return query
            },
          })
          testRouter.use('/api/specimen-search', searchkitRouter)

          const app = createApp({
            auth,
            config,
            openApiSpec,
            routers: [testRouter, serviceRouter],
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
    })
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
  log.crit(err)
  log.crit(err.stack)
  setTimeout(() => {
    process.exit(1)
  }, 10000)
})

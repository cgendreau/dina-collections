const createEndpointFactory = require('common/es5/endpointFactory/createEndpointFactory')
const faker = require('json-schema-faker')

const importFaker = () => Promise.resolve(faker)

module.exports = createEndpointFactory({ importFaker })

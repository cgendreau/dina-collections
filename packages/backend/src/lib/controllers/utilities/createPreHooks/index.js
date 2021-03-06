const {
  createEnsureDataCorrectVersion,
} = require('../../../../services/migrationService/preHooks')

module.exports = function createPreHooks({
  config,
  customHooks = [],
  operation,
  serviceInteractor,
}) {
  return [
    createEnsureDataCorrectVersion({
      config,
      dataModelVersion: config.dataModel.version,
      method: operation.method,
      resource: operation.resource,
      serviceInteractor,
    }),
    ...customHooks,
  ]
}

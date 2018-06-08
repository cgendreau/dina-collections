const buildWhereFilterFactory = require('./methods/buildWhereFilterFactory')
const bulkCreateFactory = require('./methods/bulkCreateFactory')
const createFactory = require('./methods/createFactory')
const dbValidator = require('common/src/error/validators/dbValidator')
const deleteFactory = require('./methods/deleteFactory')
const getByIdFactory = require('./methods/getByIdFactory')
const getByIdSyncFactory = require('./methods/getByIdSyncFactory')
const getCountFactory = require('./methods/getCountFactory')
const getWhereFactory = require('./methods/getWhereFactory')
const synchronizeFactory = require('./methods/synchronizeFactory')
const updateFactory = require('./methods/updateFactory')

module.exports = function attachMethods({
  loadInitialData,
  Model,
  schemaModelName,
  schemaVersion,
  validate: performValidation,
}) {
  let validate = () => {
    return null
  }
  if (performValidation) {
    validate = dbValidator({
      model: schemaModelName,
      throwOnError: false,
    })
  }
  const buildWhereFilter = buildWhereFilterFactory()
  const synchronize = synchronizeFactory({ Model })
  const getById = getByIdFactory({
    Model,
  })

  const getByIdSync = getByIdSyncFactory({
    Model,
  })

  const getCount = getCountFactory({ Model })
  const create = createFactory({
    Model,
    schemaVersion,
    validate,
  })

  const getWhere = getWhereFactory({ Model })

  const del = deleteFactory({
    getById,
    Model,
  })

  const update = updateFactory({
    getById,
    Model,
    schemaVersion,
    validate,
  })

  const bulkCreate = bulkCreateFactory({
    Model,
    schemaVersion,
    validate,
  })

  const coreMethods = {
    buildWhereFilter,
    bulkCreate,
    create,
    del,
    getById,
    getByIdSync,
    getCount,
    getWhere,
    Model,
    synchronize,
    update,
  }

  const availableMethods = [...Object.keys(coreMethods)]

  return {
    ...coreMethods,
    availableMethods,
    loadInitialData,
    Model,
  }
}

const buildWhereFilterFactory = require('../sharedMethods/buildWhereFilterFactory')
const createFactory = require('./methods/createFactory')
const dbValidator = require('common/src/error/validators/dbValidator')
const deactivateFactory = require('../sharedMethods/deactivateFactory')
const getByIdFactory = require('../sharedMethods/getByIdFactory')
const getCountFactory = require('../sharedMethods/getCountFactory')
const getOneWhereFactory = require('../sharedMethods/getOneWhereFactory')
const getWhereFactory = require('../sharedMethods/getWhereFactory')
const synchronizeFactory = require('../sharedMethods/synchronizeFactory')
const updateFactory = require('./methods/updateFactory')

module.exports = function attachMethods({
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
  const getById = getByIdFactory({
    Model,
  })

  const synchronize = synchronizeFactory({ Model })

  const getCount = getCountFactory({ Model })
  const getOneWhere = getOneWhereFactory({ Model })
  const getWhere = getWhereFactory({ Model })
  const create = createFactory({
    Model,
    schemaVersion,
    validate,
  })

  const deactivate = deactivateFactory({
    getById,
    Model,
  })

  const update = updateFactory({
    getById,
    Model,
    schemaVersion,
    validate,
  })

  const coreMethods = {
    buildWhereFilter,
    create,
    deactivate,
    getById,
    getCount,
    getOneWhere,
    getWhere,
    Model,
    synchronize,
    update,
  }

  const availableMethods = Object.keys(coreMethods)

  return {
    ...coreMethods,
    availableMethods,
    Model,
  }
}

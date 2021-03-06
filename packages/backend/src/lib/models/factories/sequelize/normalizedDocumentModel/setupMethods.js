const buildWhereFilterFactory = require('../sharedMethods/buildWhereFilterFactory')
const buildWhereQueryFactory = require('../sharedMethods/buildWhereQueryFactory')
const bulkCreateFactory = require('../sharedMethods/bulkCreateFactory')
const createFactory = require('../sharedMethods/createFactory')
const dbValidator = require('common/src/error/validators/dbValidator')
const delFactory = require('../sharedMethods/delFactory')
const getByIdFactory = require('../sharedMethods/getByIdFactory')
const getCountFactory = require('../sharedMethods/getCountFactory')
const getOneWhereFactory = require('../sharedMethods/getOneWhereFactory')
const getWhereFactory = require('../sharedMethods/getWhereFactory')
const setupRelationsFactory = require('../sharedMethods/setupRelationsFactory')
const synchronizeFactory = require('../sharedMethods/synchronizeFactory')
const updateFactory = require('../sharedMethods/updateFactory')
const updatePrimaryKeyFactory = require('../sharedMethods/updatePrimaryKeyFactory')

module.exports = function setupMethods({
  config,
  customMethodFactories,
  loadInitialData,
  Model,
  relations,
  schemaModelName,
  sequelize,
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
  const buildWhereQuery = buildWhereQueryFactory({ sequelize })
  const buildWhereFilter = buildWhereFilterFactory({ sequelize })
  const getOneWhere = getOneWhereFactory({
    buildWhereFilter,
    buildWhereQuery,
    Model,
  })
  const getById = getByIdFactory({
    getOneWhere,
  })

  const synchronize = synchronizeFactory({ config, Model })

  const getCount = getCountFactory({ Model })

  const getWhere = getWhereFactory({ buildWhereFilter, Model })
  const create = createFactory({
    Model,
    validate,
  })

  const del = delFactory({
    getById,
    Model,
  })

  const update = updateFactory({
    getById,
    Model,
    validate,
  })

  const updatePrimaryKey = updatePrimaryKeyFactory({
    Model,
    sequelize,
    validate,
  })

  const bulkCreate = bulkCreateFactory({
    Model,
    updatePrimaryKey,
    validate,
  })

  const setupRelations = relations ? setupRelationsFactory({ relations }) : null

  const coreMethods = {
    buildWhereFilter,
    buildWhereQuery,
    bulkCreate,
    create,
    del,
    getById,
    getCount,
    getOneWhere,
    getWhere,
    Model,
    setupRelations,
    synchronize,
    update,
  }

  const customMethods = !customMethodFactories
    ? {}
    : Object.keys(customMethodFactories).reduce((methods, key) => {
        return {
          ...methods,
          [key]: customMethodFactories[key]({
            coreMethods,
            Model,
            sequelize,
            validate,
          }),
        }
      }, {})

  const availableMethods = [
    ...Object.keys(coreMethods),
    ...Object.keys(customMethods),
  ]

  return {
    ...coreMethods,
    ...customMethods,
    availableMethods,
    loadInitialData,
    Model,
  }
}

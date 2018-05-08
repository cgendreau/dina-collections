const bulkCreateFactory = require('./methods/bulkCreateFactory')
const createFactory = require('./methods/createFactory')
const getByIdFactory = require('./methods/getByIdFactory')
const getCountFactory = require('./methods/getCountFactory')
const getOneWhereFactory = require('./methods/getOneWhereFactory')
const getWhereFactory = require('./methods/getWhereFactory')
const updateFactory = require('./methods/updateFactory')
const updatePrimaryKeyFactory = require('./methods/updatePrimaryKeyFactory')
const dbValidator = require('common/src/error/validators/dbValidator')

module.exports = function attachMethods({
  sequelize,
  schemaModelName,
  schemaVersion,
  customMethodFactories,
  Model,
}) {
  let validate = () => {
    return null
  }
  if (schemaModelName) {
    validate = dbValidator({
      model: schemaModelName,
      throwOnError: false,
    })
  }

  const getById = getByIdFactory({
    Model,
  })

  const getCount = getCountFactory({ Model })
  const getOneWhere = getOneWhereFactory({ Model })
  const getWhere = getWhereFactory({ Model })
  const create = createFactory({
    Model,
    schemaVersion,
    validate,
  })

  const update = updateFactory({
    getById,
    Model,
    schemaVersion,
    validate,
  })

  const updatePrimaryKey = updatePrimaryKeyFactory({
    Model,
    schemaVersion,
    sequelize,
    validate,
  })

  const bulkCreate = bulkCreateFactory({
    Model,
    schemaVersion,
    updatePrimaryKey,
    validate,
  })

  const coreMethods = {
    bulkCreate,
    create,
    getById,
    getCount,
    getOneWhere,
    getWhere,
    Model,
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
            schemaVersion,
            sequelize,
            validate,
          }),
        }
      }, {})

  return {
    ...coreMethods,
    ...customMethods,
    Model,
  }
}
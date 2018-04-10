const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/sequelize/models/factories/versionedDocumentModel')

const physicalUnitModelFactory = function physicalUnit({ sequelize }) {
  return createModel({
    name: 'PhysicalUnit',
    schemaModelName: 'physicalUnit',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

const storageLocationModelFactory = function storageLocation({ sequelize }) {
  return createModel({
    name: 'StorageLocation',
    schemaModelName: 'storageLocation',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

const setupRelations = function setupRelations({ models }) {
  const { physicalUnit, storageLocation } = models
  storageLocation.Model.hasMany(storageLocation.Model, {
    as: 'children',
    foreignKey: 'parentVersionId',
  })
  storageLocation.Model.belongsTo(storageLocation.Model, {
    as: 'parent',
    foreignKey: 'parentVersionId',
    targetKey: 'versionId',
  })
  storageLocation.Model.hasMany(physicalUnit.Model, {
    as: 'physicalUnits',
    foreignKey: 'storageLocationVersionId',
  })
  physicalUnit.Model.belongsTo(storageLocation.Model, {
    as: 'storageLocation',
    foreignKey: 'storageLocationVersionId',
    targetKey: 'versionId',
  })
}

module.exports = [
  {
    factory: storageLocationModelFactory,
    name: 'storageLocation',
  },
  {
    factory: physicalUnitModelFactory,
    name: 'physicalUnit',
  },
  {
    factory: setupRelations,
    name: 'setupRelations',
  },
  {
    factory: loadInitialData,
    name: 'loadInitialData',
  },
]

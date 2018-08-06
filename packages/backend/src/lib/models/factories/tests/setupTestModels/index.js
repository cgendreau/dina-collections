const {
  elasticsearchDocumentModel: createElasticsearchDocumentModel,
  inMemoryDocumentModel: createInMemoryDocumentModel,
  inMemoryViewDocumentModel: createInMemoryViewDocumentModel,
  sequelizeDocumentModel: createSequelizeDocumentModel,
  sequelizeNormalizedDocumentModel: createSequelizeNormalizedDocumentModel,
  // sequelizeSimpleSqlModel: createSequelizeSimpleSqlModel,
  sequelizeViewDocumentModel: createSequelizeViewDocumentModel,
} = require('../../index')

const setupElasticsearchDocumentModel = ({ elasticsearch } = {}) => {
  const model = createElasticsearchDocumentModel({
    elasticsearch,
    forceRefresh: true,
    name: 'testInMemoryModel',
    schemaModelName: null,
    validate: false,
  })
  return model.synchronize({ force: true }).then(() => {
    return model
  })
}

const setupInMemoryDocumentModel = ({ inMemoryDb } = {}) => {
  const model = createInMemoryDocumentModel({
    inMemoryDb,
    name: 'testInMemoryModel',
    schemaModelName: null,
    validate: false,
  })
  return model.synchronize({ force: true }).then(() => {
    return model
  })
}

const setupInMemoryViewDocumentModel = ({ inMemoryDb } = {}) => {
  const model = createInMemoryViewDocumentModel({
    inMemoryDb,
    name: 'testInMemoryViewModel',
    schemaModelName: null,
    validate: false,
  })
  return model.synchronize({ force: true }).then(() => {
    return model
  })
}

const setupSequelizeDocumentModel = ({ sequelize } = {}) => {
  const model = createSequelizeDocumentModel({
    name: 'testSequelizeDocumentModel',
    schemaModelName: null,
    sequelize,
    validate: false,
  })
  return model.synchronize({ force: true }).then(() => {
    return model
  })
}

const setupSequelizeNormalizedDocumentModel = ({ sequelize } = {}) => {
  const model = createSequelizeNormalizedDocumentModel({
    name: 'testSequelizeNormalizedDocumentModel',
    schemaModelName: null,
    sequelize,
    validate: false,
  })
  return model.synchronize({ force: true }).then(() => {
    return model
  })
}

const setupSequelizeViewDocumentModel = ({ sequelize } = {}) => {
  const model = createSequelizeViewDocumentModel({
    name: 'testSequelizeViewDocumentModel',
    schemaModelName: null,
    sequelize,
    validate: false,
  })
  return model.synchronize({ force: true }).then(() => {
    return model
  })
}

// const setupSequelizeSimpleSqlModel = ({ config } = {}) => {
//   return createSequalizeDb({ config }).then(sequelize => {
//     const model = createSequelizeSimpleSqlModel({
//       name: 'testSequelizeSimpleSqlModel',
//       schemaModelName: null,
//       sequelize,
//       validate: false,
//     })
//     return model.synchronize({ force: true }).then(() => {
//       return model
//     })
//   })
// }

module.exports = {
  elasticsearchDocumentModel: setupElasticsearchDocumentModel,
  inMemoryDocumentModel: setupInMemoryDocumentModel,
  inMemoryViewDocumentModel: setupInMemoryViewDocumentModel,
  sequelizeDocumentModel: setupSequelizeDocumentModel,
  sequelizeNormalizedDocumentModel: setupSequelizeNormalizedDocumentModel,
  // sequelizeSimpleSqlModel: setupSequelizeSimpleSqlModel,
  sequelizeViewDocumentModel: setupSequelizeViewDocumentModel,
}

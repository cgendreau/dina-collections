const setupServiceInteractor = require('./setupServiceInteractor')
const runMigrationFunctions = require('./runMigrationFunctions')
const resolveMigrations = require('./resolveMigrations')
const extractSchemaFunctions = require('./extractSchemaFunctions')

module.exports = function createDataMigrations({
  apiVersion,
  dataModelVersion,
  migrations: migrationsInput,
}) {
  if (!dataModelVersion) {
    throw new Error('Have to provide dataModelVersion')
  }
  if (!apiVersion) {
    throw new Error('Have to provide apiVersion')
  }
  const migrations = resolveMigrations({ migrations: migrationsInput })
  const reversedMigrations = [...migrations].reverse()

  const dataUpFunctions = extractSchemaFunctions({
    key: 'upData',
    migrations,
  })
  const dataDownFunctions = extractSchemaFunctions({
    key: 'downData',
    migrations: reversedMigrations,
  })

  const up = (queryInterface, Sequelize) => {
    return setupServiceInteractor({ apiVersion, dataModelVersion }).then(
      serviceInteractor => {
        return runMigrationFunctions({
          migrationFunctions: dataUpFunctions,
          queryInterface,
          Sequelize,
          serviceInteractor,
        })
      }
    )
  }

  const down = (queryInterface, Sequelize) => {
    return setupServiceInteractor({ apiVersion, dataModelVersion }).then(
      serviceInteractor => {
        return runMigrationFunctions({
          migrationFunctions: dataDownFunctions,
          queryInterface,
          Sequelize,
          serviceInteractor,
        })
      }
    )
  }

  return {
    down,
    up,
  }
}

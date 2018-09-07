const os = require('os')
const { Parser: Json2csvParser } = require('json2csv')
const { execute: batchExecute } = require('common/src/batch')
const createLog = require('../../../../../../../utilities/log')
const createFilePath = require('./createFilePath')

const log = createLog('services/exportService/postHooks/performExport')

module.exports = function performExport({
  item,
  serviceInteractor,
  fileInteractor,
}) {
  const { exportFields, exportIds, resource: exportResource } = item.attributes

  const filePath = createFilePath({ exportResource })
  const includeFields = exportFields.map(({ fieldPath }) => {
    return fieldPath
  })

  const createBatch = ({ numberOfBatchEntries, startCount }) => {
    const batchIds = exportIds.slice(
      startCount,
      startCount + numberOfBatchEntries
    )

    const batchRequest = {
      queryParams: {
        filter: {
          ids: batchIds,
        },
        includeFields,
        limit: 10000,
      },
    }

    return serviceInteractor
      .getMany({
        request: batchRequest,
        resource: exportResource,
      })
      .then(({ data }) => {
        return data
      })
  }

  const fields = exportFields.map(exportField => {
    return {
      default: exportField.default,
      label: exportField.label,
      value: exportField.fieldPath,
    }
  })

  let firstRun = true
  const execute = items => {
    const opts = { fields, header: firstRun }
    const parser = new Json2csvParser(opts)
    const csv = parser.parse(items)
    const content = firstRun ? csv : `${os.EOL}${csv}`

    firstRun = false
    return fileInteractor.append({
      content,
      filePath,
    })
  }
  log.info(
    `Performing export for resource ${exportResource} with ${
      exportIds.length
    } items`
  )
  return batchExecute({
    createBatch,
    execute,
    numberOfEntries: exportIds.length,
    numberOfEntriesEachBatch: 1000,
  }).then(() => {
    return {
      filePath,
    }
  })
}
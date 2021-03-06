const createLog = require('../../../../utilities/log')
const { map: batchMap } = require('common/src/batch')
const getRequiredAction = require('./getRequiredAction')
const createItem = require('./createItem')

const defaultLog = createLog('lib/controllers/views/updateView/update')

module.exports = function update({
  log = defaultLog,
  mapFunction,
  model,
  serviceInteractor,
  srcResource,
  ids,
}) {
  log.info(`update view start for src: ${srcResource} with ids: `, ids)

  const updated = []
  const bailed = []
  const created = []
  const deleted = []

  const handleIds = ({ item: id }) => {
    return getRequiredAction({
      id,
      model,
      serviceInteractor,
      srcResource,
    }).then(action => {
      if (action === 'bail') {
        bailed.push(id)
        return null
      }
      if (action === 'del') {
        deleted.push(id)
        return model.del({ id })
      }
      return createItem({
        id,
        mapFunction,
        serviceInteractor,
        srcResource,
      }).then(newItem => {
        if (action === 'create') {
          created.push(id)
          return model.create({ allowId: true, item: newItem })
        }
        if (action === 'update') {
          updated.push(id)
          return model.update({ id, item: newItem })
        }
        return null
      })
    })
  }
  return batchMap({
    items: ids,
    mapFunction: handleIds,
  }).then(() => {
    log.info(`update view done for src: ${srcResource} with ids: `, ids)
    return {
      data: {
        attributes: {
          bailed,
          created,
          deleted,
          updated,
        },
      },
    }
  })
}

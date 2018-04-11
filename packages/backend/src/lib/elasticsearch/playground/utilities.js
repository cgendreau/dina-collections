const connectDb = require('../db')
const config = require('../../../apps/core/config')

const index = 'test'
const type = 'test'

const setupIndex = (elasticsearch, mappings) => {
  return elasticsearch.indices
    .exists({ index })
    .then(exists => {
      if (exists) {
        return elasticsearch.indices.delete({ index }).then(() => {
          return false
        })
      }
      return exists
    })
    .then(exists => {
      if (!exists) {
        return elasticsearch.indices.create({ index })
      }
      return true
    })
    .then(() => {
      if (!mappings) {
        return elasticsearch
      }
      return elasticsearch.indices
        .putMapping({ index, type, body: mappings })
        .then(() => {
          return elasticsearch
        })
    })
}

const addSampleData = (elasticsearch, items) => {
  const body = items.reduce((rows, item) => {
    rows.push({
      index: { _id: item.id, _index: index, _type: type },
    })
    rows.push(item)
    return rows
  }, [])
  return elasticsearch
    .bulk({
      body,
      refresh: true,
    })
    .then(() => {
      return true
    })
}

const setup = ({ items, mappings }) => {
  return connectDb({ config }).then(elasticsearch => {
    return setupIndex(elasticsearch, mappings).then(() => {
      return addSampleData(elasticsearch, items).then(() => {
        return elasticsearch
      })
    })
  })
}

const search = ({ elasticsearch, body, sort = 'id:desc' }) => {
  return elasticsearch.search({
    body,
    index,
    sort,
    type,
  })
}

module.exports = {
  search,
  setup,
}

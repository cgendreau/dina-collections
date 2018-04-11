const connectDb = require('../db')
const config = require('../../../apps/core/config')

const dbDescribe = require('../../../utilities/test/dbDescribe')

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
      return elasticsearch.indices.putMapping(mappings)
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

dbDescribe('lib/elasticsearch/db', () => {
  let elasticsearch
  describe('noMappings', () => {
    beforeAll(() => {
      const items = [
        {
          id: 1,
          identifiers: [
            {
              type: 'catalogNumber',
              value: '11111',
            },
            {
              type: 'skinNumber',
              value: '11112',
            },
          ],
        },
        {
          id: 2,
          identifiers: [
            {
              type: 'catalogNumber',
              value: '21111',
            },
            {
              type: 'skinNumber',
              value: '21112',
            },
          ],
        },
        {
          id: 3,
          identifiers: [
            {
              type: 'catalogNumber',
              value: '31111',
            },
            {
              type: 'skinNumber',
              value: '31112',
            },
          ],
        },
      ]
      const mappings = undefined
      return setup({ items, mappings }).then(createdClient => {
        elasticsearch = createdClient
      })
    })

    describe('fetch items', () => {
      it('Fetch all if only plain body provided', () => {
        const body = {}
        return search({ body, elasticsearch }).then(res => {
          expect(res.hits.hits.length).toBe(3)
        })
      })
    })
  })
})

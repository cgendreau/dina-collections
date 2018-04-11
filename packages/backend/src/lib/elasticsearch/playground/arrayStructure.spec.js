/* eslint-disable no-underscore-dangle */

const dbDescribe = require('../../../utilities/test/dbDescribe')
const { search, setup } = require('./utilities')

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

dbDescribe('lib/elasticsearch/db/arrayStructure/noNestedFields', () => {
  let elasticsearch
  beforeAll(() => {
    const mappings = {
      properties: {
        'identifiers.type': {
          // index: 'not_analyzed',
          type: 'keyword',
        },
      },
    }
    return setup({ items, mappings }).then(createdClient => {
      elasticsearch = createdClient
    })
  })
  it('Fetch all if only plain body provided', () => {
    const body = {}
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(3)
    })
  })
  it('Matches 1 item with identifiers.value: 11111', () => {
    const body = {
      query: {
        term: {
          'identifiers.value': '11111',
        },
      },
    }
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(1)
      expect(res.hits.hits[0]._source.id).toBe(1)
    })
  })
  it('Matches 3 items with identifiers.type: catalogNumber', () => {
    const body = {
      query: {
        term: {
          'identifiers.type': 'catalogNumber',
        },
      },
    }
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(3)
    })
  })
  it('Dont take object capsulation into consideration', () => {
    // without nested object mapping the data is flattened
    const body = {
      query: {
        bool: {
          filter: [
            { term: { 'identifiers.type': 'catalogNumber' } },
            { term: { 'identifiers.value': '31112' } },
          ],
        },
      },
    }
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(1)
    })
  })
})

dbDescribe('lib/elasticsearch/db/arrayStructure/nestedFields', () => {
  let elasticsearch
  beforeAll(() => {
    const mappings = {
      properties: {
        identifiers: {
          type: 'nested',
        },
      },
    }
    return setup({ items, mappings }).then(createdClient => {
      elasticsearch = createdClient
    })
  })
  it('Fetch all if only plain body provided', () => {
    const body = {}
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(3)
    })
  })
  it('Matches 1 item with identifiers.value: 11111', () => {
    const body = {
      query: {
        term: {
          'identifiers.value': '11111',
        },
      },
    }
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(1)
      expect(res.hits.hits[0]._source.id).toBe(1)
    })
  })
  it('Matches 3 items with identifiers.type: catalogNumber', () => {
    const body = {
      query: {
        term: {
          'identifiers.type': 'catalogNumber',
        },
      },
    }
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(3)
    })
  })
  it('Dont take object capsulation into consideration', () => {
    // without nested object mapping the data is flattened
    const body = {
      query: {
        bool: {
          filter: [
            { term: { 'identifiers.type': 'catalogNumber' } },
            { term: { 'identifiers.value': '31112' } },
          ],
        },
      },
    }
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(1)
    })
  })
})

/* eslint-disable no-underscore-dangle */

const dbDescribe = require('../../../utilities/test/dbDescribe')
const { search, setup } = require('./utilities')

dbDescribe('lib/elasticsearch/db/simpleStructure/noMappings', () => {
  let elasticsearch
  beforeAll(() => {
    const items = [
      {
        id: 1,
        price: 10,
        productID: 'XHDK-A-1293-#fJ3',
      },
      {
        id: 2,
        price: 20,
        productID: 'KDKE-B-9947-#kL5',
      },
      {
        id: 3,
        price: 30,
        productID: 'JODL-X-1937-#pV7',
      },
    ]
    const mappings = undefined
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
  it('Matches one item with term', () => {
    const body = {
      query: {
        term: {
          price: 20,
        },
      },
    }
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(1)
      expect(res.hits.hits[0]._source.id).toBe(2)
    })
  })
  it('Matches one item with constant_score by property number value', () => {
    const body = {
      query: {
        // constant_score - no scoring (fast)
        constant_score: {
          filter: {
            // term - look for exact values
            term: {
              price: 20,
            },
          },
        },
      },
    }
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(1)
      expect(res.hits.hits[0]._source.id).toBe(2)
    })
  })
  it('Matches 0 item with constant_score if match dont exist', () => {
    const body = {
      query: {
        constant_score: {
          filter: {
            term: {
              price: 21,
            },
          },
        },
      },
    }
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(0)
    })
  })
  it('Matches 0 item with constant_score by property string value', () => {
    /*
        It matches 0 because productID analysed and split into different tokens
        https://www.elastic.co/guide/en/elasticsearch/guide/current/_finding_exact_values.html
      */
    const body = {
      query: {
        constant_score: {
          filter: {
            term: {
              productID: 'JODL-X-1937-#pV7',
            },
          },
        },
      },
    }
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(0)
    })
  })
})

dbDescribe('lib/elasticsearch/db/simpleStructure/mappings', () => {
  let elasticsearch
  beforeAll(() => {
    const items = [
      {
        id: 1,
        price: 10,
        productID: 'XHDK-A-1293-#fJ3',
      },
      {
        id: 2,
        price: 20,
        productID: 'KDKE-B-9947-#kL5',
      },
      {
        id: 3,
        price: 30,
        productID: 'JODL-X-1937-#pV7',
      },
    ]
    const mappings = {
      properties: {
        productID: {
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
  it('Matches one item with constant_score by property number value', () => {
    const body = {
      query: {
        // constant_score - no scoring (fast)
        constant_score: {
          filter: {
            // term - look for exact values
            term: {
              price: 20,
            },
          },
        },
      },
    }
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(1)
      expect(res.hits.hits[0]._source.id).toBe(2)
    })
  })
  it('Matches 0 item with constant_score if match dont exist', () => {
    const body = {
      query: {
        constant_score: {
          filter: {
            term: {
              price: 21,
            },
          },
        },
      },
    }
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(0)
    })
  })
  it('Matches 1 item with constant_score by property string value', () => {
    const body = {
      query: {
        constant_score: {
          filter: {
            term: {
              productID: 'JODL-X-1937-#pV7',
            },
          },
        },
      },
    }
    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(1)
    })
  })
})

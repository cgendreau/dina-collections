const dbDescribe = require('../../../utilities/test/dbDescribe')
const { search, setup } = require('./utilities')

dbDescribe('lib/elasticsearch/db', () => {
  let elasticsearch
  describe('noMappings simple structure', () => {
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

    describe('search', () => {
      it('Fetch all if only plain body provided', () => {
        const body = {}
        return search({ body, elasticsearch }).then(res => {
          expect(res.hits.hits.length).toBe(3)
        })
      })
      it('Matches one item with constant_score if match exist', () => {
        const body = {
          query: {
            constant_score: {
              filter: {
                term: {
                  price: 20,
                },
              },
            },
          },
        }
        return search({ body, elasticsearch }).then(res => {
          expect(res.hits.hits.length).toBe(1)
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
    })
  })

  describe('noMappings array structure', () => {
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

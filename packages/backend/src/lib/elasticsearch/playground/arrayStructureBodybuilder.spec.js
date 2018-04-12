/* eslint-disable no-underscore-dangle */
const bodybuilder = require('bodybuilder')
const dbDescribe = require('../../../utilities/test/dbDescribe')
const { search, setup } = require('./utilities')

const items = [
  {
    collectionItems: [
      {
        preparationType: 'skin',
        preparationValue: 'dry',
      },
      {
        preparationType: 'bone',
        preparationValue: '20',
      },
    ],
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
    collectionItems: [
      {
        preparationType: 'skin',
        preparationValue: 'wet',
      },
      {
        preparationType: 'bone',
        preparationValue: '30',
      },
    ],
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
    collectionItems: [
      {
        preparationType: 'skin',
        preparationValue: 'wet',
      },
      {
        preparationType: 'bone',
        preparationValue: '40',
      },
    ],
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
    const body = bodybuilder()
      .filter('term', 'identifiers.value', '11111')
      .build()

    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(1)
      expect(res.hits.hits[0]._source.id).toBe(1)
    })
  })
})

dbDescribe('lib/elasticsearch/db/arrayStructure/nestedFields', () => {
  let elasticsearch
  beforeAll(() => {
    const mappings = {
      properties: {
        collectionItems: {
          properties: {
            preparationType: {
              // index: 'not_analyzed',
              type: 'keyword',
            },
          },
          type: 'nested',
        },
        identifiers: {
          properties: {
            type: {
              // index: 'not_analyzed',
              type: 'keyword',
            },
          },
          type: 'nested',
        },
      },
    }

    return setup({ items, mappings }).then(createdClient => {
      elasticsearch = createdClient
    })
  })
  it('Deep nested query match', () => {
    // const identifierTypeQuery = b =>
    //   b.query('term', 'identifiers.type', 'catalogNumber')

    // const identifierValueQuery = b =>
    //   b.query('term', 'identifiers.value', '21111')

    const identifiersQuery = b => {
      return b
        .query('term', 'identifiers.type', 'catalogNumber')
        .query('term', 'identifiers.value', '21111')
    }
    const collectionItemsQuery = b => {
      return b
        .query('term', 'collectionItems.preparationType', 'bone')
        .query('term', 'collectionItems.preparationValue', '30')
    }

    const body = bodybuilder()
      .query('nested', { path: 'identifiers' }, identifiersQuery)
      .query('nested', { path: 'collectionItems' }, collectionItemsQuery)
      .build()

    // const body = {
    //   query: {
    //     nested: {
    //       path: 'identifiers',
    //       query: {
    //         bool: {
    //           filter: [
    //             {
    //               term: {
    //                 'identifiers.type': 'catalogNumber',
    //               },
    //             },
    //             {
    //               term: {
    //                 'identifiers.value': '21111',
    //               },
    //             },
    //           ],
    //         },
    //       },
    //     },
    //   },
    // }

    console.log('body', JSON.stringify(body, null, 2))
    // without nested object mapping the data is flattened
    // const body = {
    //   query: {
    //     bool: {
    //       filter: [
    //         {
    //           nested: {
    //             path: 'identifiers',
    //             query: {
    //               bool: {
    //                 filter: [
    //                   { term: { 'identifiers.type': 'catalogNumber' } },
    //                   { term: { 'identifiers.value': '21111' } },
    //                 ],
    //               },
    //             },
    //           },
    //         },
    //         {
    //           nested: {
    //             path: 'collectionItems',
    //             query: {
    //               bool: {
    //                 filter: [
    //                   { term: { 'collectionItems.preparationType': 'bone' } },
    //                   { term: { 'collectionItems.preparationValue': '30' } },
    //                 ],
    //               },
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   },
    // }

    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(1)
    })
  })
  it('Deep nested query no match', () => {
    // without nested object mapping the data is flattened
    const body = {
      query: {
        bool: {
          filter: [
            {
              nested: {
                path: 'identifiers',
                query: {
                  bool: {
                    filter: [
                      { term: { 'identifiers.type': 'catalogNumber' } },
                      { term: { 'identifiers.value': '21111' } },
                    ],
                  },
                },
              },
            },
            {
              nested: {
                path: 'collectionItems',
                query: {
                  bool: {
                    filter: [
                      { term: { 'collectionItems.preparationType': 'bone' } },
                      { term: { 'collectionItems.preparationValue': '40' } },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    }

    return search({ body, elasticsearch }).then(res => {
      expect(res.hits.hits.length).toBe(0)
    })
  })
})

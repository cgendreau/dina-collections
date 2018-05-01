const createTaxonRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/taxonomy/v01',
  operations: [
    {
      connect: true,
      exampleRequests: { primary: createTaxonRequestSuccess },
      type: 'create',
    },
    {
      connect: true,
      type: 'update',
    },
    {
      connect: true,
      relationKey: 'parent',
      type: 'updateRelationHasOne',
    },
    // {
    //   relationKey: 'acceptedTaxonName',
    //   type: 'getRelationHasOne',
    // },
    // {
    //   relationKey: 'acceptedTaxonName',
    //   type: 'updateRelationHasOne',
    // },
    // {
    //   relationKey: 'synonyms',
    //   type: 'getRelationHasMany',
    // },
    // {
    //   relationKey: 'synonyms',
    //   type: 'updateRelationHasMany',
    // },
    // {
    //   relationKey: 'vernacularNames',
    //   type: 'getRelationHasMany',
    // },
    // {
    //   relationKey: 'vernacularNames',
    //   type: 'updateRelationHasMany',
    // },
    {
      connect: true,
      includeRelations: true,
      type: 'getOne',
    },
    {
      connect: true,
      includeRelations: true,
      type: 'getMany',
    },
  ],
  relations: {
    acceptedTaxonName: {
      format: 'object',
      resource: 'taxonName',
      storeInDocument: true,
    },
    children: {
      format: 'array',
      resource: 'taxon',
    },
    parent: {
      format: 'object',
      resource: 'taxon',
    },
    synonyms: {
      format: 'array',
      resource: 'taxonName',
      storeInDocument: true,
    },
    vernacularNames: {
      format: 'array',
      resource: 'taxonName',
      storeInDocument: true,
    },
  },
  resource: 'taxon',
  resourcePlural: 'taxa',
}

const buildWhere = require('./operations/getMany/buildWhere')
const createStorageLocationRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/storage/v01',
  operations: [
    {
      exampleRequests: { primary: createStorageLocationRequestSuccess },
      type: 'create',
    },
    {
      type: 'update',
    },
    // {
    //   relationKey: 'physicalUnits',
    //   type: 'updateRelationHasMany',
    // },
    {
      relationKey: 'physicalUnits',
      type: 'getRelationHasMany',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      buildWhere,
      includeRelations: true,
      queryParams: {
        'filter[locationText]': {
          description: 'Filter by location text',
          required: false,
          schema: {
            type: 'string',
          },
        },
      },
      type: 'getMany',
    },
  ],
  relations: {
    children: {
      format: 'array',
      resource: 'storageLocation',
    },
    parent: {
      format: 'object',
      resource: 'storageLocation',
    },
    physicalUnits: {
      format: 'array',
      resource: 'physicalUnit',
    },
  },
  resource: 'storageLocation',
}

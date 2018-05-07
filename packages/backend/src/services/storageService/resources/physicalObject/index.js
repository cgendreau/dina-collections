const createPhysicalObjectRequestSuccess = require('./operations/create/examples/requestSuccess.json')
const { resourceRelationsMap } = require('../../models/relations')

const resource = 'physicalObject'

module.exports = {
  basePath: '/api/storage/v01',
  operations: [
    {
      exampleRequests: { primary: createPhysicalObjectRequestSuccess },
      type: 'create',
    },
    {
      type: 'update',
    },
    {
      relationKey: 'storageLocation',
      type: 'updateRelationBelongsToOne',
    },
    {
      relationKey: 'storageLocation',
      type: 'getRelationBelongsToOne',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      includeRelations: true,
      type: 'getMany',
    },
  ],
  relations: resourceRelationsMap[resource],
  resource,
}

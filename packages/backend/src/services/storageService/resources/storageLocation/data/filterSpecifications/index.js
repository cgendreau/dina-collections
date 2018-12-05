const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const createJsonRelationshipFilter = require('../../../../../../lib/data/filters/factories/createJsonRelationshipFilter')

const filters = createGetManyFilterSpecifications({
  custom: {
    taxon: createJsonRelationshipFilter({
      relationshipKey: 'taxa',
      relationshipResource: 'taxon',
      resource: 'storageLocation',
    }),
  },
  include: [
    'ancestorsToId',
    'group',
    'id',
    'ids',
    'nameSearch',
    'nodesWithCircularDependencies',
    'parentId',
    'updatedAfter',
  ],
})

exports.getMany = filters
exports.query = filters

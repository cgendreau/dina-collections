module.exports = {
  basePath: '/api/taxonomy/v01',
  operations: [
    {
      connect: false,
      type: 'create',
    },
    {
      connect: false,
      type: 'update',
    },
    {
      connect: false,
      relationKey: 'nodes',
      type: 'getRelationHasMany',
    },
    {
      connect: false,
      includeRelations: true,
      type: 'getOne',
    },
    {
      connect: false,
      includeRelations: true,
      type: 'getMany',
    },
    {
      connect: false,
      type: 'getVersion',
    },
    {
      connect: false,
      type: 'getVersions',
    },
  ],
  relations: {
    nodes: {
      format: 'array',
      resource: 'cNode',
      type: 'hasMany',
    },
  },
  resource: 'cClassification',
  tags: ['classification'],
}

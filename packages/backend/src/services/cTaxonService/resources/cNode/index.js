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
      relationKey: 'childTaxon',
      type: 'getRelationHasOne',
    },
    {
      connect: false,
      relationKey: 'childTaxon',
      type: 'updateRelationHasOne',
    },

    {
      connect: false,
      relationKey: 'classification',
      type: 'getRelationHasOne',
    },
    {
      connect: false,
      relationKey: 'classification',
      type: 'updateRelationHasOne',
    },

    {
      connect: false,
      relationKey: 'parentTaxon',
      type: 'getRelationHasOne',
    },
    {
      connect: false,
      relationKey: 'parentTaxon',
      type: 'updateRelationHasOne',
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
    childTaxon: {
      format: 'object',
      resource: 'cTaxon',
      type: 'hasOne',
    },
    classification: {
      format: 'object',
      resource: 'cName',
      type: 'hasOne',
    },
    parentTaxon: {
      format: 'object',
      resource: 'cTaxon',
      type: 'hasOne',
    },
  },
  resource: 'cNode',
  tags: ['node'],
}

module.exports = {
  basePath: '/api/cTaxonomy/v01',
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
      relationKey: 'taxons',
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
    taxons: {
      format: 'array',
      resource: 'cTaxon',
      type: 'hasMany',
    },
  },
  resource: 'cVernacularName',
}

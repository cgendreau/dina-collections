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
      relationKey: 'acceptedToTaxons',
      type: 'getRelationHasOne',
    },

    {
      connect: false,
      relationKey: 'basionym',
      type: 'getRelationHasOne',
    },

    {
      connect: false,
      relationKey: 'basionym',
      type: 'updateRelationHasOne',
    },

    {
      connect: false,
      relationKey: 'origin',
      type: 'getRelationHasOne',
    },

    {
      connect: false,
      relationKey: 'origin',
      type: 'updateRelationHasOne',
    },

    {
      connect: false,
      relationKey: 'synonymToTaxons',
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
    acceptedToTaxons: {
      format: 'object',
      resource: 'cTaxon',
      type: 'hasMany',
    },
    basionym: {
      format: 'object',
      resource: 'cName',
      type: 'hasOne',
    },
    origin: {
      format: 'object',
      resource: 'cName',
      type: 'hasOne',
    },
    synonymToTaxons: {
      format: 'array',
      resource: 'cTaxon',
      type: 'hasMany',
    },
  },
  resource: 'cName',
}

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
      relationKey: 'ancestors',
      type: 'getRelationHasMany',
    },
    {
      connect: false,
      relationKey: 'children',
      type: 'getRelationHasMany',
    },

    {
      connect: false,
      relationKey: 'descendants',
      type: 'getRelationHasMany',
    },

    {
      connect: false,
      relationKey: 'synonymNames',
      type: 'getRelationHasMany',
    },

    {
      connect: false,
      relationKey: 'synonymNames',
      type: 'updateRelationHasMany',
    },

    {
      connect: false,
      relationKey: 'vernacularNames',
      type: 'getRelationHasMany',
    },
    {
      connect: false,
      relationKey: 'vernacularNames',
      type: 'updateRelationHasMany',
    },

    {
      connect: false,
      relationKey: 'acceptedName',
      type: 'updateRelationHasOne',
    },
    {
      connect: false,
      relationKey: 'acceptedName',
      type: 'getRelationHasOne',
    },
    {
      connect: false,
      relationKey: 'parent',
      type: 'updateRelationHasOne',
    },
    {
      connect: false,
      relationKey: 'parent',
      type: 'getRelationHasOne',
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
    acceptedName: {
      format: 'object',
      resource: 'cName',
      type: 'hasOne',
    },
    ancestors: {
      format: 'array',
      resource: 'cTaxon',
      type: 'hasMany',
    },
    children: {
      format: 'array',
      resource: 'cTaxon',
      type: 'hasMany',
    },
    descendants: {
      format: 'array',
      resource: 'cTaxon',
      type: 'hasMany',
    },
    parent: {
      format: 'object',
      resource: 'cTaxon',
      type: 'hasOne',
    },
    synonymNames: {
      format: 'array',
      resource: 'cName',
      type: 'hasMany',
    },
    vernacularNames: {
      format: 'array',
      resource: 'cVernacularName',
      type: 'hasMany',
    },
  },
  resource: 'cTaxon',
}

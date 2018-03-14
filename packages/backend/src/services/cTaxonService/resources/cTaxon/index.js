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
      includeRelations: true,
      type: 'getOne',
    },
    {
      connect: false,
      includeRelations: true,
      queryParams: {
        'filter[search]': {
          description: 'Find taxons based on search ',
          example: 'vulpu',
          required: false,
          schema: {
            type: 'string',
          },
        },
        'filter[year]': {
          description: 'Filter by valid year in format xxxx',
          example: '1986',
          required: false,
          schema: {
            type: 'string',
          },
        },
      },
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
  tags: ['taxon'],
}

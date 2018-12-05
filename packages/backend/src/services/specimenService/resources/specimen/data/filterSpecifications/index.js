const createGetManyFilterSpecifications = require('../../../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const createJsonRelationshipFilter = require('../../../../../../lib/data/filters/factories/createJsonRelationshipFilter')

const resource = 'specimen'

const filters = createGetManyFilterSpecifications({
  custom: {
    catalogNumber: {
      description: 'catalog number used to filter specimens',
      inputSchema: {
        type: 'string',
      },
      jsFilterFunction: () => {},
      key: 'catalogNumber',

      sequelizeFilterFunction: ({ sequelize, value, Op }) => {
        if (!value) {
          return null
        }

        const regex = RegExp('^[A-Za-z0-9]+$')

        if (!regex.test(value)) {
          throw new Error('Wrong filter format')
        }
        // TODO -> this is sensitive for injections because value is not escaped
        // waiting for fix to: https://github.com/sequelize/sequelize/issues/5173
        const obj = {
          identifierType: {
            id: '1',
          },
          value,
        }

        const query = `"specimen"."document"->'individual'->'identifiers' @> '[${JSON.stringify(
          obj
        )}]'`
        return {
          [Op.and]: [sequelize.literal(query)],
        }
      },
    },
    normalizedAgent: createJsonRelationshipFilter({
      relationshipKey: 'normalizedAgents',
      relationshipResource: 'normalizedAgent',
      resource,
    }),
    physicalObject: createJsonRelationshipFilter({
      relationshipKey: 'physicalObjects',
      relationshipResource: 'physicalObject',
      resource,
    }),
    place: createJsonRelationshipFilter({
      relationshipKey: 'places',
      relationshipResource: 'place',
      resource,
    }),
    taxon: createJsonRelationshipFilter({
      oneOrMany: 'one',
      relationshipKey: 'curatorialTaxon',
      relationshipResource: 'taxon',
      resource,
    }),
  },
})

exports.getMany = filters

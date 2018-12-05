module.exports = function createJsonRelationshipFilter({
  oneOrMany = 'many',
  resource,
  relationshipKey,
  relationshipResource,
}) {
  return {
    description: `${relationshipResource} id used to filter ${resource}`,
    inputSchema: {
      type: 'string',
    },
    jsFilterFunction: () => {},
    key: relationshipResource,
    sequelizeFilterFunction: ({ value, Op }) => {
      if (!value) {
        return null
      }

      // TODO -> this is sensitive for injections because value is not escaped
      // waiting for fix to: https://github.com/sequelize/sequelize/issues/5173
      return {
        relationships: {
          [Op.contains]: {
            [relationshipKey]:
              oneOrMany === 'one'
                ? {
                    data: {
                      id: value,
                    },
                  }
                : {
                    data: [
                      {
                        id: value,
                      },
                    ],
                  },
          },
        },
      }
    },
  }
}

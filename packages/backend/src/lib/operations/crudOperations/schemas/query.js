const base = require('./base')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    exampleRequests: {
      type: 'object',
    },
    filterSpecificationMap: {
      not: {
        type: 'string',
      },
    },
  },
  required: [...base.required],
}

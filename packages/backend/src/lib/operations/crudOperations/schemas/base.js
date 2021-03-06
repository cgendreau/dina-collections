module.exports = {
  additionalProperties: false,
  properties: {
    connect: {
      type: 'boolean',
    },
    controller: {
      type: 'string',
    },
    errors: {
      type: 'object',
    },
    exampleResponses: {
      type: 'object',
    },
    operationId: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
  },
  required: ['type'],
}

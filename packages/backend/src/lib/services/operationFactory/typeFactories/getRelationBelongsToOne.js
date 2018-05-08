const buildOperationId = require('./utilities/buildOperationId')

module.exports = function getRelationHasOne({
  basePath,
  errors: errorsInput = {},
  exampleResponses = {},
  queryParams,
  relationKey,
  relations,
  resource,
  resourcePath,
  ...rest
}) {
  const errors = {
    '400': ['REQUEST_ERROR'],
    '404': ['RESOURCE_NOT_FOUND_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }
  const relation = relations[relationKey]
  const { format: relationFormat, resource: relationResource } = relation

  const operationType = 'getRelationHasOne'

  return {
    ...rest,
    errors,
    method: 'get',
    operationId: buildOperationId({ operationType, relationKey, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/{id}/relationships/${relationKey}`,
    pathParams: ['id'],
    queryParams,
    relation: {
      ...relation,
      key: relationKey,
    },
    relationKey,
    resource,
    response: {
      examples: exampleResponses,
      format: relationFormat,
      resource: relationResource,
    },
    rootResource: resource,
    summary: `Find ${resource} -> ${relationKey}`,
  }
}
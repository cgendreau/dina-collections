const buildOperationId = require('../../buildOperationId')
const createOperationSpecificQueryParams = require('../utilities/createOperationSpecificQueryParams')

module.exports = function runIncludeJobs({
  includeJobs,
  openApiClient,
  relationSpecification,
}) {
  const promises = includeJobs.map(includeJob => {
    const { path, ids, type } = includeJob
    const mappedQueryParams = createOperationSpecificQueryParams({
      path,
      queryParams: {
        filter: {
          ids,
        },
        includeDeactivated: true,
        limit: 1000,
      },
      relationSpecification,
    })
    return openApiClient
      .call(
        buildOperationId({
          operationType: 'getMany',
          resource: type,
        }),
        {
          queryParams: mappedQueryParams,
        }
      )
      .then(response => {
        const items = response.data
        return items.map(item => {
          return {
            ...item,
            path,
          }
        })
      })
  })

  return Promise.all(promises).then(resolvedIncludeJobs => {
    return resolvedIncludeJobs.reduce((includeArray, resolvedItems) => {
      return [...includeArray, ...resolvedItems]
    }, [])
  })
}

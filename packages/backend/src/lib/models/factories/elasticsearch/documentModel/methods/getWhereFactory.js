const getWhereWrapper = require('../../../wrappers/methods/getWhere')
const extractMetaFromResult = require('../../utilities/extractMetaFromResult')
const extractItemsFromResult = require('../../utilities/extractItemsFromResult')
const extractItemsFromAggregations = require('../../utilities/extractItemsFromAggregations')
const extractFieldsFromUserInput = require('../../../../../data/fields/utilities/extractFieldsFromUserInput')
const extractSortObjectsFromUserInput = require('../../../../../data/sort/utilities/extractSortObjectsFromUserInput')

const buildWhere = ({
  aggregations,
  aggregationSpecification,
  buildWhereFilter,
  buildWhereQuery,
  filterInput,
  filterSpecification,
  query,
}) => {
  if (query || aggregations) {
    return buildWhereQuery({
      aggregations,
      aggregationSpecification,
      filterSpecification,
      query,
    })
  }
  if (filterInput) {
    return buildWhereFilter({
      filterInput,
      filterSpecification,
    })
  }

  throw new Error('Provide either query or filterInput')
}

module.exports = function getWhereFactory({
  buildWhereFilter,
  buildWhereQuery,
  elasticsearch,
  Model,
}) {
  return getWhereWrapper(
    ({
      aggregations,
      aggregationSpecification,
      excludeFieldsInput = [],
      filterInput = {},
      filterSpecification = {},
      includeFieldsInput,
      limit = 10,
      offset = 0,
      query,
      scroll,
      scrollId,
      selectableFields,
      sortableFields,
      sortInput,
    }) => {
      return buildWhere({
        aggregations,
        aggregationSpecification,
        buildWhereFilter,
        buildWhereQuery,
        filterInput,
        filterSpecification,
        query,
      }).then(where => {
        let options = {
          scroll: scroll ? '30s' : undefined,
        }
        let methodName
        if (scrollId) {
          methodName = 'scroll'
          options = {
            ...options,
            scrollId,
          }
        } else {
          const sortObjects = extractSortObjectsFromUserInput({
            sortableFields,
            sortInput,
          })
          let sort = '_id:desc'

          if (
            sortObjects &&
            sortObjects.length === 1 &&
            sortObjects[0].order === 'relevance'
          ) {
            sort = undefined
          } else if (sortObjects && sortObjects.length) {
            sort = sortObjects
              .filter(({ order: sortOrder }) => {
                return sortOrder !== 'relevance'
              })
              .map(sortObject => {
                return `${sortObject.path}:${sortObject.order}`
              })
          }

          const fields =
            extractFieldsFromUserInput({
              includeFieldsInput,
              selectableFields,
            }) || []
          const sourceOptions = {
            _sourceExclude: excludeFieldsInput.length
              ? excludeFieldsInput
              : undefined,
            _sourceInclude: fields.length ? fields : undefined,
          }

          methodName = 'search'
          options = {
            ...options,
            ...sourceOptions,
            body: where,
            from: offset,
            index: Model.index,
            size: limit,
            sort,
            type: Model.name,
          }
        }

        return elasticsearch[methodName](options).then(res => {
          const meta = extractMetaFromResult({ result: res })
          let items = []
          if (aggregations && aggregations.length) {
            items = extractItemsFromAggregations({
              aggregations,
              aggregationSpecification,
              result: res,
            })
          } else {
            items = extractItemsFromResult({
              result: res,
            })
          }

          return { items, meta }
        })
      })
    }
  )
}

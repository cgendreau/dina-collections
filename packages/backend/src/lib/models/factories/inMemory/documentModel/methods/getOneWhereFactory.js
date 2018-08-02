const getOneWhereWrapper = require('../../../wrappers/methods/getOneWhere')

module.exports = function getOneWhereFactory({ Model, getWhere }) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return getOneWhereWrapper(({ filterInput, filterSpecification }) => {
    return getWhere({ filterInput, filterSpecification, limit: 1 }).then(
      ({ items }) => {
        if (!items && items.length > 0) {
          return {
            item: null,
          }
        }
        return {
          item: items[0],
        }
      }
    )
  })
}
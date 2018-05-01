const { Op } = require('sequelize')

module.exports = function buildWhereFactory({ request }) {
  const {
    queryParams: { filter: { name } = {} },
    relationships: { acceptedToTaxon, synonymToTaxon, vernacularToTaxon } = {},
  } = request

  let where = {}

  if (name !== undefined) {
    where = {
      'document.name': {
        [Op.iLike]: `%${name.toLowerCase()}%`,
      },
    }
  }

  return Promise.resolve(where)
}

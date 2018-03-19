const { Op } = require('sequelize')

module.exports = function buildWhereFactory({ request }) {
  const { queryParams: { filter: { locationText } = {} } } = request

  let where = {}

  if (locationText !== undefined) {
    where = {
      [Op.or]: [
        {
          'document.locationText': {
            [Op.iLike]: `%${locationText.toLowerCase()}%`,
          },
        },
      ],
    }
  }
  return Promise.resolve(where)
}

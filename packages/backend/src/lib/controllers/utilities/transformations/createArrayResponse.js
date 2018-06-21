module.exports = function createArrayResponse({
  items,
  meta = {},
  status = 200,
  type,
}) {
  if (!items || items.length === 0) {
    return {
      data: [],
    }
  }

  return {
    data: items.map(item => {
      const { id, relationships, type: itemType, ...rest } = item
      const itemResponse = {
        attributes: {
          ...rest,
        },
        id: `${id}`,
        type: itemType || type,
      }

      if (relationships) {
        itemResponse.relationships = relationships
      }

      return itemResponse
    }),
    meta: {
      ...meta,
      internals: {
        status,
      },
    },
  }
}

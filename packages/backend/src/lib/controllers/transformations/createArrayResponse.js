module.exports = function createArrayResponse({ items, status = 200, type }) {
  if (!items || items.length === 0) {
    return {
      data: [],
    }
  }

  return {
    data: items.map(item => {
      const { id, relationships, ...rest } = item
      return {
        attributes: {
          ...rest,
        },
        id: `${id}`,
        relationships: relationships || undefined,
        type,
      }
    }),
    meta: {
      internals: {
        status,
      },
    },
  }
}

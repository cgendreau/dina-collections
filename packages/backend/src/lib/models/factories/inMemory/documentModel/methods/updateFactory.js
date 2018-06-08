const backendError404 = require('common/src/error/errorFactories/backendError404')

module.exports = function updateFactory({ Model }) {
  return function update({ doc, id } = {}) {
    return Promise.resolve().then(() => {
      if (id === undefined) {
        throw new Error('Id required for update')
      }

      const model = Model.get()

      if (!model[id]) {
        backendError404({
          code: 'RESOURCE_NOT_FOUND_ERROR',
          detail: `Not found for id ${id}`,
        })
      }
      const newItems = {}
      const newItem = { document: doc, id }

      newItems[id] = newItem

      const updatedModel = {
        ...model,
        ...newItems,
      }
      Model.set(updatedModel)
      return newItem
    })
  }
}

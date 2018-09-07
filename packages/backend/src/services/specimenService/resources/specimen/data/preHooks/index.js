const backendError400 = require('common/src/error/errorFactories/backendError400')
const objectPath = require('object-path')

const validateBody = function validateBody({ request }) {
  const { body } = request
  if (!objectPath.get(body, 'data.attributes.normalized.identifiers.0.value')) {
    backendError400({
      code: 'REQUEST_ERROR',
      detail: 'Catalog number is required',
    })
  }
}

exports.create = [validateBody]
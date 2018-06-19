const transformationFunctions = require('./transformationFunctions')

const cacheResourcesSpecifications = require('../../../../cacheResourcesSpecifications')

const resourceCacheMap = cacheResourcesSpecifications.reduce(
  (obj, { name, srcResource }) => {
    return {
      ...obj,
      [srcResource]: name,
    }
  },
  {}
)

const warmViews = cacheResourcesSpecifications.map(({ name }) => {
  return name
})

exports.updateView = {
  description: 'Transforming data from specimen',
  srcResource: 'specimen',
  transformationFunctions,
}

exports.rebuildView = {
  description: 'Transforming data from specimen',
  resourceCacheMap,
  srcResource: 'specimen',
  transformationFunctions,
  warmViews,
}
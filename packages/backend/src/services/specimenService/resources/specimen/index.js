const {
  getNormalizedColumnNames,
} = require('common/src/formatObject/specifications')

const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./data/transformationSpecifications')

const normalizedRequestSuccess = require('./operations/create/examples/normalizedRequestSuccess.json')
const validateBody = require('./operations/create/validators/validateBody')
const updateRequestSuccess = require('./operations/update/examples/requestSuccess.json')
const getManyfilterSpecification = require('./operations/getMany/filters')

const {
  create: createHooks,
  del: delHooks,
  update: updateHooks,
} = require('./data/hooks')

const normalizedColumnNames = getNormalizedColumnNames('specimen')

module.exports = {
  basePath: '/api/specimen/v01',
  model: {
    modelFactory: 'sequelizeNormalizedDocumentModel',
    name: 'specimen',
    normalizedColumnNames,
  },
  operations: [
    {
      errors: {
        '400': ['REQUEST_BODY_VALIDATION_ERROR'],
      },
      exampleRequests: { primary: normalizedRequestSuccess },
      postHooks: createHooks,
      type: 'create',
      validateBody,
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      filterSpecification: getManyfilterSpecification,
      includeRelations: true,
      type: 'getMany',
    },
    {
      exampleRequests: { primary: updateRequestSuccess },
      postHooks: updateHooks,
      type: 'update',
    },
    {
      postHooks: delHooks,
      type: 'del',
    },
    {
      includeRelations: true,
      transformationSpecification: importDataFromFileTransformationSpecification,
      type: 'importDataFromFile',
    },
    {
      relationKey: 'agents',
      type: 'getRelationship',
    },
    {
      relationKey: 'agents',
      type: 'updateRelationship',
    },
    {
      relationKey: 'causeOfDeathTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'causeOfDeathTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'establishmentMeansTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'establishmentMeansTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'featureTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'featureTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'identifierTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'identifierTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'physicalObjects',
      type: 'getRelationship',
    },
    {
      relationKey: 'physicalObjects',
      type: 'updateRelationship',
    },
    {
      relationKey: 'places',
      type: 'getRelationship',
    },
    {
      relationKey: 'places',
      type: 'updateRelationship',
    },
    {
      relationKey: 'preparationTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'preparationTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'taxonNames',
      type: 'getRelationship',
    },
    {
      relationKey: 'taxonNames',
      type: 'updateRelationship',
    },
    {
      relationKey: 'typeSpecimenType',
      type: 'getRelationship',
    },
    {
      relationKey: 'typeSpecimenType',
      type: 'updateRelationship',
    },
  ],
  resource: 'specimen',
}

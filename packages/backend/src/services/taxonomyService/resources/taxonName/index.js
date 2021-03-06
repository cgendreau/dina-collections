const migrations = require('./data/migrations')
const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./data/transformationSpecifications')

const createTaxonNameRequestSuccess = require('./operations/create/examples/requestSuccess.json')

const {
  getMany: getManyFilterSpecification,
  query: queryFilterSpecification,
} = require('./data/filterSpecifications')

const {
  clearAcceptedToTaxon,
  clearSynonymToTaxon,
  clearOtherTaxonNamesFromTaxon,
} = require('./data/preHooks')

const {
  create: createPostHooks,
  del: delPostHooks,
  update: updatePostHooks,
} = require('./data/postHooks')

module.exports = {
  basePath: '/api/taxonomy/v01',
  migrations,
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'taxonName',
    relations: ['taxon'],
  },
  operations: [
    {
      exampleRequests: { primary: createTaxonNameRequestSuccess },
      postHooks: createPostHooks,
      type: 'create',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      filterSpecification: getManyFilterSpecification,
      includeRelations: true,
      sortableFields: ['id', 'attributes.name'],
      type: 'getMany',
    },
    {
      filterSpecification: queryFilterSpecification,
      selectableFields: ['id', 'attributes.name', 'attributes.rank'],
      sortableFields: ['id', 'attributes.name'],
      type: 'query',
    },
    {
      postHooks: updatePostHooks,
      type: 'update',
    },
    {
      postHooks: delPostHooks,
      type: 'del',
    },
    {
      relationKey: 'acceptedToTaxon',
      type: 'getRelationship',
    },
    {
      transformationSpecification: importDataFromFileTransformationSpecification,
      type: 'importDataFromFile',
    },
    {
      preHooks: [clearOtherTaxonNamesFromTaxon, clearSynonymToTaxon],
      relationKey: 'acceptedToTaxon',
      type: 'updateRelationship',
    },
    {
      relationKey: 'synonymToTaxon',
      type: 'getRelationship',
    },
    {
      preHooks: [clearOtherTaxonNamesFromTaxon, clearAcceptedToTaxon],
      relationKey: 'synonymToTaxon',
      type: 'updateRelationship',
    },
    {
      relationKey: 'vernacularToTaxon',
      type: 'getRelationship',
    },
    {
      relationKey: 'vernacularToTaxon',
      type: 'updateRelationship',
    },
  ],
  resource: 'taxonName',
}

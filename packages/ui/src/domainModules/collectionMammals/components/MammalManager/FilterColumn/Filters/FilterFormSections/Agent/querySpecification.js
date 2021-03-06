import createTagSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/tagSpecification'

export default createTagSpecification({
  matchFilterFunctionName: 'matchAgentTags',
  searchFilterFunctionName: 'searchAgentTags',
  sectionName: 'agent',
  tagTypeAggregationFunctionName: 'aggregateAgentTagTypes',
  tagTypesFieldName: 'agent.tagTypes',
  tagValuesAggregationFunctionName: 'aggregateAgentTagValues',
  tagValuesFieldName: 'agent.tagValues',
})

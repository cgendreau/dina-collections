export const getCatalogNumberFromIdentifiers = (identifiers = []) => {
  const catalogNumberIdentifier = identifiers.find(({ identifierType }) => {
    return identifierType === 'catalogNumber'
  })
  return catalogNumberIdentifier && catalogNumberIdentifier.value
}

// TODO change to specimen instead of individual
export const createMammalFormInitialValues = individual => {
  if (!(individual && Object.keys(individual).length)) {
    return {
      determinations: [{}],
      identifiers: [
        {
          identifierType: {
            id: '1',
          },
          nameSpace: '',
          publishRecord: false,
          remarks: '',
          value: '',
        },
      ],
      recordHistoryEvents: [],
    }
  }
  // TODO set default params for existing individual
  return individual
}

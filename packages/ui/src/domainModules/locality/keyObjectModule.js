import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  keys: ['filter', 'filter.searchQuery', 'filter.limit', 'filter.group'],
  name: 'locality',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }

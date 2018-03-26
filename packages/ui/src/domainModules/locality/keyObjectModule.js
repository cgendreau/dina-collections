import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  initialValues: {
    collectionBlockType: 'list',
  },
  keys: [
    'collectionBlockType',
    'filter',
    'filter.searchQuery',
    'filter.limit',
    'filter.group',
  ],
  name: 'locality',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }

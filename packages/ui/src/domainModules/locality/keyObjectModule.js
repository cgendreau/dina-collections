import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'LOCALITY',
  keys: [
    ':name.collectionBlockType',
    ':name.filter',
    ':name.filter.group',
    ':name.filter.limit',
    ':name.filter.searchQuery',
    ':name.filter.parentId',
    ':name.filter.offset',
    'localityDropdown.:identifier.searchQuery',
  ],
  name: 'locality',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }

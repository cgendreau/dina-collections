import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  actionPrefix: 'STORAGE',
  initialValues: {
    search: {
      loading: false,
      searchQuery: '',
    },
  },
  keys: ['search', 'search.searchQuery', 'search.loading'],
  name: 'storage',
})

export { actionCreators, actionTypes, constants, globalSelectors, reducer }

import keyObjectModuleFactory from 'utilities/keyObjectModuleFactory'
import { MODULE_NAME as name } from './constants'

const {
  actionCreators,
  actionTypes,
  constants,
  globalSelectors,
  reducer,
} = keyObjectModuleFactory({
  initialValues: {
    viewMode: 'split',
  },
  keys: [':viewMode'],
  name,
})
console.log('actionTypes actionTypes', actionTypes)
console.log('globalSelectors globalSelectors', globalSelectors)
console.log('actionCreators actionCreators', actionCreators)
console.log('name', name)

export { actionCreators, actionTypes, constants, globalSelectors, reducer }

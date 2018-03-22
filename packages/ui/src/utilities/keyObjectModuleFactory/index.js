import createActionCreators from './createActionCreators'
import createActionTypesMap from './createActionTypesMap'
import createConstants from './createConstants'
import createGlobalSelectors from './createGlobalSelectors'
import createReducer from './createReducer'
import createSelectors from './createSelectors'

export default function({ name, keys = [] }) {
  const actionPrefix = 'LOCALITY_KEY_OBJECT'

  const constants = createConstants({
    name,
  })

  const actionTypesMap = createActionTypesMap({
    actionPrefix,
    keys,
  })

  const actionCreators = createActionCreators(actionTypesMap)

  const reducer = createReducer(actionTypesMap)
  const selectors = createSelectors({ keys, name })

  const actionTypes = {
    ...actionTypesMap.del,
    ...actionTypesMap.set,
  }

  const globalSelectors = createGlobalSelectors(selectors)
  return {
    // middleware,
    actionCreators,
    actionTypes,
    constants,
    globalSelectors,
    reducer,
    selectors,
  }
}

// import * as actionCreators from './actionCreators'
// import * as actionTypes from './actionTypes'
// import * as components from './components'
// import * as constants from './constants'
// import * as endpoints from './endpoints'
// import * as higherOrderComponents from './higherOrderComponents'
// import * as notifications from './notifications'
// import * as selectors from './selectors'
// import * as shortcuts from './shortcuts'
// import globalSelectors from './globalSelectors'
// import middleware from './middleware'
// import reducer from './reducer'
// import translations from './translations.json'

// const name = constants.MODULE_NAME

// export {
//   actionCreators,
//   actionTypes,
//   components,
//   constants,
//   endpoints,
//   globalSelectors,
//   higherOrderComponents,
//   middleware,
//   name,
//   notifications,
//   reducer,
//   selectors,
//   shortcuts,
//   translations,
// }

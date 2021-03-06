import { reducer } from './keyObjectModule'
import * as actionCreators from './actionCreators'
import * as actionTypes from './actionTypes'
import * as components from './components'
import * as constants from './constants'
import * as endpoints from './endpoints'
import globalSelectors from './globalSelectors'
import markdown from './__markdown__/index.json'
import translations from './translations.json'

const name = constants.MODULE_NAME

export {
  actionCreators,
  actionTypes,
  components,
  constants,
  endpoints,
  globalSelectors,
  markdown,
  name,
  reducer,
  translations,
}

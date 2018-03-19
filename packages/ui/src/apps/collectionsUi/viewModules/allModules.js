import * as app from './app'
import * as docs from './docs'
import * as editMammal from './editMammal'
import * as home from './home'
import * as login from './login'
import * as lookupMammals from './lookupMammals'
import * as pageNotFound from './pageNotFound'
import * as publicModule from './public'
import * as registerMammal from './registerMammal'
import * as settings from './settings'
import * as start from './start'
import * as storage from './storage'
import * as taxonomyView from './taxonomyView'
import * as localities from './localities'

const modules = [
  publicModule,
  start,
  app,
  editMammal,
  home,
  lookupMammals,
  registerMammal,
  login,
  settings,
  docs,
  pageNotFound,
  storage,
  taxonomyView,
  localities,
]

export default modules

import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'
import { MODULE_NAME } from './constants'

export default createAsyncView({
  modules: () => {
    return [
      import('coreModules/layout'),
      import('domainModules/localityService'),
      import('domainModules/locality'),
      import('coreModules/form'),
      import('coreModules/crudManager'),
    ]
  },
  name: MODULE_NAME,
  view: () => {
    return import('./index.js')
  },
})

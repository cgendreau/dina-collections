import { SIZE_SET_BREAKPOINT } from 'coreModules/size/actionTypes'
import { SIZE_SMALL } from 'coreModules/size/constants'
import { actionCreators, selectors } from './keyObjectModule'
import { LAYOUT_SINGLE } from './constants'

export default function layoutMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const result = next(action)
    switch (action.type) {
      case SIZE_SET_BREAKPOINT: {
        if (action.payload.size === SIZE_SMALL) {
          const layoutState = selectors.getLocalState(getState())
          const layoutStateKeys = Object.keys(layoutState)

          if (layoutStateKeys.length) {
            layoutStateKeys.forEach(name => {
              dispatch(
                actionCreators.set[':name.layoutMode'](LAYOUT_SINGLE, { name })
              )
            })
          }
        }
        break
      }
      default:
        break
    }
    return result
  }
}

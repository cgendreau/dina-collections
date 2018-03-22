import { createDeleter, createSetter } from 'utilities/stateHelper'

const createSetActionHandlers = setActionTypes => {
  return Object.keys(setActionTypes).reduce((setHandlersCreators, key) => {
    const actionType = setActionTypes[key]
    const setter = createSetter([key])

    return {
      ...setHandlersCreators,
      [actionType]: (state, action) => {
        const { value } = action.payload
        return setter(state, value)
      },
    }
  }, {})
}

const createDelActionHandlers = delActionTypes => {
  return Object.keys(delActionTypes).reduce((delHandlersCreators, key) => {
    const actionType = delActionTypes[key]
    const deleter = createDeleter([key])

    return {
      ...delHandlersCreators,
      [actionType]: state => {
        return deleter(state)
      },
    }
  }, {})
}

export default function createReducer(actionTypesMap) {
  const delActionHandlers = createDelActionHandlers(actionTypesMap.del)
  const setActionHandlers = createSetActionHandlers(actionTypesMap.set)

  return function reducer(state = {}, action) {
    const { type } = action

    if (delActionHandlers[type]) {
      return delActionHandlers[type](state, action)
    }

    if (setActionHandlers[type]) {
      return setActionHandlers[type](state, action)
    }
    return state
  }
}

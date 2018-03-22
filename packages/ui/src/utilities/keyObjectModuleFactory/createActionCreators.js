const createSetActionCreators = setActionTypes => {
  return Object.keys(setActionTypes).reduce((setActionCreators, key) => {
    const actionType = setActionTypes[key]

    return {
      ...setActionCreators,
      [key]: value => {
        return {
          payload: { value },
          type: actionType,
        }
      },
    }
  }, {})
}

const createDelActionCreators = delActionTypes => {
  return Object.keys(delActionTypes).reduce((delActionCreators, key) => {
    const actionType = delActionTypes[key]

    return {
      ...delActionCreators,
      [key]: () => {
        return {
          type: actionType,
        }
      },
    }
  }, {})
}

export default function createActionCreators(actionTypesMap) {
  return {
    set: createSetActionCreators(actionTypesMap.set),
    del: createDelActionCreators(actionTypesMap.del),
  }
}

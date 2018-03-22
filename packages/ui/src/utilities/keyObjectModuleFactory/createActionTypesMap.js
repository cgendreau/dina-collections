const createActionTypes = ({ actionPrefix, actionVerb, keys }) => {
  return keys.reduce((setActionTypes, key) => {
    return {
      ...setActionTypes,
      [key]: `${actionPrefix}_${actionVerb}_${key.toUpperCase()}`,
    }
  }, {})
}

export default function createActionTypesMap({ actionPrefix, keys }) {
  return {
    del: createActionTypes({ actionPrefix, actionVerb: 'DEL', keys }),
    set: createActionTypes({ actionPrefix, actionVerb: 'SET', keys }),
  }
}

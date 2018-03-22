import { createGetter } from 'utilities/stateHelper'

export default function createSelectors({ keys, name }) {
  const getLocalState = state => {
    return state[name]
  }

  return keys.reduce(
    (selectors, key) => {
      const getter = createGetter([key])
      return {
        ...selectors,
        [key]: state => {
          return getter(state)
        },
      }
    },
    { getLocalState }
  )
}

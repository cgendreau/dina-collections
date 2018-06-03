import createLog from 'utilities/log'

import Dependor from 'utilities/Dependor'

const log = createLog(
  'coreModules:crud:actionHandlers:updateStateWithManyFactory'
)

export default function updateStateWithManyFactory(
  { operationType, resource } = {}
) {
  return function handleMany(state, action) {
    if (!(action && action.payload && Array.isArray(action.payload))) {
      log.debug(
        `Received action ${action && action.type} for ${resource}.${
          operationType
        }. Aborting`
      )
      return state
    }

    log.debug(
      `Received action ${action.type} for ${resource}.${
        operationType
      }. Updating state from action: `,
      action
    )

    const newItems = {}
    action.payload.forEach(item => {
      const { id } = item
      if (id) {
        const currentItem = state.items[id]
        if (currentItem && currentItem.relationships) {
          newItems[id] = {
            ...item,
            relationships: {
              ...currentItem.relationships,
              ...(item.relationships || {}),
            },
          }
        } else {
          newItems[id] = item
        }
      }
    })
    return {
      ...state,
      items: {
        ...state.items,
        ...newItems,
      },
    }
  }
}

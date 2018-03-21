import { MODULE_NAME } from './constants'

export const getLocalState = state => {
  return state[MODULE_NAME]
}

export const getListFilters = state => {
  const localState = getLocalState(state)
  return localState.filters
}

export const getListFilterById = (state, id) => {
  const listFilters = getListFilters(state)
  return listFilters ? listFilters[id] : null
}

export const getLocalityListSearchFilter = (state, id) => {
  const listFilter = getListFilterById(state, id)
  return listFilter ? listFilter.search : null
}

import debounce from 'lodash.debounce'

import createLog from 'utilities/log'
import { getTaxaByName } from 'dataModules/taxonService/actionCreators'
import globalSelectors from './globalSelectors'
import { TAXON_SERVICE_UPDATE_SEARCH_QUERY } from './actionTypes'

const log = createLog('dataModules:taxonService:middleware')

const debounceTaxonSearch = debounce(
  ({ dispatch, getState, inputName }) => {
    log.debug('Debounce getTaxaByName')
    const searchQuery = globalSelectors.getLookupSearchQuery(
      getState(),
      inputName
    )

    if (searchQuery) {
      dispatch(
        getTaxaByName({
          isLookup: true,
          queryParams: {
            filter: {
              name: searchQuery,
            },
            limit: 10,
          },
        })
      )
    }
  },
  100,
  {
    maxWait: 500,
  }
)

export default function createTaxonMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const result = next(action)
    switch (action.type) {
      case TAXON_SERVICE_UPDATE_SEARCH_QUERY: {
        if (action.payload) {
          const { inputName } = action.meta
          debounceTaxonSearch({ dispatch, getState, inputName })
        }
        break
      }

      default:
        break
    }
    return result
  }
}
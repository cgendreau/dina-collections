import { push } from 'react-router-redux'
import globalSelectors from 'domainModules/localityService/globalSelectors'

export default function redirectToPrev(currentId) {
  return (dispatch, getState) => {
    const nextId = globalSelectors.getPrevCuratedLocalityIdFromFilter(
      getState(),
      currentId
    )
    console.log('nextId', nextId)
    dispatch(push(`/app/localities/${nextId}/edit`))
  }
}

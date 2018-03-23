import { push } from 'react-router-redux'
import globalSelectors from 'domainModules/localityService/globalSelectors'

export default function redirectToNext(currentId) {
  return (dispatch, getState) => {
    console.log('currentId', currentId)
    const nextId = globalSelectors.getNextCuratedLocalityIdFromFilter(
      getState(),
      currentId
    )
    console.log('nextId', nextId)
    dispatch(push(`/app/localities/${nextId}/edit`))
  }
}

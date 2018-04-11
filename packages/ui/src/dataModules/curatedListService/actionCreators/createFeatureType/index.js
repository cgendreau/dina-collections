import { flattenObjectResponse } from 'utilities/transformations'

import {
  CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_FAIL,
  CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_REQUEST,
  CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_SUCCESS,
} from '../../actionTypes'
import { CREATE_FEATURE_OBSERVATION_TYPE } from '../../endpoints'
import { FEATURE_OBSERVATION_TYPE } from '../../constants'

export default function createFeatureType(
  { featureType, throwError = false } = {}
) {
  const body = {
    data: {
      attributes: { ...featureType },
      type: FEATURE_OBSERVATION_TYPE,
    },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { featureType },
      type: CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_REQUEST,
    })

    return apiClient.call(CREATE_FEATURE_OBSERVATION_TYPE, { body }).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { featureType },
          payload: error,
          type: CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
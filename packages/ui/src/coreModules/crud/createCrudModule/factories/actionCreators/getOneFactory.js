import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'
import { flattenObjectResponse } from 'utilities/transformations'
import getActionActionTypes from './utilities/getActionActionTypes'

export const dep = new Dependor({
  flattenObjectResponse,
  getActionActionTypes,
})

const log = createLog('coreModules:crud:actionCreators:getOne')

export default function getOneAcFactory(
  { operationId, operationType, resource, resourceActionTypes } = {}
) {
  const actionTypes = dep.getActionActionTypes({
    operationType,
    resource,
    resourceActionTypes,
  })

  if (!resource) {
    throw new Error('resource is required')
  }

  if (!operationId) {
    throw new Error('operationId is required')
  }

  return function getOneAc({
    id,
    relationships = ['all'],
    throwError = false,
  }) {
    log.debug(`${resource}.getOne called`, {
      id,
      relationships,
      throwError,
    })

    return (dispatch, getState, { apiClient }) => {
      if (!id) {
        throw new Error('Id is required')
      }

      const pathParams = { id }
      const queryParams = {
        relationships,
      }
      const callParams = {
        pathParams,
        queryParams,
      }

      dispatch({
        meta: callParams,
        type: actionTypes.request,
      })
      return apiClient.call(operationId, callParams).then(
        response => {
          const transformedResponse = dep.flattenObjectResponse(response.data)
          dispatch({
            meta: callParams,
            payload: transformedResponse,
            type: actionTypes.success,
          })
          return transformedResponse
        },
        error => {
          dispatch({
            error: true,
            meta: callParams,
            payload: error,
            type: actionTypes.fail,
          })

          if (throwError) {
            throw error
          }
          return error
        }
      )
    }
  }
}
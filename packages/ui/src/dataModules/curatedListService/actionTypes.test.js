import * as actionTypes from './actionTypes'

const expectedActionTypeValues = [
  'CURATED_LIST_SERVICE_CREATE_DISTINGUISHED_UNIT_TYPE_FAIL',
  'CURATED_LIST_SERVICE_CREATE_DISTINGUISHED_UNIT_TYPE_REQUEST',
  'CURATED_LIST_SERVICE_CREATE_DISTINGUISHED_UNIT_TYPE_SUCCESS',
  'CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_FAIL',
  'CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_REQUEST',
  'CURATED_LIST_SERVICE_CREATE_FEATURE_OBSERVATION_TYPE_SUCCESS',
  'CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPES_FAIL',
  'CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPES_REQUEST',
  'CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPES_SUCCESS',
  'CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_FAIL',
  'CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_REQUEST',
  'CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_SUCCESS',
  'CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPE_FAIL',
  'CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPE_REQUEST',
  'CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPE_SUCCESS',
  'CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_FAIL',
  'CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_REQUEST',
  'CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_SUCCESS',
  'CURATED_LIST_SERVICE_UPDATE_DISTINGUISHED_UNIT_TYPE_FAIL',
  'CURATED_LIST_SERVICE_UPDATE_DISTINGUISHED_UNIT_TYPE_REQUEST',
  'CURATED_LIST_SERVICE_UPDATE_DISTINGUISHED_UNIT_TYPE_SUCCESS',
  'CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_FAIL',
  'CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_REQUEST',
  'CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_SUCCESS',
]

describe('dataModules/curatedListService/actionTypes', () => {
  it('exports expected types', () => {
    expect(Object.values(actionTypes).sort()).toEqual(
      expectedActionTypeValues.sort()
    )
  })
})
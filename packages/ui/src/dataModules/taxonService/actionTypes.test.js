import * as actionTypes from './actionTypes'

const expectedActionTypeValues = [
  'TAXON_SERVICE_CREATE_TAXON_FAIL',
  'TAXON_SERVICE_CREATE_TAXON_REQUEST',
  'TAXON_SERVICE_CREATE_TAXON_SUCCESS',
  'TAXON_SERVICE_GET_TAXA_BY_NAME_FAIL',
  'TAXON_SERVICE_GET_TAXA_BY_NAME_REQUEST',
  'TAXON_SERVICE_GET_TAXA_BY_NAME_SUCCESS',
  'TAXON_SERVICE_GET_TAXON_FAIL',
  'TAXON_SERVICE_GET_TAXON_REQUEST',
  'TAXON_SERVICE_GET_TAXON_SUCCESS',
  'TAXON_SERVICE_UPDATE_TAXON_FAIL',
  'TAXON_SERVICE_UPDATE_TAXON_REQUEST',
  'TAXON_SERVICE_UPDATE_TAXON_SUCCESS',
]

describe('dataModules/taxonService/actionTypes', () => {
  it('exports expected types', () => {
    expect(Object.values(actionTypes).sort()).toEqual(
      expectedActionTypeValues.sort()
    )
  })
})
import * as actionTypes from './actionTypes'

const expectedActionTypeValues = ['LOCALITY_UPDATE_LOCALITY_LIST_SEARCH_FILTER']

describe('domainModules/locality/actionTypes', () => {
  it('exports expected types', () => {
    expect(Object.values(actionTypes).sort()).toEqual(
      expectedActionTypeValues.sort()
    )
  })
})

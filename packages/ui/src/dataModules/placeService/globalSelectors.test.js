import globalSelectors from './globalSelectors'

describe('dataModules/placeService/globalSelectors', () => {
  it('returns object', () => {
    return expect(typeof globalSelectors).toEqual('object')
  })
})
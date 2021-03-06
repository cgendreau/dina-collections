import {
  getLocalState,
  getLookup,
  getLookupDropdownOptions,
  getLookupError,
  getLookupLoading,
  getLookupResult,
  getLookupSearchQuery,
  getLookupSearchQueries,
} from './selectors'

describe('domainModules/taxon/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      lookup: {
        error: null,
        loading: false,
        result: [{ attributes: { name: 'Sorex minutus' }, id: '123' }],
        searchQueries: {
          'taxon.1': 'bat',
        },
      },
    }
  })

  it('returns local state', () => {
    const globalState = { taxon: state }
    expect(getLocalState(globalState)).toEqual(state)
  })

  describe('lookup', () => {
    it('returns lookup', () => {
      expect(getLookup(state)).toEqual(state.lookup)
    })
    it('returns lookupError', () => {
      expect(getLookupError(state)).toEqual(null)
    })
    it('returns lookupLoading', () => {
      expect(getLookupLoading(state)).toEqual(false)
    })
    it('returns lookupResult', () => {
      expect(getLookupResult(state)).toEqual([
        { attributes: { name: 'Sorex minutus' }, id: '123' },
      ])
    })
    it('returns lookup dropdown options', () => {
      expect(getLookupDropdownOptions(state)).toEqual([
        { key: '123', text: 'Sorex minutus', value: '123' },
      ])
    })
    it('returns lookupSearchQueries', () => {
      expect(getLookupSearchQueries(state)).toEqual({ 'taxon.1': 'bat' })
    })
    it('returns lookupSearchQuery', () => {
      expect(getLookupSearchQuery(state, 'taxon.1')).toEqual('bat')
    })
  })
})

import { getLocalState } from './selectors'

describe('domainModules/locality/selectors', () => {
  let state
  it('returns local state', () => {
    const globalState = { localityService: state }
    expect(getLocalState(globalState)).toEqual(state)
  })
})

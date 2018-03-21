// import deepFreeze from 'deep-freeze'

import UNKNOWN_ACTION from 'utilities/test/unknownActionType'
import reducer, { getInitialState } from './reducer'

// const getPayload = () => {
//   return {
//     id: 'a73jhdc62sdgs5x4dsh2',
//     name: 'Alan',
//     type: 'type',
//   }
// }

describe('domainModules/locality/reducer', () => {
  describe('getInitialState', () => {
    it('returns empty object', () => {
      const testValue = getInitialState()
      const expectedResult = {}

      expect(testValue).toEqual(expectedResult)
    })

    it('returns new empty object every time', () => {
      const testValue1 = getInitialState()
      const testValue2 = getInitialState()

      expect(testValue1).not.toBe(testValue2)
    })
  })
  describe('reducer', () => {
    it('returns initial state', () => {
      const testValue = reducer(undefined, { type: UNKNOWN_ACTION })
      const expectedResult = getInitialState()

      expect(testValue).toEqual(expectedResult)
    })
  })
})

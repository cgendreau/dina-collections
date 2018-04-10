import deepFreeze from 'deep-freeze'

import updateResourceInState from './index'

describe('utilities/stateHelper/updateResourceInState', () => {
  it('returns state if action does not contain payload', () => {
    const state = { 1: { id: '1' } }
    deepFreeze(state)
    const action = { payload: undefined }

    const testValue = updateResourceInState(state, action)
    const expectedResult = { ...state }

    expect(testValue).toEqual(expectedResult)
  })
  it('returns state if payload does not contain id', () => {
    const state = { 1: { id: '1' } }
    deepFreeze(state)
    const action = { payload: { id: undefined } }

    const testValue = updateResourceInState(state, action)
    const expectedResult = { ...state }

    expect(testValue).toEqual(expectedResult)
  })
  it('returns new, updated state object', () => {
    const state = { 1: { id: '1' } }
    deepFreeze(state)

    const id = '2'
    const relationships = null
    const action = {
      payload: {
        firstName: 'Ada',
        id,
        lastName: 'Lovelace',
        relationships,
        type: 'scientist',
      },
    }

    const testValue = updateResourceInState(state, action)
    const expectedResult = {
      ...state,
      [id]: action.payload,
    }

    expect(testValue).toEqual(expectedResult)
  })
  it('does shallow merge of new and old data', () => {
    const state = {
      '1': {
        children: ['2', '3'],
        group: 'oldGroup',
        id: '1',
      },
    }
    deepFreeze(state)

    const action = {
      payload: {
        group: 'newGroup',
        id: '1',
        somethingNew: { awesome: 'yes' },
      },
    }

    const testValue = updateResourceInState(state, action)
    const expectedResult = {
      '1': {
        children: ['2', '3'],
        group: 'newGroup',
        id: '1',
        somethingNew: { awesome: 'yes' },
      },
    }

    expect(testValue).toEqual(expectedResult)
  })
  it('sets new data if old resource is undefined', () => {
    const state = {}
    deepFreeze(state)

    const action = {
      payload: {
        group: 'newGroup',
        id: '1',
        somethingNew: { awesome: 'yes' },
      },
    }

    const testValue = updateResourceInState(state, action)
    const expectedResult = {
      '1': {
        group: 'newGroup',
        id: '1',
        somethingNew: { awesome: 'yes' },
      },
    }

    expect(testValue).toEqual(expectedResult)
  })
})

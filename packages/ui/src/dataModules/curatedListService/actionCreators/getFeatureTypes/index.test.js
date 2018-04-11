import setupMockStoreWithApiClient from 'utilities/test/setupMockStoreWithApiClient'

import getFeatureTypes from './index'
import * as actionTypes from '../../actionTypes'

describe('dataModules/curatedListService/actionCreators/getFeatureTypes', () => {
  let store
  let apiClient

  beforeEach(() => {
    const mock = setupMockStoreWithApiClient()
    /* eslint-disable prefer-destructuring */
    store = mock.store
    apiClient = mock.apiClientDependencies
    /* eslint-enable prefer-destructuring */
  })
  afterAll(() => {
    apiClient.reset()
  })

  it(`dispatches ${
    actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_REQUEST
  }`, () => {
    const id = '123'

    const testAction = getFeatureTypes({ id })

    const expectedAction = {
      type:
        actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_REQUEST,
    }

    store.dispatch(testAction)

    expect(store.getActions()).toEqual([expectedAction])
  })

  it(`calls getFeatureTypes`, () => {
    const operationId = 'getFeatureTypes'
    const id = '123'

    const callSpy = jest.fn()

    apiClient.mock({
      responses: {
        [operationId]: { data: [] },
      },
      spies: {
        [operationId]: callSpy,
      },
    })

    const testAction = getFeatureTypes({ id })

    expect.assertions(2)

    return store.dispatch(testAction).then(() => {
      expect(callSpy.mock.calls.length).toEqual(1)
      expect(callSpy.mock.calls[0][0]).toMatchObject({ operationId })
    })
  })

  it(`dispatches ${
    actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_SUCCESS
  } and returns transformed response`, () => {
    const operationId = 'getFeatureTypes'
    const id = '123'
    const mockResponse = {
      data: [
        {
          attributes: {
            name: 'Ada',
          },
          id: '123',
          type: 'type',
        },
        {
          attributes: {
            name: 'Alan',
          },
          id: '456',
          type: 'type',
        },
      ],
    }
    const transformedResponse = [
      {
        id: '123',
        name: 'Ada',
        type: 'type',
      },
      {
        id: '456',
        name: 'Alan',
        type: 'type',
      },
    ]

    apiClient.mock({
      responses: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getFeatureTypes({ id })

    const expectedFirstAction = {
      type:
        actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_REQUEST,
    }
    const expectedSecondAction = {
      payload: transformedResponse,
      type:
        actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_SUCCESS,
    }

    expect.assertions(2)

    return store.dispatch(testAction).then(res => {
      expect(store.getActions()).toEqual([
        expectedFirstAction,
        expectedSecondAction,
      ])
      expect(res).toEqual(transformedResponse)
    })
  })

  it(`dispatches ${
    actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_FAIL
  } without throwing error`, () => {
    const operationId = 'getFeatureTypes'
    const id = '123'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getFeatureTypes({ id })

    const expectedFirstAction = {
      type:
        actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      payload: mockResponse,
      type: actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_FAIL,
    }

    expect.assertions(2)

    return store.dispatch(testAction).then(res => {
      expect(store.getActions()).toEqual([
        expectedFirstAction,
        expectedSecondAction,
      ])
      expect(res).toEqual(undefined)
    })
  })

  it(`dispatches ${
    actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_FAIL
  } and throws error`, () => {
    const operationId = 'getFeatureTypes'
    const mockResponse = { status: 404 }

    apiClient.mock({
      errors: {
        [operationId]: mockResponse,
      },
    })

    const testAction = getFeatureTypes({ throwError: true })

    const expectedFirstAction = {
      type:
        actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_REQUEST,
    }
    const expectedSecondAction = {
      error: true,
      payload: mockResponse,
      type: actionTypes.CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_FAIL,
    }

    expect.assertions(2)

    return store.dispatch(testAction).catch(err => {
      expect(store.getActions()).toEqual([
        expectedFirstAction,
        expectedSecondAction,
      ])
      expect(err).toEqual(mockResponse)
    })
  })
})
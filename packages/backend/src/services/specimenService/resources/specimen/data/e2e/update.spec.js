const apiDescribe = require('../../../../../../utilities/test/apiDescribe')
const {
  makeTestCall,
} = require('../../../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../../../utilities/test/waitForApiRestart')
const expectError404 = require('../../../../../../utilities/test/expectError404')
const expectError400 = require('../../../../../../utilities/test/expectError400')
const expectSingleResourceResponse = require('../../../../../../utilities/test/expectSingleResourceResponse')

const fullFormExample = require('../exampleRequests/createSuccess')
const updateFullFormExample = require('../exampleRequests/updateSuccess.json')

const { getTestData } = require('../testData')

apiDescribe('specimen', () => {
  beforeAll(() => {
    return waitForApiRestart()
  })

  describe('update', () => {
    describe('base cases', () => {
      let existingId
      beforeEach(() => {
        return makeTestCall({
          body: fullFormExample,
          flushModels: ['catalogNumber'],
          operationId: 'specimenCreate',
        }).then(response => {
          expectSingleResourceResponse({
            expectedType: 'specimen',
            response,
          })
          existingId = response.data.id
        })
      })
      it('Succeed with valid individual', () => {
        return makeTestCall({
          body: updateFullFormExample,
          operationId: 'specimenUpdate',
          pathParams: { id: existingId },
        }).then(response => {
          expect(response).toBeTruthy()
        })
      })
      it('Fails with missing body', () => {
        return expectError400(
          makeTestCall({
            operationId: 'specimenUpdate',
            pathParams: { id: existingId },
          })
        )
      })
      it('Fails with non existing id', () => {
        return expectError404(
          makeTestCall({
            body: updateFullFormExample,
            operationId: 'specimenUpdate',
            pathParams: { id: '-1' },
          })
        )
      })
    })
    describe('relation cases', () => {
      describe('existing physicalObject relations', () => {
        let simpleDataPhysicalObjectRelationsId
        beforeEach(() => {
          return makeTestCall({
            body: getTestData('simpleDataPhysicalObjectRelations'),
            flushModels: ['catalogNumber'],
            operationId: 'specimenCreate',
          }).then(response => {
            simpleDataPhysicalObjectRelationsId = response.data.id
          })
        })
        it('Dont modify relationships if relationships not updated', () => {
          const simpleDataPhysicalObjectRelations = getTestData(
            'simpleDataPhysicalObjectRelations'
          )
          const simpleDataPhysicalObjectRelationsWithoutRelations = getTestData(
            'simpleDataPhysicalObjectRelations'
          )
          delete simpleDataPhysicalObjectRelationsWithoutRelations.data
            .relationships
          return makeTestCall({
            body: simpleDataPhysicalObjectRelationsWithoutRelations,
            flushModels: ['catalogNumber'],
            operationId: 'specimenUpdate',
            pathParams: { id: simpleDataPhysicalObjectRelationsId },
          })
            .then(() => {
              return makeTestCall({
                operationId: 'specimenGetOne',
                pathParams: {
                  id: simpleDataPhysicalObjectRelationsId,
                },
                queryParams: {
                  relationships: ['physicalObjects'],
                },
              })
            })
            .then(response => {
              expectSingleResourceResponse({
                expectedType: 'specimen',
                relationships: {
                  physicalObjects: {
                    ...simpleDataPhysicalObjectRelations.data.relationships
                      .physicalObjects,
                  },
                },
                response,
              })
            })
        })

        it('Return empty array if relationships physicalObjects set to empty array', () => {
          const simpleDataPhysicalObjectRelationsWithEmptyRelations = getTestData(
            'simpleDataPhysicalObjectRelations'
          )
          simpleDataPhysicalObjectRelationsWithEmptyRelations.data.relationships = {
            physicalObjects: {
              data: [],
            },
          }
          return makeTestCall({
            body: simpleDataPhysicalObjectRelationsWithEmptyRelations,
            flushModels: ['catalogNumber'],
            operationId: 'specimenUpdate',
            pathParams: { id: simpleDataPhysicalObjectRelationsId },
          })
            .then(() => {
              return makeTestCall({
                operationId: 'specimenGetOne',
                pathParams: { id: simpleDataPhysicalObjectRelationsId },
                queryParams: {
                  relationships: ['all'],
                },
              })
            })
            .then(response => {
              expectSingleResourceResponse({
                expectedType: 'specimen',
                relationships: {
                  ...getTestData('initialRelationships'),
                },
                response,
              })
            })
        })

        it('Return update relationships if provided. Dont update non existing other relations', () => {
          const simpleDataPhysicalObjectRelationsWithEmptyRelations = getTestData(
            'simpleDataPhysicalObjectRelations'
          )
          simpleDataPhysicalObjectRelationsWithEmptyRelations.data.relationships = {
            featureTypes: {
              data: [],
            },
            physicalObjects: {
              data: [{ id: '1234', type: 'physicalObject' }],
            },
          }
          return makeTestCall({
            body: simpleDataPhysicalObjectRelationsWithEmptyRelations,
            flushModels: ['catalogNumber'],
            operationId: 'specimenUpdate',
            pathParams: { id: simpleDataPhysicalObjectRelationsId },
          })
            .then(() => {
              return makeTestCall({
                operationId: 'specimenGetOne',
                pathParams: { id: simpleDataPhysicalObjectRelationsId },
                queryParams: {
                  relationships: ['all'],
                },
              })
            })
            .then(response => {
              expectSingleResourceResponse({
                expectedType: 'specimen',
                relationships: {
                  ...getTestData('initialRelationships'),
                  physicalObjects: {
                    data: [{ id: '1234', type: 'physicalObject' }],
                  },
                },
                response,
              })
            })
        })
        it('Return update relationships if provided. Dont update existing other relations', () => {
          const simpleDataPhysicalObjectRelations = getTestData(
            'simpleDataPhysicalObjectRelations'
          )
          const simpleDataPhysicalObjectRelationsWithAddedFeatureTypes = getTestData(
            'simpleDataPhysicalObjectRelations'
          )
          simpleDataPhysicalObjectRelationsWithAddedFeatureTypes.data.relationships = {
            featureTypes: {
              data: [
                {
                  id: '5555',
                  type: 'featureType',
                },
              ],
            },
          }
          return makeTestCall({
            body: simpleDataPhysicalObjectRelationsWithAddedFeatureTypes,
            flushModels: ['catalogNumber'],
            operationId: 'specimenUpdate',
            pathParams: { id: simpleDataPhysicalObjectRelationsId },
          })
            .then(() => {
              return makeTestCall({
                operationId: 'specimenGetOne',
                pathParams: { id: simpleDataPhysicalObjectRelationsId },
                queryParams: {
                  relationships: ['all'],
                },
              })
            })
            .then(response => {
              expectSingleResourceResponse({
                expectedType: 'specimen',
                relationships: {
                  ...getTestData('initialRelationships'),
                  featureTypes: {
                    data: [
                      {
                        id: '5555',
                        type: 'featureType',
                      },
                    ],
                  },
                  physicalObjects:
                    simpleDataPhysicalObjectRelations.data.relationships
                      .physicalObjects,
                },
                response,
              })
            })
        })
      })
    })

    describe('no existing relations', () => {
      let simpleDataNoRelationsId
      beforeEach(() => {
        return makeTestCall({
          body: getTestData('simpleDataNoRelations'),
          flushModels: ['catalogNumber'],
          operationId: 'specimenCreate',
        }).then(response => {
          simpleDataNoRelationsId = response.data.id
        })
      })
      it('Expect relationships to be default if not updated', () => {
        const simpleDataNoRelationsWithoutRelations = getTestData(
          'simpleDataNoRelations'
        )
        return makeTestCall({
          body: simpleDataNoRelationsWithoutRelations,
          flushModels: ['catalogNumber'],
          operationId: 'specimenUpdate',
          pathParams: { id: simpleDataNoRelationsId },
        })
          .then(() => {
            return makeTestCall({
              operationId: 'specimenGetOne',
              pathParams: { id: simpleDataNoRelationsId },
              queryParams: {
                relationships: ['all'],
              },
            })
          })
          .then(response => {
            expectSingleResourceResponse({
              expectedType: 'specimen',
              relationships: {
                ...getTestData('initialRelationships'),
              },
              response,
            })
          })
      })
      it('Return update relationships if provided', () => {
        const simpleDataNoRelationsWithEmptyRelations = getTestData(
          'simpleDataNoRelations'
        )
        simpleDataNoRelationsWithEmptyRelations.data.relationships = {
          physicalObjects: {
            data: [{ id: '1234', type: 'physicalObject' }],
          },
        }

        return makeTestCall({
          body: simpleDataNoRelationsWithEmptyRelations,
          flushModels: ['catalogNumber'],
          operationId: 'specimenUpdate',
          pathParams: { id: simpleDataNoRelationsId },
        })
          .then(() => {
            return makeTestCall({
              operationId: 'specimenGetOne',
              pathParams: { id: simpleDataNoRelationsId },
              queryParams: {
                relationships: ['all'],
              },
            })
          })
          .then(response => {
            expectSingleResourceResponse({
              expectedType: 'specimen',
              relationships: {
                ...getTestData('initialRelationships'),
                physicalObjects: {
                  data: [{ id: '1234', type: 'physicalObject' }],
                },
              },
              response,
            })
          })
      })
      it('Throws if wrong format of relationships provided', () => {
        const simpleDataNoRelationsWithEmptyRelations = getTestData(
          'simpleDataNoRelations'
        )
        simpleDataNoRelationsWithEmptyRelations.data.relationships = {
          physicalObjects: {
            data: [{ id: '1234', type: 'catUnit' }],
          },
        }

        return expectError400(
          makeTestCall({
            body: simpleDataNoRelationsWithEmptyRelations,
            flushModels: ['catalogNumber'],
            operationId: 'specimenUpdate',
            pathParams: { id: simpleDataNoRelationsId },
          })
        )
      })
    })
  })
})

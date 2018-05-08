import transformFeatureObservations from './transformFeatureObservations'
import transformRecordHistoryEvents from './transformRecordHistoryEvents'

export default function transformInput({ featureTypes = [], specimen = {} }) {
  const transformedSpecimen = { ...specimen }
  if (!transformedSpecimen.individual) {
    transformedSpecimen.individual = {}
  }

  if (!transformedSpecimen.individual.determinations) {
    transformedSpecimen.individual.determinations = [{}]
  }

  if (!transformedSpecimen.individual.identifiers) {
    transformedSpecimen.individual.identifiers = [
      {
        identifierType: {
          id: '1',
        },
        nameSpace: '',
        publishRecord: false,
        remarks: '',
        value: '',
      },
    ]
  }
  if (!transformedSpecimen.individual.recordHistoryEvents) {
    transformedSpecimen.individual.recordHistoryEvents = []
  }

  transformedSpecimen.individual.featureObservations = transformFeatureObservations(
    {
      featureObservations: transformedSpecimen.individual.featureObservations,
      featureTypes,
    }
  )

  transformedSpecimen.individual.recordHistoryEvents = transformRecordHistoryEvents(
    transformedSpecimen.individual.recordHistoryEvents
  )

  return transformedSpecimen.individual
}

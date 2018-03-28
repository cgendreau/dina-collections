import initialState from './initialState'

const mutations = [
  { name: 'taxonInformation.determinations.0.date', value: 'date' },
  {
    name: 'taxonInformation.determinations.0.determinationVerbatim',
    value: 'determinationVerbatim',
  },
  {
    name: 'taxonInformation.determinations.0.determinedByAgentText',
    value: 'determinedByAgentText',
  },
  {
    name: 'taxonInformation.determinations.0.isCurrentDetermination',
    value: true,
  },
  { name: 'taxonInformation.determinations.0.remarks', value: 'remarks' },

  {
    name: 'taxonInformation.determinations.0.taxon.id.hidden',
    value: '2367',
  },
  {
    name: 'featureObservations.1.date',
    value: 'date',
  },
  {
    name: 'featureObservations.1.featureObservationAgent',
    value: 'featureObservationAgent',
  },
  {
    name: 'featureObservations.1.featureObservationText.hidden',
    value: 'juvenile',
  },
  {
    name: 'featureObservations.1.methodText.hidden',
    value: 'known-age',
  },
  {
    name: 'featureObservations.1.remarks',
    value: 'remarks',
  },
  {
    name: 'distinguishedUnits.0.alternateIdentifiersText',
    value: 'alternateIdentifiersText',
  },
  {
    name: 'distinguishedUnits.0.physicalUnit.normalStorageLocationText',
    value: 'normalStorageLocationText',
  },
  {
    name: 'distinguishedUnits.0.physicalUnit.storedUnderTaxonName',
    value: 'Sorex minutus',
  },
  {
    name: 'distinguishedUnits.0.physicalUnitText',
    value: 'physicalUnitText',
  },
  {
    name: 'identifiers.0.publishRecord',
    value: true,
  },
  {
    name: 'identifiers.0.identifier.value',
    value: '123456',
  },
  {
    name: 'individualCircumstances.0.collectorsText',
    value: 'collectorsText',
  },
  {
    name: 'individualCircumstances.0.event.endDate',
    value: 'endDate',
  },
  {
    name: 'individualCircumstances.0.event.expeditionText',
    value: 'expeditionText',
  },

  {
    name:
      'individualCircumstances.0.event.localityInformation.curatedLocalities.0.id.hidden',
    value: 'Africa',
  },

  {
    name:
      'individualCircumstances.0.event.localityInformation.curatedLocalities.1.id.hidden',
    value: 'Algeria',
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.localityVerbatim',
    value: 'localityVerbatim',
  },
  {
    name: 'individualCircumstances.0.event.localityInformation.localityName',
    value: 'localityName',
  },
  {
    name: 'individualCircumstances.0.event.localityInformation.remarks',
    value: 'remarks',
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.position.latitude',
    value: 'latitude-string',
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.position.longitude',
    value: 'longitude-string',
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.position.referenceSystem',
    value: 'referenceSystem',
  },

  {
    name:
      'individualCircumstances.0.event.localityInformation.verticalPosition.maximumDepthInMeters',
    value: 100,
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.verticalPosition.maximumElevationInMeters',
    value: 100,
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.verticalPosition.minimumDepthInMeters',
    value: 20,
  },
  {
    name:
      'individualCircumstances.0.event.localityInformation.verticalPosition.minimumElevationInMeters',
    value: 20,
  },
  {
    name: 'individualCircumstances.0.event.startDate',
    value: 'startDate',
  },
]

const expectedOutput = {
  curatedLocalities: [
    { id: 'Africa', type: 'curatedLocality' },
    { id: 'Algeria', type: 'curatedLocality' },
  ],
  featureObservationTypes: [
    {
      id: '1',
      type: 'featureObservationType',
    },
  ],
  physicalUnits: [
    {
      normalStorageLocationText: 'normalStorageLocationText',
      storedUnderTaxonName: 'Sorex minutus',
    },
  ],
  specimen: {
    individualGroup: {
      distinguishedUnits: [
        {
          alternateIdentifiersText: 'alternateIdentifiersText',
          physicalUnit: {
            normalStorageLocationText: 'normalStorageLocationText',
            storedUnderTaxonName: 'Sorex minutus',
          },
          physicalUnitText: 'physicalUnitText',
        },
      ],
      featureObservations: [
        {
          date: 'date',
          featureObservationAgent: 'featureObservationAgent',
          featureObservationText: 'juvenile',
          featureObservationType: {
            id: '1',
            type: 'featureObservationType',
          },
          methodText: 'known-age',
          remarks: 'remarks',
        },
      ],

      identifiers: [
        {
          identifier: {
            identifierType: 'catalogNumber',
            nameSpace: '',
            value: '123456',
          },
          publishRecord: true,
          remarks: '',
        },
      ],
      individualCircumstances: [
        {
          collectorsText: 'collectorsText',
          event: {
            endDate: 'endDate',
            expeditionText: 'expeditionText',
            localityInformation: {
              curatedLocalities: [
                { id: 'Africa', type: 'curatedLocality' },
                { id: 'Algeria', type: 'curatedLocality' },
              ],
              localityName: 'localityName',
              localityVerbatim: 'localityVerbatim',
              position: {
                latitude: 'latitude-string',
                longitude: 'longitude-string',
                referenceSystem: 'referenceSystem',
              },
              remarks: 'remarks',
              verticalPosition: {
                maximumDepthInMeters: 100,
                maximumElevationInMeters: 100,
                minimumDepthInMeters: 20,
                minimumElevationInMeters: 20,
              },
            },
            startDate: 'startDate',
          },
        },
      ],
      taxonInformation: {
        determinations: [
          {
            date: 'date',
            determinationVerbatim: 'determinationVerbatim',
            determinedByAgentText: 'determinedByAgentText',
            isCurrentDetermination: true,
            remarks: 'remarks',
            taxon: {
              id: '2367',
              type: 'taxon',
            },
          },
        ],
      },
    },
  },
  taxa: [
    {
      id: '2367',
      type: 'taxon',
    },
  ],
}

const postSubmitTest = ({ submitResult }) => {
  const { registeredFields } = submitResult
  expect(
    mutations
      .filter(({ ignore }) => !ignore)
      .map(mutation => (mutation.name || '').replace('.hidden', ''))
      .sort()
  ).toMatchObject(
    Object.keys(registeredFields)
      .filter(key => {
        // filter out unused featureObservationTypes, also done in transform output
        if (key.indexOf('featureObservations.') === 0) {
          return key.indexOf('featureObservations.1.') === 0
        }

        return true
      })
      .sort()
  )
}

const scenario = {
  description: 'Register new mammal form with all fields',
  expectedOutput,
  initialState,
  input: {},
  mutations,
  postSubmitTest,
}

export default scenario

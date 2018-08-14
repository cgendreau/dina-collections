/* eslint-disable no-param-reassign */
const getPlaceId = require('./getPlaceId')
const getEstablishmentMeansType = require('./getEstablishmentMeansType')
const getCollectorAgent = require('./getCollectorAgent')

module.exports = function collectingInformation({
  getItemByTypeId,
  migrator,
  src,
  target,
}) {
  // collectorsInformation

  return getCollectorAgent({
    getItemByTypeId,
    migrator,
    src,
  }).then(agent => {
    if (agent) {
      migrator.setValue({
        obj: target,
        path:
          'attributes.individual.collectingInformation.0.collectedByAgent.id',
        value: agent.id,
      })

      if (agent.duplicate) {
        migrator.setValue({
          obj: target,
          path: 'attributes.individual.collectingInformation.0.remarks',
          value: `Duplicated agent with full name: ${agent.collector}`,
        })
      }
    }

    const collectorsText = migrator.getValue({
      obj: src,
      path: 'objects.Comments',
      strip: true,
    })

    migrator.setValue({
      obj: target,
      path: 'attributes.individual.collectingInformation.0.collectorsText',
      value: collectorsText,
    })

    /* event */
    // collectingDate
    const collectingYear = migrator.getValue({
      obj: src,
      path: 'objects.Coll_Year',
      strip: true,
    })
    const collectingMonth = migrator.getValue({
      obj: src,
      path: 'objects.Coll_Month',
      strip: true,
    })
    const collectingDay = migrator.getValue({
      obj: src,
      path: 'objects.Coll_Day',
      strip: true,
    })

    migrator.setValue({
      obj: target,
      path:
        'attributes.individual.collectingInformation.0.event.dateRange.startDate',
      value: {
        day: collectingDay,
        month: collectingMonth,
        year: collectingYear,
      },
    })

    /* event.locationInformation */
    // localityRemarks
    const localityRemarks = migrator.getValue({
      obj: src,
      path: 'objects.FieldNo_related.LocationRemarks',
      strip: true,
    })

    migrator.setValue({
      obj: target,
      path:
        'attributes.individual.collectingInformation.0.event.locationInformation.remarks',
      value: localityRemarks,
    })

    // localityT
    const localityT = migrator.getValue({
      obj: src,
      path: 'objects.StatedLocality',
      strip: true,
    })

    migrator.setValue({
      obj: target,
      path:
        'attributes.individual.collectingInformation.0.event.locationInformation.localityT',
      value: localityT,
    })

    // localityN
    const localityN = migrator.getValue({
      obj: src,
      path: 'objects.FieldNo_related.Locality',
      strip: true,
    })

    migrator.setValue({
      obj: target,
      path:
        'attributes.individual.collectingInformation.0.event.locationInformation.localityN',
      value: localityN,
    })

    /* event.locationInformation.position */
    // latitude
    const latitude = migrator.getValue({
      obj: src,
      path: 'objects.FieldNo_related.Lat_DD',
      strip: true,
    })

    migrator.setValue({
      format: 'string',
      obj: target,
      path:
        'attributes.individual.collectingInformation.0.event.locationInformation.position.latitude',
      value: latitude,
    })

    // latitude
    const longitude = migrator.getValue({
      obj: src,
      path: 'objects.FieldNo_related.Long_DD',
      strip: true,
    })

    migrator.setValue({
      format: 'string',
      obj: target,
      path:
        'attributes.individual.collectingInformation.0.event.locationInformation.position.longitude',
      value: longitude,
    })

    const uncertaintyInMeters = migrator.getValue({
      obj: src,
      path: 'objects.FieldNo_related.Locational_Accuracy',
      strip: true,
    })

    if (uncertaintyInMeters) {
      migrator.setValue({
        format: 'number',
        obj: target,
        path:
          'attributes.individual.collectingInformation.0.event.locationInformation.position.uncertaintyInMeters',
        value: Number(uncertaintyInMeters),
      })
    }

    /* event.locationInformation.verticalPosition */

    const minimumElevationInMeters = migrator.getValue({
      obj: src,
      path: 'objects.FieldNo_related.Min_Elevation',
      strip: true,
    })

    if (minimumElevationInMeters) {
      migrator.setValue({
        format: 'number',
        obj: target,
        path:
          'attributes.individual.collectingInformation.0.event.locationInformation.verticalPosition.minimumElevationInMeters',
        value: Number(uncertaintyInMeters),
      })
    }

    const maximumElevationInMeters = migrator.getValue({
      obj: src,
      path: 'objects.FieldNo_related.Max_Elevation',
      strip: true,
    })

    if (maximumElevationInMeters) {
      migrator.setValue({
        format: 'number',
        obj: target,
        path:
          'attributes.individual.collectingInformation.0.event.locationInformation.verticalPosition.maximumElevationInMeters',
        value: Number(uncertaintyInMeters),
      })
    }

    const expeditionText = migrator.getValue({
      obj: src,
      path: 'objects.Expedition',
      strip: true,
    })

    if (expeditionText) {
      migrator.setValue({
        obj: target,
        path:
          'attributes.individual.collectingInformation.0.event.expeditionText',
        value: expeditionText,
      })
    }

    return getPlaceId({
      getItemByTypeId,
      migrator,
      src,
    }).then(placeId => {
      if (placeId !== undefined) {
        migrator.setValue({
          obj: target,
          path:
            'attributes.individual.collectingInformation.0.event.locationInformation.places.0.id',
          value: placeId,
        })
      }
      return getEstablishmentMeansType({
        getItemByTypeId,
        migrator,
        src,
      }).then(establishmentMeansTypeId => {
        if (establishmentMeansTypeId !== undefined) {
          migrator.setValue({
            obj: target,
            path:
              'attributes.individual.collectingInformation.0.establishmentMeansType.id',
            value: establishmentMeansTypeId,
          })
        }
      })
    })
  })
}

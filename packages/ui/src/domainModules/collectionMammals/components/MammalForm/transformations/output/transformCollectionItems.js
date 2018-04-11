import { DISTINGUISHED_UNIT_TYPE } from 'dataModules/curatedListService/constants'
import {
  PHYSICAL_UNIT,
  STORAGE_LOCATION,
} from 'dataModules/storageService/constants'

export default function transformCollectionItems(collectionItems = []) {
  const preparationTypes = []
  const physicalObjects = []
  const storageLocations = []

  const mappedCollectionItems = collectionItems.map(collectionItem => {
    const { preparationType, physicalObject } = collectionItem
    const { storageLocation } = physicalObject || {}

    const mappedCollectionItem = { ...collectionItem }

    if (preparationType) {
      if (preparationType.id) {
        const mappedPreparationType = {
          id: preparationType.id,
          type: DISTINGUISHED_UNIT_TYPE,
        }
        preparationTypes.push(mappedPreparationType)
        mappedCollectionItem.preparationType = mappedPreparationType
      } else {
        delete mappedCollectionItem.preparationType
      }
    }

    if (physicalObject) {
      let mappedStorageLocation

      if (storageLocation && storageLocation.id) {
        mappedStorageLocation = {
          id: storageLocation.id,
          type: STORAGE_LOCATION,
        }
        storageLocations.push(mappedStorageLocation)
        mappedCollectionItem.physicalObject.storageLocation = mappedStorageLocation
      }

      const mappedPhysicalObject = physicalObject.id
        ? {
            id: physicalObject.id,
            type: PHYSICAL_UNIT,
          }
        : {
            ...physicalObject,
          }

      if (!mappedPhysicalObject.storageLocation) {
        delete mappedPhysicalObject.storageLocation
      }

      physicalObjects.push(mappedPhysicalObject)
      mappedCollectionItem.physicalObject = mappedPhysicalObject
    }

    return mappedCollectionItem
  })

  return {
    collectionItems: mappedCollectionItems,
    physicalObjects,
    preparationTypes,
    storageLocations,
  }
}
const readInitialData = require('../../../../utilities/readInitialData')
const deleteNullProperties = require('common/src/deleteNullProperties')

module.exports = function loadInitialData({ models }) {
  const taxa = readInitialData('taxa')
  const taxonNames = readInitialData('taxonNames')

  const taxaByIdMap = !taxa
    ? {}
    : taxa.reduce((map, taxon) => {
        const { id, parentId, ...rest } = taxon

        const resource = {
          doc: {
            relationships: {
              acceptedTaxonName: { data: null },
              synonyms: { data: [] },
              vernacularNames: { data: [] },
            },
            synonyms: [],
            vernacularNames: [],
            ...deleteNullProperties(rest),
          },
          id,
          versionId: id,
        }

        if (parentId) {
          resource.parentVersionId = parentId
        }

        map[id] = resource // eslint-disable-line no-param-reassign

        return map
      }, {})

  const taxonNameItems = !taxonNames
    ? null
    : taxonNames.map(taxonName => {
        const {
          id,
          acceptedToTaxonId,
          synonymToTaxonId,
          vernacularToTaxonId,
          type: taxonNameType,
          ...rest
        } = taxonName

        const doc = {
          ...rest,
          taxonNameType,
        }

        const resource = {
          doc: deleteNullProperties(doc),
          id,
          versionId: id,
        }

        const relatedTaxonName = {
          id,
          type: 'taxonName',
        }

        if (acceptedToTaxonId) {
          resource.acceptedToTaxonVersionId = acceptedToTaxonId

          taxaByIdMap[
            acceptedToTaxonId
          ].doc.acceptedTaxonName = relatedTaxonName
          taxaByIdMap[
            acceptedToTaxonId
          ].doc.relationships.acceptedTaxonName.data = relatedTaxonName
        }

        if (synonymToTaxonId) {
          resource.synonymToTaxonVersionId = synonymToTaxonId

          taxaByIdMap[synonymToTaxonId].doc.synonyms.push(relatedTaxonName)
          taxaByIdMap[synonymToTaxonId].doc.relationships.synonyms.data.push(
            relatedTaxonName
          )
        }

        if (vernacularToTaxonId) {
          resource.vernacularToTaxonVersionId = vernacularToTaxonId

          taxaByIdMap[vernacularToTaxonId].doc.vernacularNames.push(
            relatedTaxonName
          )
          taxaByIdMap[
            vernacularToTaxonId
          ].doc.relationships.vernacularNames.data.push(relatedTaxonName)
        }

        return resource
      })

  const taxonItems = Object.values(taxaByIdMap).sort((a, b) => {
    return a.id < b.id ? -1 : 1
  })

  const taxonItemsPromise = taxonItems
    ? models.taxon.bulkCreate(taxonItems)
    : Promise.resolve()

  const taxonNameItemsPromise = taxonNameItems
    ? models.taxonName.bulkCreate(taxonNameItems)
    : Promise.resolve()

  return Promise.all([taxonItemsPromise, taxonNameItemsPromise])
}

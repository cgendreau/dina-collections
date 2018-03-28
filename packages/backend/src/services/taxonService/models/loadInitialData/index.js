const readInitialData = require('../../../../utilities/readInitialData')

module.exports = function loadInitialData({ models }) {
  const mammalTaxa = readInitialData('mammalTaxa')

  if (!mammalTaxa) {
    return Promise.resolve()
  }

  const items = mammalTaxa.map(
    ({
      id,
      parentId,
      scientificName,
      vernacularNames: vernacularNamesInput,
      ...rest
    }) => {
      const enVernacularNames = vernacularNamesInput && vernacularNamesInput.en
      const svVernacularNames = vernacularNamesInput && vernacularNamesInput.sv

      let vernacularNames
      if (enVernacularNames || svVernacularNames) {
        vernacularNames = {}
      }

      if (enVernacularNames) {
        vernacularNames.en = [enVernacularNames]
      }

      if (svVernacularNames) {
        vernacularNames.sv = [svVernacularNames]
      }

      const doc = {
        ...rest,
        scientificName,
        vernacularNames,
      }

      return {
        doc,
        id,
        parentVersionId: parentId,
      }
    }
  )
  return models.taxon.bulkCreate(items)
}

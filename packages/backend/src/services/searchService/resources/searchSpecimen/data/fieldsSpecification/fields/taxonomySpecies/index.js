const {
  createKeywordMapping,
} = require('../../../../../../../../lib/data/mappings/factories')

const fieldPath = 'attributes.taxonomySpecies'
const key = 'taxonomySpecies'

const RANK_SPECIES = 'species'

const transformation = ({ migrator, target, locals }) => {
  const { acceptedTaxonNames } = locals
  if (!(acceptedTaxonNames && acceptedTaxonNames.length)) {
    return null
  }

  const taxonName = acceptedTaxonNames.find(({ attributes }) => {
    return attributes.rank === RANK_SPECIES
  })
  if (!taxonName) {
    return null
  }

  migrator.setValue({
    obj: target,
    path: fieldPath,
    value: taxonName.attributes.name,
  })
  return null
}

module.exports = {
  fieldPath,
  key,
  mapping: createKeywordMapping({
    fieldPath,
  }),
  selectable: true,
  sortable: true,
  transformation,
}

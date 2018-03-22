import wrapSelectors from 'utilities/wrapSelectors'

export default function createGlobalSelectors(selectors) {
  return wrapSelectors(selectors)
}

const model = 'specimen'
export default [
  {
    as: 'h1',
    columnProps: { width: 12 },
    componentName: 'TranslatedHeader',
    textKey: 'headers.basicInformation',
  },
  {
    columnProps: { width: 4 },
    componentName: 'Checkbox',
    model,
    name: 'publishRecord',
    textKey: 'public',
  },
  {
    componentName: 'RemarksTogglable',
    emptyStateTextKey: 'remarks.emptyState.specimen',
    model,
    name: 'remarks',
    resultPrefixTextKey: 'remarks.resultPrefix.specimen',
  },
]

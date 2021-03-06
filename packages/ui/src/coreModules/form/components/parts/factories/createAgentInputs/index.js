export default function createAgentInputs(
  {
    baseName,
    buttonTextKey = 'other.addAgent',
    initiallyHidden,
    model,
    module = 'collectionMammals',
  } = {}
) {
  return [
    {
      componentName: 'Input',
      componentProps: {
        columnProps: { width: 9 },
        fluid: true,
        model,
        type: 'text',
      },
      initiallyHidden,
      name: `${baseName}.textV`,
      wrapInField: true,
    },
    {
      componentName: 'TogglableAgentDropdownPickerSearch',
      componentProps: {
        buttonTextKey,
        columnProps: { width: 6 },
        displayEmptyStateLabel: false,
        displayResultLabel: false,
      },
      initiallyHidden,
      module,
      name: `${baseName}`,
      relativeNames: ['textI', 'normalized.id'],
      wrapInField: true,
    },
  ]
}

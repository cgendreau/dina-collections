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
      columnProps: { width: 7 },
      componentName: 'Input',
      fluid: true,
      initiallyHidden,
      model,
      name: `${baseName}.textV`,
      type: 'text',
    },
    {
      buttonTextKey,
      columnProps: { width: 9 },
      componentName: 'AgentDropdownPickerSearchTogglable',
      displayEmptyStateLabel: false,
      displayResultLabel: false,
      initiallyHidden,
      module,
      name: `${baseName}`,
      resultSuffix: '(agent)',
    },
  ]
}

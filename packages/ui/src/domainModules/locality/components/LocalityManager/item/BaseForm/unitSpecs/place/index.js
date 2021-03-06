const parts = [
  {
    componentName: 'Input',
    componentProps: {
      columnProps: { width: 9 },
      fluid: true,
      type: 'text',
    },
    name: 'name',
    wrapInField: true,
  },
  {
    componentName: 'GeographicLevelDropdown',
    componentProps: {
      columnProps: { width: 9 },
    },
    name: 'group',
    wrapInField: true,
  },
  {
    componentName: 'LocalityDropdownSearch',
    componentProps: {
      columnProps: { width: 9 },
    },
    name: 'parent.id',
    wrapInField: true,
  },
]

export default {
  name: 'place',
  parts,
}

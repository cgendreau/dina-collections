export const findNodes = ({ form, id, name, selector }) => {
  if (selector) {
    return selector({ form, id, name })
  }
  if (id) {
    return form.find({ id }).hostNodes()
  }

  return form.find({ name }).hostNodes()
}

export default function applyMutationMountedForm({
  mutation,
  formWrapper: { mountedComponent },
}) {
  const form = mountedComponent.find('form')
  // console.log('form.html()', form.html())

  const { id, interaction = 'setValue', name, selector, value } = mutation
  const nodes = findNodes({ form, id, name, selector })

  if (nodes.length !== 1) {
    throw new Error(`${nodes.length} nodes found for field: ${name}`)
  }

  switch (interaction) {
    case 'setValue': {
      nodes.simulate('change', { target: { value } })
      break
    }
    case 'click': {
      nodes.simulate('click')
      break
    }
    default: {
      throw new Error(`Unknown interaction ${interaction}`)
    }
  }
}

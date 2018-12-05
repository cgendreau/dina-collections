import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import BaseForm from './BaseForm'

export const include = [
  'parent',
  'preparationTypes',
  'resourceActivities',
  'taxa',
]

const propTypes = {
  itemId: PropTypes.string.isRequired,
  nestedItem: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
}

const defaultProps = {
  nestedItem: undefined,
}

export class Edit extends PureComponent {
  render() {
    const { nestedItem, onInteraction, itemId, ...rest } = this.props

    if (!nestedItem) {
      return null
    }

    const { group, name, resourceActivities } = nestedItem

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form="storageLocationEdit"
        formSectionNavigationHeader={name}
        formSectionNavigationSubHeader={capitalizeFirstLetter(group)}
        initialValues={nestedItem}
        onClose={event => {
          event.preventDefault()
          onInteraction('FORM_CANCEL')
        }}
        onInteraction={onInteraction}
        resourceActivities={resourceActivities}
      />
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    include,
    refresh: true,
    relationships: include,
    resolveRelationships: [
      'storageLocation',
      'preparationType',
      'resourceActivity',
      'taxon',
    ],
    resource: 'storageLocation',
  })
)(Edit)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import BaseForm from './BaseForm'

export const include = ['parent', 'resourceActivities']

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

    const { name, group, resourceActivities } = nestedItem

    return (
      <React.Fragment>
        <BaseForm
          {...rest}
          displayBackButton
          displayResetButton
          form="placeEdit"
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
      </React.Fragment>
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    include,
    namespace: 'edit',
    refresh: true,
    relationships: include,
    resolveRelationships: ['place', 'resourceActivity'],
    resource: 'place',
    shouldFetch: true,
  })
)(Edit)

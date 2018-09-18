import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { injectFormPartStatus } from 'coreModules/form/higherOrderComponents'
import * as Parts from '../../Parts'

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  childSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }).isRequired
  ).isRequired,
  formName: PropTypes.string.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  setChildDirty: PropTypes.func.isRequired,
  setChildInvalid: PropTypes.func.isRequired,
}

class Unit extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { showInitiallyHiddenParts: false }

    this.showInitiallyHiddenParts = this.showInitiallyHiddenParts.bind(this)
  }

  showInitiallyHiddenParts() {
    this.setState({ showInitiallyHiddenParts: true })
  }

  render() {
    const {
      changeFieldValue,
      childSpecs,
      formName,
      formValueSelector,
      removeArrayFieldByIndex,
      setChildDirty,
      setChildInvalid,
    } = this.props

    const { showInitiallyHiddenParts } = this.state

    return (
      <Grid.Row className="relaxed">
        {childSpecs.map(
          (
            {
              componentName,
              hideWhenShowingInitiallyHidden,
              initiallyHidden,
              name,
              ...rest
            },
            index
          ) => {
            const Component = Parts[componentName]

            if (!Component) {
              throw new Error(`Missing component for part ${componentName}`)
            }

            if (
              (initiallyHidden && !showInitiallyHiddenParts) ||
              (hideWhenShowingInitiallyHidden && showInitiallyHiddenParts)
            ) {
              return null
            }

            if (name) {
              return (
                <Field
                  autoComplete="off"
                  key={name}
                  module="collectionMammals"
                  {...rest}
                  component={Component}
                  name={name}
                  setChildDirty={setChildDirty}
                  setChildInvalid={setChildInvalid}
                />
              )
            }

            return (
              <Component
                key={`${componentName}-${index}`} // eslint-disable-line react/no-array-index-key
                module="collectionMammals"
                {...rest}
                changeFieldValue={changeFieldValue}
                formName={formName}
                formValueSelector={formValueSelector}
                onClick={this.showInitiallyHiddenParts}
                removeArrayFieldByIndex={removeArrayFieldByIndex}
              />
            )
          }
        )}
      </Grid.Row>
    )
  }
}

Unit.propTypes = propTypes

export default compose(injectFormPartStatus())(Unit)

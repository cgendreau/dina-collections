import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Button, Modal } from 'semantic-ui-react'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { Field, Input } from 'coreModules/form/components'

const mustBe6Or8Digits = value => {
  const regex = /^(\d{6}|\d{8})$/

  if (!value) {
    return {
      errorCode: 'INVALID_CATALOG_NUMBER',
    }
  }
  if (!value.match(regex)) {
    return {
      errorCode: 'INVALID_CATALOG_NUMBER',
    }
  }
  return undefined
}

const ModuleTranslate = createModuleTranslate('collectionMammals')

const propTypes = {
  handleSubmit: PropTypes.func,
  history: PropTypes.object,
  valid: PropTypes.bool,
}
const defaultProps = {
  handleSubmit: undefined,
  history: undefined,
  valid: false,
}

class CatalogNumberModal extends PureComponent {
  constructor() {
    super()

    this.handleGotoModalTwo = this.handleGotoModalTwo.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleBackToModalOne = this.handleBackToModalOne.bind(this)

    this.state = {
      createManually: false,
    }
  }

  handleCancel() {
    this.props.history.go(-1)
  }

  handleBackToModalOne() {
    this.setState({ createManually: false })
  }

  handleGotoModalTwo() {
    this.setState({ createManually: true })
  }

  render() {
    const { handleSubmit, valid } = this.props
    const { createManually } = this.state

    return (
      <React.Fragment>
        <Modal open size="small">
          <Modal.Header>
            <ModuleTranslate textKey="other.createNewSpecimen" />
          </Modal.Header>
          {createManually && (
            <React.Fragment>
              <Modal.Content>
                <Modal.Description>
                  <Field
                    autoComplete="off"
                    className="transparent"
                    component={Input}
                    enableHelpNotifications={false}
                    helpText={
                      <ModuleTranslate textKey="other.sixOrEightDigits" />
                    }
                    label={<ModuleTranslate textKey="other.catalogNumber" />}
                    module="collectionMammals"
                    name="individual.identifiers.0.value"
                    type="text"
                    validate={[mustBe6Or8Digits]}
                  />
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button disabled={!valid} onClick={handleSubmit}>
                  <ModuleTranslate textKey="other.useThisNumber" />
                </Button>
                <Button onClick={this.handleBackToModalOne}>
                  <ModuleTranslate textKey="other.back" />
                </Button>
                <Button basic onClick={this.handleCancel}>
                  <ModuleTranslate textKey="other.cancel" />
                </Button>
              </Modal.Actions>
            </React.Fragment>
          )}

          {!createManually && (
            <React.Fragment>
              <Modal.Content>
                <Modal.Description>
                  <ModuleTranslate textKey="other.automticCatalogNumber" />
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={handleSubmit}>
                  <ModuleTranslate textKey="other.yesCreateNumber" />
                </Button>
                <Button onClick={this.handleGotoModalTwo}>
                  <ModuleTranslate textKey="other.enterManully" />
                </Button>
                <Button basic onClick={this.handleCancel}>
                  <ModuleTranslate textKey="other.cancel" />
                </Button>
              </Modal.Actions>
            </React.Fragment>
          )}
        </Modal>
      </React.Fragment>
    )
  }
}

CatalogNumberModal.propTypes = propTypes
CatalogNumberModal.defaultProps = defaultProps

export default withRouter(CatalogNumberModal)

import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Button, Grid, Message, Popup } from 'semantic-ui-react'

import config from 'config'
import { ConnectedFormSchemaError } from 'coreModules/error/components'
import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'

const log = createLog(
  'modules:collectionMammals:CuratorialAssessmentForm:FormActions'
)
const ModuleTranslate = createModuleTranslate('collectionMammals')

const propTypes = {
  displayBackButton: PropTypes.bool,
  displayRemoveButton: PropTypes.bool,
  displayResetButton: PropTypes.bool,
  error: PropTypes.string,
  form: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  displayBackButton: false,
  displayRemoveButton: false,
  displayResetButton: false,
  error: '',
  onRemove: undefined,
}

export class FormActions extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClosePopup = this.handleClosePopup.bind(this)
    this.handleOpenPopup = this.handleOpenPopup.bind(this)

    this.state = {
      popupOpen: false,
    }
  }

  handleClosePopup() {
    this.setState({ popupOpen: false })
  }

  handleOpenPopup() {
    this.setState({ popupOpen: true })
  }

  render() {
    const skipRemoveConfirmation = config.isTest

    log.render()
    const {
      displayBackButton,
      displayRemoveButton,
      displayResetButton,
      error,
      form,
      invalid,
      onClose: handleClose,
      onRemove: handleRemove,
      pristine,
      reset,
      submitFailed,
      submitSucceeded,
      submitting,
    } = this.props
    return (
      <Grid.Row>
        <Grid.Column mobile={16}>
          <Button disabled={submitting} size="large" type="submit">
            <ModuleTranslate textKey="save" />
          </Button>
          {displayResetButton && (
            <Button
              basic
              disabled={pristine || submitting}
              onClick={reset}
              size="large"
              type="button"
            >
              <ModuleTranslate textKey="reset" />
            </Button>
          )}
          {displayBackButton && (
            <Button basic onClick={handleClose} size="large" type="button">
              <ModuleTranslate textKey="cancel" />
            </Button>
          )}
          {displayRemoveButton &&
            skipRemoveConfirmation &&
            handleRemove && (
              <Button onClick={handleRemove}>
                <ModuleTranslate textKey="remove" />
              </Button>
            )}
          {displayRemoveButton &&
            !skipRemoveConfirmation &&
            handleRemove && (
              <Popup
                hideOnScroll
                on="click"
                onClose={this.handleClosePopup}
                onOpen={this.handleOpenPopup}
                open={this.state.popupOpen}
                trigger={
                  <Button
                    onClick={event => {
                      event.preventDefault()
                    }}
                  >
                    <ModuleTranslate textKey="remove" />
                  </Button>
                }
              >
                <Popup.Header>
                  {'Remove this curatorial assessment?'}
                </Popup.Header>
                <Popup.Content>
                  <Button
                    onClick={event => {
                      event.preventDefault()
                      this.handleClosePopup()
                      handleRemove()
                    }}
                  >
                    <ModuleTranslate textKey="remove" />
                  </Button>
                  <Button
                    basic
                    onClick={event => {
                      event.preventDefault()
                      this.handleClosePopup()
                    }}
                  >
                    <ModuleTranslate textKey="cancel" />
                  </Button>
                </Popup.Content>
              </Popup>
            )}
          <ConnectedFormSchemaError form={form} />
          {invalid &&
            !error &&
            submitFailed && (
              <Message
                error
                header={<ModuleTranslate textKey="formContainsErrors" />}
              />
            )}
          {submitFailed &&
            error && (
              <Message
                content={error}
                error
                header={<ModuleTranslate textKey="submitFailed" />}
              />
            )}
          {submitSucceeded && (
            <Message header={<ModuleTranslate textKey="saved" />} success />
          )}
        </Grid.Column>
      </Grid.Row>
    )
  }
}

FormActions.propTypes = propTypes
FormActions.defaultProps = defaultProps

export default FormActions

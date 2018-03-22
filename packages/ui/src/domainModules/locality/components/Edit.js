// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
// import formValidator from 'common/es5/error/validators/formValidator'
import { ConnectedFormSchemaError } from 'coreModules/error/components'
import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import FieldWrapper from 'coreModules/form/components/FieldWrapper'
import { Input } from 'coreModules/form/components'

const log = createLog('modules:user:EditForm')
const ModuleTranslate = createModuleTranslate('user')

const mapDispatchToProps = {
  // login,
}

const propTypes = {}

const defaultProps = {}

export class Edit extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    console.log('SUBMIT')
  }
  render() {
    log.render()
    const {
      error,
      handleSubmit,
      invalid,
      mode,
      pristine,
      reset,
      submitting,
      submitFailed,
      submitSucceeded,
    } = this.props
    return (
      <Form error={!!error} onSubmit={handleSubmit(this.handleLogin)}>
        <h1>Edit</h1>
        <Segment size="small" stacked>
          <Grid textAlign="left" verticalAlign="top">
            <Grid.Row>
              <Grid.Column mobile={8}>
                <FieldWrapper
                  autoComplete="off"
                  component={Input}
                  label="Name"
                  module="localities"
                  name="name"
                  type="text"
                />
              </Grid.Column>
              <Grid.Column mobile={8}>
                <FieldWrapper
                  autoComplete="off"
                  component={Input}
                  label="Group"
                  module="localities"
                  name="group"
                  type="text"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column mobile={8}>
                <FieldWrapper
                  autoComplete="off"
                  component={Input}
                  label="Parent"
                  module="localities"
                  name="parent"
                  type="text"
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column mobile={8}>
                Elevatim
                <Grid.Row>
                  <Grid.Column mobile={8}>
                    <FieldWrapper
                      autoComplete="off"
                      component={Input}
                      label="Min"
                      module="localities"
                      name="verticalPosition.minimumElevationInMeters"
                      type="text"
                    />
                  </Grid.Column>
                  <Grid.Column mobile={8}>
                    <FieldWrapper
                      autoComplete="off"
                      component={Input}
                      label="Max"
                      module="localities"
                      name="verticalPosition.maximumElevationInMeters"
                      type="text"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column mobile={8}>
                Depth
                <Grid.Row>
                  <Grid.Column mobile={8}>
                    <FieldWrapper
                      autoComplete="off"
                      component={Input}
                      label="Max"
                      module="localities"
                      name="verticalPosition.maximumDepthInMeters"
                      type="text"
                    />
                  </Grid.Column>
                  <Grid.Column mobile={8}>
                    <FieldWrapper
                      autoComplete="off"
                      component={Input}
                      label="Max"
                      module="localities"
                      name="verticalPosition.minimumDepthInMeters"
                      type="text"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column mobile={8}>
                Coordinates
                <Grid.Row>
                  <Grid.Column mobile={6}>
                    <FieldWrapper
                      autoComplete="off"
                      component={Input}
                      label="Latitude"
                      module="localities"
                      name="centralPosition.latitude"
                      type="text"
                    />
                  </Grid.Column>
                  <Grid.Column mobile={6}>
                    <FieldWrapper
                      autoComplete="off"
                      component={Input}
                      label="Longitude"
                      module="localities"
                      name="centralPosition.longitude"
                      type="text"
                    />
                  </Grid.Column>
                  <Grid.Column mobile={4}>
                    <FieldWrapper
                      autoComplete="off"
                      component={Input}
                      label="Uncertainty"
                      module="localities"
                      name="centralPosition.uncertaintyInMeters"
                      type="text"
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <div>
            <Button disabled={submitting} size="large" type="submit">
              <ModuleTranslate textKey="save" />
            </Button>
            <Button
              basic
              disabled={pristine || submitting}
              onClick={reset}
              size="large"
            >
              <ModuleTranslate textKey="cancel" />
            </Button>
            <ConnectedFormSchemaError form={'FORM_NAME'} />
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
          </div>
        </Segment>
      </Form>
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export const EditForm = reduxForm({
  form: 'EditLocalities',
})(Edit)

export default compose(connect(null, mapDispatchToProps))(EditForm)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { Grid, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Field, Input } from 'coreModules/form/components'

const mapStateToProps = (state, { name, formName }) => {
  const selector = formValueSelector(formName)
  const value = selector(state, name)
  return {
    value,
  }
}

const propTypes = {
  enableHelpNotifications: PropTypes.bool,
  module: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  parameterKey: PropTypes.string.isRequired,
  value: PropTypes.string,
}

const defaultProps = {
  enableHelpNotifications: true,
  value: undefined,
}

class Remarks extends Component {
  constructor(props) {
    super(props)

    const { value } = this.props

    this.state = {
      icon: value ? 'commenting outline' : 'comment outline',
      isEdit: false,
      labelText: value || 'Add remarks...',
    }

    this.handleAddOrEditRemark = this.handleAddOrEditRemark.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
  }

  handleAddOrEditRemark(event) {
    event.preventDefault()
    this.setState({
      isEdit: true,
    })
  }

  handleOnBlur(event, value) {
    event.preventDefault()
    this.setState({
      icon: value ? 'commenting outline' : 'comment outline',
      isEdit: false,
      labelText: value || 'Add remarks...',
    })
  }

  render() {
    const { enableHelpNotifications, module, name, parameterKey } = this.props

    const { icon, isEdit, labelText } = this.state

    return (
      <Grid style={{ height: 50, paddingLeft: 11 }}>
        <Grid.Row onClick={isEdit ? undefined : this.handleAddOrEditRemark}>
          <div style={{ paddingTop: 6 }}>
            <Icon name={icon} size="large" />
          </div>
          {isEdit && (
            <Field
              autoComplete="off"
              component={Input}
              enableHelpNotifications={enableHelpNotifications}
              focusOnMount
              module={module}
              name={name}
              onBlur={this.handleOnBlur}
              parameterKey={parameterKey}
              type="text"
            />
          )}
          <div style={{ paddingTop: 8 }}>{!isEdit && labelText}</div>
        </Grid.Row>
      </Grid>
    )
  }
}

Remarks.propTypes = propTypes
Remarks.defaultProps = defaultProps
export default connect(mapStateToProps)(Remarks)

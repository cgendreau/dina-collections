import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  getFormValues,
  isDirty as isDirtySelector,
  isInvalid,
  reset as resetActionCreator,
} from 'redux-form'
import { Button, Grid } from 'semantic-ui-react'
import { CREATE_SUCCESS } from 'coreModules/resourceManager/constants'
import crudActionCreators from 'coreModules/crud/actionCreators'

const mapStateToProps = (state, { resource }) => {
  const formName = `${resource}Edit`
  return {
    formName,
    invalid: isInvalid(formName)(state),
    isDirty: isDirtySelector(formName)(state),
    values: getFormValues(formName)(state),
  }
}

const mapDispatchToProps = {
  reset: resetActionCreator,
}

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  isDirty: PropTypes.bool.isRequired,
  onInteraction: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  values: PropTypes.object,
}
const defaultProps = {
  values: undefined,
}

class BottomBar extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.state = { loading: false }
  }

  handleReset(event) {
    const { formName } = this.props
    event.preventDefault()
    this.props.reset(formName)
  }

  handleSubmit(event) {
    event.preventDefault()
    const { dispatch, resource } = this.props
    this.setState({ loading: true })
    const create =
      crudActionCreators[resource] && crudActionCreators[resource].create

    return dispatch(
      create({
        item: this.props.values,
        nested: true,
      })
    ).then(({ id }) => {
      this.setState({ loading: false })
      this.props.onInteraction(CREATE_SUCCESS, { itemId: id })
    })
  }

  render() {
    const { isDirty, invalid } = this.props

    return (
      <Grid padded>
        <Grid.Column>
          <Button
            disabled={!isDirty || invalid}
            loading={this.state.loading}
            onClick={this.handleSubmit}
            style={{ float: 'left' }}
          >
            Save
          </Button>
          <Button
            basic
            disabled={!isDirty}
            onClick={this.handleReset}
            style={{ float: 'right' }}
          >
            Reset
          </Button>
        </Grid.Column>
      </Grid>
    )
  }
}

BottomBar.propTypes = propTypes
BottomBar.defaultProps = defaultProps

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  connect(null)
)(BottomBar)
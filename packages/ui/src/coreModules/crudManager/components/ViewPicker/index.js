import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from 'coreModules/crudManager/keyObjectModule'

const mapStateToProps = (state, { crudManagerId }) => {
  return {
    viewMode: keyObjectGlobalSelectors.indexGet.viewMode(state, crudManagerId),
  }
}

const mapDispatchToProps = {
  setViewMode: keyObjectActionCreators.indexSet.viewMode,
}

const propTypes = {
  crudManagerId: PropTypes.string.isRequired,
  setViewMode: PropTypes.func.isRequired,
}

const defaultProps = {}

class ViewPicker extends Component {
  render() {
    const { crudManagerId } = this.props
    return (
      <div style={{ marginBottom: 20 }}>
        <Button.Group>
          <Button
            icon
            onClick={() => {
              this.props.setViewMode(crudManagerId, 'single')
            }}
          >
            <Icon name="stop" />
          </Button>
          <Button
            icon
            onClick={() => {
              this.props.setViewMode(crudManagerId, 'split')
            }}
          >
            <Icon name="pause" />
          </Button>
          <Button
            icon
            onClick={() => {
              this.props.setViewMode(crudManagerId, 'modal')
            }}
          >
            <Icon name="eject" />
          </Button>
        </Button.Group>
      </div>
    )
  }
}

ViewPicker.propTypes = propTypes
ViewPicker.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(ViewPicker)

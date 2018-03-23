import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from 'domainModules/locality/keyObjectModule'

const mapStateToProps = state => {
  return {
    listMode: keyObjectGlobalSelectors.listMode(state),
    viewMode: keyObjectGlobalSelectors.viewMode(state),
  }
}

const mapDispatchToProps = {
  setListMode: keyObjectActionCreators.set.listMode,
  setViewMode: keyObjectActionCreators.set.viewMode,
}

const propTypes = {
  listMode: PropTypes.string.isRequired,
  viewMode: PropTypes.string.isRequired,
}

const defaultProps = {}

const viewModes = ['split', 'single', 'modal']
const listModes = ['tree', 'infinity-list', 'list']
const viewDropdownOptions = [
  ...viewModes.map(viewMode => {
    return {
      text: viewMode,
      value: viewMode,
    }
  }),
]

const listDropdownOptions = [
  ...listModes.map(viewMode => {
    return {
      text: viewMode,
      value: viewMode,
    }
  }),
]

class ViewPicker extends Component {
  render() {
    return (
      <div style={{ marginBottom: 20 }}>
        <Button.Group>
          <Button
            onClick={() => {
              this.props.setViewMode('single')
            }}
            icon
          >
            <Icon name="stop" />
          </Button>
          <Button
            onClick={() => {
              this.props.setViewMode('split')
            }}
            icon
          >
            <Icon name="pause" />
          </Button>
          <Button
            onClick={() => {
              this.props.setViewMode('modal')
            }}
            icon
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

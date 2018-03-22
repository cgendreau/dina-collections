import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Dropdown, Form } from 'semantic-ui-react'
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
const listModes = ['tree', 'list']
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
      <div>
        <Form>
          <Form.Group widths="equal">
            <Form.Input>
              <Dropdown
                button
                className="icon"
                floating
                icon="filter"
                labeled
                onChange={(res, data) => {
                  this.props.setViewMode(data.value)
                }}
                options={viewDropdownOptions}
                placeholder="select view mode"
                size="small"
                value={this.props.viewMode}
              />
            </Form.Input>
            <Form.Input>
              <Dropdown
                button
                className="icon"
                floating
                icon="filter"
                labeled
                onChange={(res, data) => {
                  this.props.setListMode(data.value)
                }}
                options={listDropdownOptions}
                placeholder="select view mode"
                size="small"
                value={this.props.listMode}
              />
            </Form.Input>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

ViewPicker.propTypes = propTypes
ViewPicker.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(ViewPicker)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Dropdown, Form } from 'semantic-ui-react'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from 'domainModules/locality/keyObjectModule'

import { InputText } from 'coreModules/form/components'

const mapStateToProps = state => {
  return {
    filterGroup: keyObjectGlobalSelectors['filter.group'](state),
    searchQuery: keyObjectGlobalSelectors['filter.searchQuery'](state),
  }
}

const mapDispatchToProps = {
  setFilterGroup: keyObjectActionCreators.set['filter.group'],
  setSearchQuery: keyObjectActionCreators.set['filter.searchQuery'],
}

const propTypes = {
  filterGroup: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setFilterGroup: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
}

const defaultProps = {}

const groups = ['continent', 'country', 'district', 'province']

const dropdownOptions = [
  {
    text: 'all',
    value: '',
  },
  ...groups.map(group => {
    return {
      text: group,
      value: group,
    }
  }),
]

class LocalityListFilter extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Group widths="equal">
            <Form.Input>
              <InputText
                icon="search"
                input={{
                  onChange: event => {
                    this.props.setSearchQuery(event.target.value)
                  },
                  value: this.props.searchQuery,
                }}
                placeholder="search"
                size="small"
              />
            </Form.Input>
            <Form.Input>
              <Dropdown
                icon="filter"
                floating
                labeled
                button
                className="icon"
                size="small"
                placeholder="select group"
                options={dropdownOptions}
                value={this.props.filterGroup}
                onChange={(res, data) => {
                  console.log('data', data.value)
                  this.props.setFilterGroup(data.value)
                }}
              />
            </Form.Input>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

LocalityListFilter.propTypes = propTypes
LocalityListFilter.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  LocalityListFilter
)

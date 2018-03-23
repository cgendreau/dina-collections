import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Dropdown, Grid, Form, Icon } from 'semantic-ui-react'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from 'domainModules/locality/keyObjectModule'

import { InputText } from 'coreModules/form/components'

const mapStateToProps = state => {
  return {
    filterGroup: keyObjectGlobalSelectors.get['filter.group'](state),
    searchQuery: keyObjectGlobalSelectors.get['filter.searchQuery'](state),
  }
}

const mapDispatchToProps = {
  setFilterGroup: keyObjectActionCreators.set['filter.group'],
  setListMode: keyObjectActionCreators.set.listMode,
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
      <Form style={{ marginBottom: 10 }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
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
                fluid
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Dropdown
                icon="filter"
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
                style={{ minWidth: 140 }}
              />
            </Grid.Column>
            <Grid.Column width={4} floated="right" textAlign="right">
              <Button.Group floated="right">
                <Button
                  onClick={() => {
                    this.props.setListMode('list')
                  }}
                  icon
                >
                  <Icon name="numbered list" />
                </Button>
                <Button
                  onClick={() => {
                    this.props.setListMode('infinity-list')
                  }}
                  icon
                >
                  <Icon name="list ul" />
                </Button>
                <Button
                  onClick={() => {
                    this.props.setListMode('tree')
                  }}
                  icon
                >
                  <Icon name="tree" />
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    )
  }
}

LocalityListFilter.propTypes = propTypes
LocalityListFilter.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  LocalityListFilter
)

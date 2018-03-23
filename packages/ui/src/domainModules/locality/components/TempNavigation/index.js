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
    filterGroup: keyObjectGlobalSelectors['filter.group'](state),
    searchQuery: keyObjectGlobalSelectors['filter.searchQuery'](state),
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

class TmpNavigation extends Component {
  render() {
    return (
      <Form style={{ marginBottom: 10 }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4} floated="left" textAlign="left">
              <Button.Group floated="left">
                <Button
                  onClick={() => {
                    this.props.pickPrev()
                  }}
                  icon
                >
                  <Icon name="arrow left" />
                </Button>
                <Button
                  onClick={() => {
                    this.props.pickNext()
                  }}
                  icon
                >
                  <Icon name="arrow right" />
                </Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={4} floated="right" textAlign="right">
              <Button.Group floated="right">
                <Button
                  onClick={() => {
                    this.props.onBack()
                  }}
                  icon
                >
                  <Icon name="close" />
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    )
  }
}

TmpNavigation.propTypes = propTypes
TmpNavigation.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  TmpNavigation
)

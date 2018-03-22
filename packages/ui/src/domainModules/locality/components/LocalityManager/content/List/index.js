import React, { Component } from 'react'
import { Button, Grid, Segment } from 'semantic-ui-react'
import createLog from 'utilities/log'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { globalSelectors as keyObjectGlobalSelectors } from 'domainModules/locality/keyObjectModule'
import LocalityList from '../../../LocalityList'
import LocalityTree from '../../../LocalityTree'
import LocalityFilter from '../../../LocalityFilter'

const log = createLog('modules:user:ListForm')

const mapStateToProps = state => {
  return {
    listMode: keyObjectGlobalSelectors.listMode(state),
  }
}

export class List extends Component {
  render() {
    log.render()
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <LocalityFilter />
        </Grid.Column>
        <Grid.Column width={16}>
          <Segment size="tiny" stacked>
            {this.props.listMode === 'list' && (
              <LocalityList onItemClick={this.props.onItemClick} />
            )}
            {this.props.listMode === 'tree' && (
              <LocalityTree onItemClick={this.props.onItemClick} />
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column width={16}>
          <Link to="/app/localities/create">
            <Button>Create</Button>
          </Link>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default connect(mapStateToProps)(List)

import React, { Component } from 'react'
import { Button, Grid, Segment } from 'semantic-ui-react'
import createLog from 'utilities/log'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { globalSelectors as keyObjectGlobalSelectors } from 'domainModules/locality/keyObjectModule'
import LocalityInfinityList from '../../../LocalityInfinityList'
import LocalityList from '../../../LocalityList'
import LocalityTree from '../../../LocalityTree'

const log = createLog('modules:user:ListForm')

const mapStateToProps = state => {
  return {
    listMode: keyObjectGlobalSelectors.get.listMode(state),
  }
}

export class List extends Component {
  render() {
    log.render()
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment size="tiny" stacked>
            {this.props.listMode === 'infinity-list' && (
              <LocalityInfinityList
                onItemInteraction={this.props.onItemInteraction}
              />
            )}

            {this.props.listMode === 'list' && (
              <LocalityList
                activeLocalityId={this.props.activeLocalityId}
                onItemInteraction={this.props.onItemInteraction}
              />
            )}

            {this.props.listMode === 'tree' && (
              <LocalityTree
                activeLocalityId={this.props.activeLocalityId}
                onItemInteraction={this.props.onItemInteraction}
              />
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column style={{ marginTop: 10 }} width={16}>
          <Link to="/app/localities/create">
            <Button>Create</Button>
          </Link>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default connect(mapStateToProps)(List)

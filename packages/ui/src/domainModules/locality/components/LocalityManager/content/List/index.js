import React, { Component } from 'react'
import { Button, Grid, Segment } from 'semantic-ui-react'
import createLog from 'utilities/log'
import { Link } from 'react-router-dom'
import LocalityList from '../../../LocalityList'
import LocalityFilter from '../../../LocalityFilter'

const log = createLog('modules:user:ListForm')

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
            <LocalityList onItemClick={this.props.onItemClick} />
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

export default List

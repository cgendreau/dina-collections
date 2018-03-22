import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import createLog from 'utilities/log'

const log = createLog('modules:user:Split')

export class Split extends Component {
  render() {
    const { leftContent, rightContent } = this.props
    log.render()
    return (
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={8}>{leftContent}</Grid.Column>
            <Grid.Column width={8}>{rightContent}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default Split

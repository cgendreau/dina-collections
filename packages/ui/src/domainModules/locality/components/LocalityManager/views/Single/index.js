import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import createLog from 'utilities/log'

const log = createLog('modules:user:Split')

export class Single extends Component {
  render() {
    const { component } = this.props
    log.render()
    return <Container>{component}</Container>
  }
}

export default Single

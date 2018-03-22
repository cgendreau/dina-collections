import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import createLog from 'utilities/log'

const log = createLog('modules:user:Inspect')

export class Inspect extends Component {
  render() {
    log.render()
    return (
      <Segment size="tiny" stacked>
        <h1>Inspect</h1>
        <p>Detailed description incl parent and children</p>
      </Segment>
    )
  }
}

export default Inspect

import React, { Component } from 'react'
import { Container, Modal } from 'semantic-ui-react'
import createLog from 'utilities/log'

const log = createLog('modules:user:Split')

export class ModalView extends Component {
  render() {
    const { backgroundContent, modalComponent } = this.props
    log.render()
    return (
      <React.Fragment>
        <Container>{backgroundContent}</Container>
        <Modal open={!!modalComponent} onClose={this.props.onBack}>
          <Modal.Content>{modalComponent}</Modal.Content>
        </Modal>
      </React.Fragment>
    )
  }
}

export default ModalView

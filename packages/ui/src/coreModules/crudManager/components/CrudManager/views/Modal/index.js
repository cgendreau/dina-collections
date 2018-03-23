import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Modal } from 'semantic-ui-react'

const propTypes = {
  backgroundComponent: PropTypes.node.isRequired,
  modalComponent: PropTypes.node,
  onItemInteraction: PropTypes.func.isRequired,
}

const defaultProps = {
  modalComponent: undefined,
}

export class ModalView extends Component {
  constructor(props) {
    super(props)
    this.handleOnClose = this.handleOnClose.bind(this)
  }

  handleOnClose() {
    this.props.onItemInteraction('close')
  }
  render() {
    const { backgroundComponent, modalComponent } = this.props
    return (
      <React.Fragment>
        <Container>{backgroundComponent}</Container>
        <Modal onClose={this.handleOnClose} open={!!modalComponent}>
          <Modal.Content>{modalComponent}</Modal.Content>
        </Modal>
      </React.Fragment>
    )
  }
}

ModalView.propTypes = propTypes
ModalView.defaultProps = defaultProps
export default ModalView

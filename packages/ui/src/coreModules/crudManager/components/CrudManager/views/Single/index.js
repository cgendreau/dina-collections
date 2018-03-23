import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'

const propTypes = {
  component: PropTypes.node.isRequired,
}

const defaultProps = {
  modalComponent: undefined,
}

export class Single extends Component {
  render() {
    const { component } = this.props
    return <Container>{component}</Container>
  }
}

Single.propTypes = propTypes
Single.defaultProps = defaultProps

export default Single

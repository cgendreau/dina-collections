import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const propTypes = {
  leftComponent: PropTypes.node.isRequired,
  rightComponent: PropTypes.node,
}

const defaultProps = {
  rightComponent: undefined,
}

export class Split extends Component {
  render() {
    const { leftComponent, rightComponent } = this.props
    return (
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={8}>{leftComponent}</Grid.Column>
          <Grid.Column width={8}>{rightComponent}</Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

Split.propTypes = propTypes
Split.defaultProps = defaultProps

export default Split

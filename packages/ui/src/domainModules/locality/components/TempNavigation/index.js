import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Form, Segment } from 'semantic-ui-react'

const propTypes = {
  onItemInteraction: PropTypes.func.isRequired,
  showClose: PropTypes.bool.isRequired,
  showPickNext: PropTypes.bool.isRequired,
  showPickPrev: PropTypes.bool.isRequired,
}

const defaultProps = {
  showClose: true,
  showPickNext: true,
  showPickPrev: true,
}

class TmpNavigation extends Component {
  render() {
    return (
      <Segment style={{ background: '#1d78b2' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <h1 style={{ color: 'white' }}>Argmentina</h1>
            </Grid.Column>
            <Grid.Column floated="right" textAlign="right" width={4}>
              <Button.Group>
                {this.props.showPickPrev && (
                  <Button
                    icon="left chevron"
                    onClick={() => {
                      this.props.onItemInteraction('pickPrev')
                    }}
                  />
                )}
                {this.props.showClose && (
                  <Button
                    icon="close"
                    onClick={() => {
                      this.props.onItemInteraction('close')
                    }}
                  />
                )}

                {this.props.showPickNext && (
                  <Button
                    icon="right chevron"
                    onClick={() => {
                      this.props.onItemInteraction('pickNext')
                    }}
                  />
                )}
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

TmpNavigation.propTypes = propTypes
TmpNavigation.defaultProps = defaultProps

export default TmpNavigation

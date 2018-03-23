import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Form } from 'semantic-ui-react'

const propTypes = {
  onItemInteraction: PropTypes.func.isRequired,
  showClose: PropTypes.bool.isRequired,
  showPickNext: PropTypes.bool.isRequired,
  showPickPrev: PropTypes.bool.isRequired,
}

const defaultProps = {
  showClose: true,
  showPickNext: false,
  showPickPrev: false,
}

class TmpNavigation extends Component {
  render() {
    return (
      <Form style={{ marginBottom: 10 }}>
        <Grid>
          <Grid.Row>
            <Grid.Column floated="left" textAlign="left" width={4}>
              <Button.Group>
                {this.props.showPickPrev && (
                  <Button
                    content="Previous"
                    icon="left chevron"
                    labelPosition="left"
                    onClick={() => {
                      this.props.onItemInteraction('pickPrev')
                    }}
                  />
                )}
                {this.props.showClose && (
                  <Button
                    content="Close"
                    icon="close"
                    onClick={() => {
                      this.props.onItemInteraction('close')
                    }}
                  />
                )}

                {this.props.showPickNext && (
                  <Button
                    content="Next"
                    icon="right chevron"
                    labelPosition="right"
                    onClick={() => {
                      this.props.onItemInteraction('pickNext')
                    }}
                  />
                )}
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    )
  }
}

TmpNavigation.propTypes = propTypes
TmpNavigation.defaultProps = defaultProps

export default TmpNavigation

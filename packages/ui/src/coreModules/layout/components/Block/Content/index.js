import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment } from 'semantic-ui-react'

const propTypes = {
  children: PropTypes.node.isRequired,
  preContent: PropTypes.node,
}

const defaultProps = {
  preContent: null,
}

const Content = ({ children, preContent }) => {
  return (
    <Grid.Row>
      {preContent && <Grid.Column width={16}>{preContent}</Grid.Column>}
      <Grid.Column width={16}>
        <Segment>{children}</Segment>
      </Grid.Column>
    </Grid.Row>
  )
}

Content.propTypes = propTypes
Content.defaultProps = defaultProps

export default Content

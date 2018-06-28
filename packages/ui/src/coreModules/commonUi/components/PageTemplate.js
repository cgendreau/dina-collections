import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'

const propTypes = {
  children: PropTypes.node,
  container: PropTypes.bool,
}
const defaultProps = {
  children: null,
  container: true,
}

  if (container) {
    return (
      <Container
        style={{
          paddingBottom: 30,
        }}
      >
        {children}
      </Container>
    )
  }
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      {children}
    </div>
  )
}

PageTemplate.propTypes = propTypes
PageTemplate.defaultProps = defaultProps

export default PageTemplate

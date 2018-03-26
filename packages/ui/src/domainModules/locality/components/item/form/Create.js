import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createCuratedLocality as createCuratedLocalityAc } from 'domainModules/localityService/actionCreators'
import BaseForm from './Base'

const mapDispatchToProps = {
  createCuratedLocality: createCuratedLocalityAc,
}

const propTypes = {
  createCuratedLocality: PropTypes.func.isRequired,
  itemBlockType: PropTypes.string.isRequired,
  layoutMode: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
}

export class Create extends Component {
  render() {
    const { onInteraction, ...rest } = this.props
    return (
      <BaseForm
        displayBackButton
        displayResetButton
        onBack={event => {
          event.preventDefault()
          onInteraction('navigate', {
            target: 'collection',
          })
        }}
        onSubmit={data => {
          this.props
            .createCuratedLocality({
              curatedLocality: data,
            })
            .then(event => {
              event.preventDefault()
              onInteraction('create-submit-success')
            })
        }}
        {...rest}
      />
    )
  }
}

Create.propTypes = propTypes

export default compose(connect(null, mapDispatchToProps))(Create)

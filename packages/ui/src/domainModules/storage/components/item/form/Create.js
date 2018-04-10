import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStorageLocation as createStorageLocationAc } from 'dataModules/storageService/actionCreators'
import { ensureAllStorageLocationsFetched } from 'dataModules/storageService/higherOrderComponents'
import {
  FORM_CANCEL,
  FORM_CREATE_SUCCESS,
} from 'coreModules/crudBlocks/constants'

import BaseForm from './Base'

const mapDispatchToProps = {
  createStorageLocation: createStorageLocationAc,
}

const propTypes = {
  allStorageLocationsFetched: PropTypes.bool,
  createStorageLocation: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
}
const defaultProps = {
  allStorageLocationsFetched: undefined,
}

export class Create extends PureComponent {
  render() {
    const { allStorageLocationsFetched, onInteraction, ...rest } = this.props

    if (!allStorageLocationsFetched) {
      return null
    }

    return (
      <BaseForm
        displayBackButton
        displayResetButton
        onClose={event => {
          event.preventDefault()
          onInteraction(FORM_CANCEL)
        }}
        onSubmit={data => {
          this.props
            .createStorageLocation({
              storageLocation: data,
            })
            .then(result => {
              onInteraction(FORM_CREATE_SUCCESS, {
                itemId: result.id,
              })
            })
        }}
        {...rest}
      />
    )
  }
}

Create.propTypes = propTypes
Create.defaultProps = defaultProps

export default compose(
  ensureAllStorageLocationsFetched(),
  connect(null, mapDispatchToProps)
)(Create)

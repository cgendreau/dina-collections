import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { updateTaxonName as updateTaxonNameAc } from 'dataModules/taxonService/actionCreators'
import {
  createGetTaxonNameById,
  ensureAllTaxonNamesFetched,
} from 'dataModules/taxonService/higherOrderComponents'
import {
  FORM_CANCEL,
  FORM_EDIT_SUCCESS,
} from 'coreModules/crudBlocks/constants'
import BaseForm from './Base'

const mapDispatchToProps = {
  updateTaxonName: updateTaxonNameAc,
}

const propTypes = {
  allTaxonNamesFetched: PropTypes.bool,
  itemId: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  taxonName: PropTypes.object,
  updateTaxonName: PropTypes.func.isRequired,
}

const defaultProps = {
  allTaxonNamesFetched: undefined,
  taxonName: undefined,
}

export class Edit extends PureComponent {
  render() {
    const {
      allTaxonNamesFetched,
      taxonName,
      onInteraction,
      itemId,
    } = this.props

    const initialValues = taxonName && {
      name: taxonName.name,
      rank: taxonName.rank,
      rubinNumber: taxonName.rubinNumber,
    }

    if (!initialValues || !allTaxonNamesFetched) {
      return null
    }

    return (
      <BaseForm
        displayBackButton
        displayResetButton
        initialValues={initialValues}
        onClose={event => {
          event.preventDefault()
          onInteraction(FORM_CANCEL)
        }}
        onInteraction={onInteraction}
        onSubmit={data => {
          this.props
            .updateTaxonName({
              taxonName: {
                id: itemId,
                ...data,
              },
            })
            .then(result => {
              onInteraction(FORM_EDIT_SUCCESS, {
                itemId: result.id,
              })
            })
        }}
      />
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(
  ensureAllTaxonNamesFetched(),
  createGetTaxonNameById(),
  connect(null, mapDispatchToProps)
)(Edit)
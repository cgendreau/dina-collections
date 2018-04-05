import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import userSelectors from 'coreModules/user/globalSelectors'
import BaseForm from './Base'

const mapStateToProps = state => {
  return {
    userName: userSelectors.getUserName(state),
  }
}

const propTypes = {
  agent: PropTypes.string,
  changeFieldValue: PropTypes.func.isRequired,
  condition: PropTypes.string,
  conditionRemarks: PropTypes.string,
  date: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  inventoryStatusRemarks: PropTypes.string,
  isInStorage: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  userName: PropTypes.string,
}
const defaultProps = {
  agent: undefined,
  condition: undefined,
  conditionRemarks: undefined,
  date: undefined,
  inventoryStatusRemarks: undefined,
  isInStorage: undefined,
  userName: undefined,
}

export class EditCuratorialAssessment extends PureComponent {
  render() {
    const {
      agent,
      changeFieldValue,
      condition,
      conditionRemarks,
      date,
      fieldName,
      inventoryStatusRemarks,
      isInStorage,
      onClose: handleClose,
      removeArrayFieldByIndex,
      ...rest
    } = this.props

    return (
      <BaseForm
        displayBackButton
        displayRemoveButton
        displayResetButton
        initialValues={{
          agent,
          condition,
          conditionRemarks,
          date,
          inventoryStatusRemarks,
          isInStorage,
        }}
        onClose={event => {
          event.preventDefault()
          handleClose()
        }}
        onRemove={() => {
          const segments = fieldName.split('.')
          const index = segments[segments.length - 1]
          const arrayPath = segments.slice(0, -1).join('.')
          removeArrayFieldByIndex(arrayPath, index)
          handleClose()
        }}
        onSubmit={data => {
          changeFieldValue(fieldName, data)
          handleClose()
        }}
        {...rest}
      />
    )
  }
}

EditCuratorialAssessment.propTypes = propTypes
EditCuratorialAssessment.defaultProps = defaultProps

export default connect(mapStateToProps)(EditCuratorialAssessment)
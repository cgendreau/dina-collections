import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'semantic-ui-react'
import objectPath from 'object-path'

import { createPickerWrapper } from 'coreModules/resourceManager/higherOrderComponents'
import AgentDropdownSearch from '../AgentDropdownSearch'
import AgentManager from '../AgentManager/Local'

const propTypes = {
  fieldSearchQuery: PropTypes.string,
  fieldValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.shape({
      normalized: PropTypes.shape({
        id: PropTypes.string,
      }),
      textI: PropTypes.string,
      textV: PropTypes.string,
    }),
  ]),
  onClose: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
  onPickerButtonClick: PropTypes.func.isRequired,
  pathToIdInValue: PropTypes.string.isRequired,
  pathToTextInValue: PropTypes.string.isRequired,
  pickerActive: PropTypes.bool.isRequired,
  reportPickerActive: PropTypes.func,
}

const defaultProps = {
  fieldSearchQuery: undefined,
  fieldValue: undefined,
  reportPickerActive: undefined,
}

export class AgentDropdownPickerSearch extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.reportPickerActive) {
      if (prevProps.pickerActive !== this.props.pickerActive) {
        this.props.reportPickerActive(this.props.pickerActive)
      }
    }
  }

  render() {
    const {
      fieldSearchQuery,
      fieldValue,
      onClose,
      onInteraction,
      onPickerButtonClick,
      pathToIdInValue,
      pathToTextInValue,
      pickerActive,
      ...rest
    } = this.props

    if (pickerActive) {
      const initialFilterValues = fieldSearchQuery
        ? {
            fullName:
              fieldSearchQuery || objectPath.get(fieldValue, pathToTextInValue),
          }
        : undefined

      return (
        <Modal onClose={onClose} open size="fullscreen">
          <Modal.Content>
            <AgentManager
              initialFilterValues={initialFilterValues}
              initialItemId={objectPath.get(fieldValue, pathToIdInValue)}
              isPicker
              onInteraction={onInteraction}
              pickerTitle="Pick Agent"
              treeEnabled={false}
            />
          </Modal.Content>
        </Modal>
      )
    }

    const picker = <Button onClick={onPickerButtonClick}>Picker</Button>

    return (
      <AgentDropdownSearch
        {...rest}
        pathToIdInValue={pathToIdInValue}
        pathToTextInValue={pathToTextInValue}
        rightButton={picker}
      />
    )
  }
}

AgentDropdownPickerSearch.propTypes = propTypes
AgentDropdownPickerSearch.defaultProps = defaultProps

export default createPickerWrapper({
  pathToIdInValue: 'normalized.id',
  pathToTextInValue: 'textI',
  requireEitherIdOrValue: true,
})(AgentDropdownPickerSearch)

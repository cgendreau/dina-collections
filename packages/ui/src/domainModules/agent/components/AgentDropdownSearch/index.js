import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import createDeleteProperties from 'common/es5/createDeleteProperties'
import { DropdownSearch } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

import { ALL, PERSON, ORGANIZATION, OTHER, UNKNOWN } from '../../constants'

const deleteUndefinedProperties = createDeleteProperties(undefined)

const includeFields = ['id', 'attributes.fullName', 'attributes.agentType']

const propTypes = {
  group: PropTypes.oneOf([ALL, PERSON, ORGANIZATION, OTHER, UNKNOWN]),
}

const defaultProps = {
  group: ALL,
}

const extractText = item => {
  return item && item.attributes && item.attributes.fullName
}

const mapItemToOption = (item, value) => {
  return {
    key: item.id,
    text: extractText(item),
    value: deleteUndefinedProperties({
      ...value,
      normalized: { id: item.id },
    }),
  }
}

class AgentDropdownSearch extends Component {
  render() {
    const { group, ...rest } = this.props

    let baseFilter
    switch (group) {
      case ALL: {
        break
      }
      case PERSON: {
        baseFilter = {
          filterFunctionName: 'matchAgentType',
          value: PERSON,
        }
        break
      }
      case ORGANIZATION: {
        baseFilter = {
          filterFunctionName: 'matchAgentType',
          value: ORGANIZATION,
        }
        break
      }
      case OTHER: {
        baseFilter = {
          filterFunctionName: 'matchAgentType',
          value: OTHER,
        }
        break
      }
      case UNKNOWN: {
        baseFilter = {
          filterFunctionName: 'matchAgentType',
          value: UNKNOWN,
        }
        break
      }
      default: {
        throw new Error(`Unknown group: ${group}`)
      }
    }

    return (
      <DropdownSearch
        pathToIdInValue="normalized.id"
        pathToTextInValue="textI"
        {...rest}
        baseFilter={baseFilter}
        extractText={extractText}
        filterFunctionName="fullNameSearch"
        includeFields={includeFields}
        mapItemToOption={mapItemToOption}
        resource="normalizedAgent"
        searchWithQuery
        type="dropdown-search-id-text"
      />
    )
  }
}

AgentDropdownSearch.propTypes = propTypes
AgentDropdownSearch.defaultProps = defaultProps

export default compose(withI18n({ module: 'form' }))(AgentDropdownSearch)

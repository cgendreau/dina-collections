import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import config from 'config'
import { DropdownSearch } from 'coreModules/form/components'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import { ALL, PERSON, ORGANIZATION } from '../../constants'
import { actionCreators, globalSelectors } from '../../keyObjectModule'
import agentSelectors from '../../globalSelectors'

const propTypes = {
  allItemsFetched: PropTypes.bool.isRequired,
  group: PropTypes.oneOf([ALL, PERSON, ORGANIZATION]).isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  updateSearchQuery:
    actionCreators.set['agentDropdown.:identifier.searchQuery'],
}

class AgentDropdownSearch extends Component {
  render() {
    const { allItemsFetched, group, updateSearchQuery, ...rest } = this.props

    if (!allItemsFetched && !config.isTest) {
      return null
    }

    let getDropdownOptions
    switch (group) {
      case ALL: {
        getDropdownOptions = agentSelectors.getDropdownAllOptions
        break
      }
      case PERSON: {
        getDropdownOptions = agentSelectors.getDropdownPersonOptions
        break
      }
      case ORGANIZATION: {
        getDropdownOptions = agentSelectors.getDropdownOrganisationOptions
        break
      }
      default: {
        throw new Error(`Unknown group: ${group}`)
      }
    }

    return (
      <DropdownSearch
        {...rest}
        getOptions={getDropdownOptions}
        getSearchQuery={state => {
          return globalSelectors.get['agentDropdown.:identifier.searchQuery'](
            state,
            { identifier: group }
          )
        }}
        getSelectedOption={agentSelectors.getAgentOption}
        onSearchChange={({ searchQuery }) => {
          updateSearchQuery(searchQuery, { identifier: group })
        }}
        type="dropdown-search-connect"
      />
    )
  }
}

AgentDropdownSearch.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({
    resource: 'agent',
  }),
  connect(null, mapDispatchToProps)
)(AgentDropdownSearch)
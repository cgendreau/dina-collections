import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Search } from 'coreModules/form/components'
import { ALL, GROUP_1, GROUP_2, GROUP_3, GROUP_4 } from '../../constants'
import globalSelectors from '../../globalSelectors'
import {
  actionCreators,
  globalSelectors as keyObjectSelectors,
} from '../../keyObjectModule'

const mapDispatchToProps = {
  updateStorageSearchQuery: actionCreators.set['search.searchQuery'],
}

const propTypes = {
  updateStorageSearchQuery: PropTypes.func.isRequired,
}

class StorageLocationSearch extends Component {
  render() {
    const { group, updateStorageSearchQuery, ...rest } = this.props

    let getDropdownOptions
    switch (group) {
      case ALL: {
        getDropdownOptions = globalSelectors.getDropdownAllOptions
        break
      }
      case GROUP_1: {
        getDropdownOptions = globalSelectors.getDropdownGroup1Options
        break
      }
      case GROUP_2: {
        getDropdownOptions = globalSelectors.getDropdownGroup2Options
        break
      }
      case GROUP_3: {
        getDropdownOptions = globalSelectors.getDropdownGroup3Options
        break
      }
      case GROUP_4: {
        getDropdownOptions = globalSelectors.getDropdownGroup4Options
        break
      }
      default: {
        throw new Error(`Unknown group: ${group}`)
      }
    }

    return (
      <Search
        getOptions={getDropdownOptions}
        getSearchLoading={keyObjectSelectors.get['search.loading']}
        getSearchQuery={keyObjectSelectors.get['search.searchQuery']}
        getSelectedOption={globalSelectors.getStorageLocationOption}
        onSearchChange={({ searchQuery }) =>
          updateStorageSearchQuery(searchQuery)
        }
        {...rest}
        type="search-connect"
      />
    )
  }
}

StorageLocationSearch.propTypes = propTypes

export default connect(undefined, mapDispatchToProps)(StorageLocationSearch)

import React, { Component } from 'react'

import { CrudBlocksWrapper } from 'coreModules/crudBlocks/components'

import CreateForm from '../item/form/Create'
import EditForm from '../item/form/Edit'
import InspectView from '../item/Inspect'
import StorageLocationsList from '../collection/StorageLocationsList'
import StorageLocationsTree from '../collection/StorageLocationsTree'
import globalSelectors from '../../globalSelectors'
import { ALL, GROUP_2, GROUP_3, GROUP_4 } from '../../constants'

const groups = [GROUP_2, GROUP_3, GROUP_4]

const DROPDOWN_FILTER_OPTIONS = [
  {
    key: ALL,
    text: ALL,
    value: '',
  },
  ...groups.map(group => {
    return {
      key: group,
      text: group,
      value: group,
    }
  }),
]

const propTypes = {}

class StorageManager extends Component {
  static renderCreateBlockChild(props) {
    return <CreateForm {...props} />
  }

  static renderEditBlockChild(props) {
    return <EditForm {...props} />
  }

  static renderInspectBlockChild(props) {
    return <InspectView {...props} />
  }

  static renderList(props) {
    return <StorageLocationsList {...props} />
  }

  static renderTree(props) {
    return <StorageLocationsTree {...props} />
  }

  render() {
    return (
      <CrudBlocksWrapper
        dropdownFilterOptions={DROPDOWN_FILTER_OPTIONS}
        getAncestorsByParentId={globalSelectors.getStorageLocationAncestorsById}
        itemIdParamName="storageLocationId"
        name="storage"
        renderCreateBlockChild={StorageManager.renderCreateBlockChild}
        renderEditBlockChild={StorageManager.renderEditBlockChild}
        renderInspectBlockChild={StorageManager.renderInspectBlockChild}
        renderList={StorageManager.renderList}
        renderTree={StorageManager.renderTree}
        urlBasePath="/app/storageLocations"
      />
    )
  }
}

StorageManager.propTypes = propTypes

export default StorageManager

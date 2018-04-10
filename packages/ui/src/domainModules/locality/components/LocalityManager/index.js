import React, { Component } from 'react'

import CrudBlocksWrapper from 'domainModules/locality/components/genericCrudManager/CrudBlocksWrapper'

import CreateForm from '../item/form/Create'
import EditForm from '../item/form/Edit'
import InspectView from '../item/Inspect'
import LocalityList from '../collection/LocalityList'
import LocalityTree from '../collection/LocalityTree'

import { ALL, CONTINENT, COUNTRY, DISTRICT, PROVINCE } from '../../constants'

const groups = [CONTINENT, COUNTRY, DISTRICT, PROVINCE]

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

class LocalityManager extends Component {
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
    return <LocalityList {...props} />
  }

  static renderTree(props) {
    return <LocalityTree {...props} />
  }

  render() {
    return (
      <CrudBlocksWrapper
        customHandleInteraction={(type, data) => {
          console.log('customHandleInteraction', type, data)
        }}
        dropdownFilterOptions={DROPDOWN_FILTER_OPTIONS}
        itemIdParamName="localityId"
        name="locality"
        renderCreateBlockChild={LocalityManager.renderCreateBlockChild}
        renderEditBlockChild={LocalityManager.renderEditBlockChild}
        renderInspectBlockChild={LocalityManager.renderInspectBlockChild}
        renderList={LocalityManager.renderList}
        renderTree={LocalityManager.renderTree}
        urlBasePath="/app/localities"
      />
    )
  }
}

LocalityManager.propTypes = propTypes

export default LocalityManager

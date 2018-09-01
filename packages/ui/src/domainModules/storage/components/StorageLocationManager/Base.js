import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResourceManager } from 'coreModules/resourceManager/components'

import CreateForm from './item/CreateForm'
import EditForm from './item/EditForm'
import FilterForm from './filter/Form'
import buildFilterQuery from './filter/buildFilterQuery'
import tableColumnSpecifications from './tableColumnSpecifications'

const propTypes = {
  itemId: PropTypes.string,
  onNavigation: PropTypes.func.isRequired,
}

const defaultProps = {
  itemId: undefined,
}

const baseTreeFilter = {
  group: 'Level 2',
}

const tableBatchFetchOptions = {
  include: ['parent'],
  relationships: ['parent'],
  resolveRelationships: ['storageLocation'],
}

class StorageLocationManager extends Component {
  constructor(props) {
    super(props)
    this.handleInteraction = this.handleInteraction.bind(this)
    this.renderCreateForm = this.renderCreateForm.bind(this)
    this.renderEditForm = this.renderEditForm.bind(this)
    this.renderFilterForm = this.renderFilterForm.bind(this)
  }

  handleInteraction(type, data = {}) {
    this.props.onNavigation(type, data)
  }

  renderEditForm(props = {}) {
    const { itemId } = this.props
    return (
      <EditForm
        {...props}
        itemId={itemId}
        onInteraction={this.handleInteraction}
      />
    )
  }
  renderCreateForm(props = {}) {
    return <CreateForm {...props} onInteraction={this.handleInteraction} />
  }

  renderFilterForm(props = {}) {
    return <FilterForm {...props} onInteraction={this.handleInteraction} />
  }

  render() {
    return (
      <ResourceManager
        {...this.props}
        baseTreeFilter={baseTreeFilter}
        buildFilterQuery={buildFilterQuery}
        onInteraction={this.handleInteraction}
        renderCreateForm={this.renderCreateForm}
        renderEditForm={this.renderEditForm}
        renderFilterForm={this.renderFilterForm}
        resource="storageLocation"
        tableBatchFetchOptions={tableBatchFetchOptions}
        tableColumnSpecifications={tableColumnSpecifications}
        treeEnabled
      />
    )
  }
}

StorageLocationManager.propTypes = propTypes
StorageLocationManager.defaultProps = defaultProps

export default StorageLocationManager
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResourceManager } from 'coreModules/resourceManager/components'

import CreateForm from './item/CreateForm'
import EditForm, { include } from './item/EditForm'
import FilterForm from './filter/Form'
import buildFilterQuery from './filter/buildFilterQuery'
import transformOutput from './item/BaseForm/transformations/output'
import tableColumnSpecifications from './tableColumnSpecifications'
import ItemTitle from './ItemTitle'

const propTypes = {
  itemId: PropTypes.string,
  onNavigation: PropTypes.func.isRequired,
}

const defaultProps = {
  itemId: undefined,
}

const sortOrder = ['attributes.name:asc']

class AgentManager extends Component {
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
        form="normalizedAgentEdit"
        itemId={itemId}
        onInteraction={this.handleInteraction}
      />
    )
  }
  renderCreateForm(props = {}) {
    return (
      <CreateForm
        {...props}
        form="normalizedAgentCreate"
        onInteraction={this.handleInteraction}
      />
    )
  }

  renderFilterForm(props = {}) {
    return (
      <FilterForm
        {...props}
        form="normalizedAgentFilter"
        onInteraction={this.handleInteraction}
      />
    )
  }

  render() {
    return (
      <ResourceManager
        {...this.props}
        buildFilterQuery={buildFilterQuery}
        fetchIncludeAfterUpdate={include}
        ItemTitle={ItemTitle}
        onInteraction={this.handleInteraction}
        renderCreateForm={this.renderCreateForm}
        renderEditForm={this.renderEditForm}
        renderFilterForm={this.renderFilterForm}
        resource="normalizedAgent"
        sortOrder={sortOrder}
        tableColumnSpecifications={tableColumnSpecifications}
        transformOutput={transformOutput}
        treeEnabled={false}
      />
    )
  }
}

AgentManager.propTypes = propTypes
AgentManager.defaultProps = defaultProps

export default AgentManager

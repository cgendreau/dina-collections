import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResourceManager } from 'coreModules/resourceManager/components'

import CreateForm from './item/CreateForm'
import EditForm, { include } from './item/EditForm'
import FilterForm from './filter/Form'
import buildFilterQuery from './filter/buildFilterQuery'
import tableColumnSpecifications from './tableColumnSpecifications'

const relationshipsToCheckBeforeDelete = ['acceptedToTaxon', 'synonymToTaxon']
const sortOrder = ['attributes.name:asc']

const propTypes = {
  itemId: PropTypes.string,
  onNavigation: PropTypes.func.isRequired,
}

const defaultProps = {
  itemId: undefined,
}

class TaxonNameManager extends Component {
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
        buildFilterQuery={buildFilterQuery}
        fetchIncludeAfterUpdate={include}
        onInteraction={this.handleInteraction}
        relationshipsToCheckBeforeDelete={relationshipsToCheckBeforeDelete}
        renderCreateForm={this.renderCreateForm}
        renderEditForm={this.renderEditForm}
        renderFilterForm={this.renderFilterForm}
        resource="taxonName"
        sortOrder={sortOrder}
        tableColumnSpecifications={tableColumnSpecifications}
        treeEnabled={false}
      />
    )
  }
}

TaxonNameManager.propTypes = propTypes
TaxonNameManager.defaultProps = defaultProps

export default TaxonNameManager

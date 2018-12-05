import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import objectPath from 'object-path'

import { ResourceManager } from 'coreModules/resourceManager/components'
import crudActionCreators from 'coreModules/crud/actionCreators'
import CreateForm from './item/CreateForm'
import EditForm, { include } from './item/EditForm'
import FilterForm from './filter/Form'
import buildFilterQuery from './filter/buildFilterQuery'
import tableColumnSpecifications from './tableColumnSpecifications'

const baseTreeFilter = {
  group: 'level 1',
}

const sortOrder = ['attributes.name:asc']

const tableBatchFetchOptions = {
  include: ['parent.parent.parent.parent.parent'],
  relationships: [
    'parent',
    'parent.parent',
    'parent.parent.parent',
    'parent.parent.parent.parent',
    'parent.parent.parent.parent.parent',
  ],
  resolveRelationships: ['storageLocation'],
}

const mapDispatchToProps = {
  fetchPhysicalObject: crudActionCreators.physicalObject.getOne,
  fetchStorageLocation: crudActionCreators.storageLocation.getOne,
}

const propTypes = {
  fetchPhysicalObject: PropTypes.func.isRequired,
  fetchStorageLocation: PropTypes.func.isRequired,
  itemId: PropTypes.string,
  onNavigation: PropTypes.func.isRequired,
}

const defaultProps = {
  itemId: undefined,
}

class StorageLocationManager extends Component {
  constructor(props) {
    super(props)
    this.handleInteraction = this.handleInteraction.bind(this)
    this.fetchRelationshipsBeforeDelete = this.fetchRelationshipsBeforeDelete.bind(
      this
    )
    this.renderCreateForm = this.renderCreateForm.bind(this)
    this.renderEditForm = this.renderEditForm.bind(this)
    this.renderFilterForm = this.renderFilterForm.bind(this)
  }

  handleInteraction(type, data = {}) {
    this.props.onNavigation(type, data)
  }

  fetchRelationshipsBeforeDelete() {
    const { fetchPhysicalObject, fetchStorageLocation, itemId } = this.props
    return fetchStorageLocation({
      id: itemId,
      relationships: ['children', 'physicalObjects'],
    }).then(storageLocation => {
      const physicalObjects = objectPath.get(
        storageLocation,
        'relationships.physicalObjects.data'
      )

      const relationships = objectPath.get(storageLocation, 'relationships')
      delete relationships.physicalObjects

      if (physicalObjects) {
        return Promise.all(
          // slicing to get at least 30 specimens but not unnecessarily many
          physicalObjects.slice(0, 50).map(({ id }) => {
            return fetchPhysicalObject({
              id,
              relationships: ['specimens'],
            }).then(physicalObject => {
              const specimensArray = objectPath.get(
                physicalObject,
                'relationships.specimens.data'
              )

              if (specimensArray && specimensArray.length) {
                return specimensArray[0]
              }

              return null
            })
          })
        ).then(specimensSubset => {
          const actualSpecimens = specimensSubset.filter(item => !!item)

          if (actualSpecimens.length) {
            return Promise.resolve({
              ...relationships,
              specimens: {
                customNumberOfItems: physicalObjects.length,
                data: actualSpecimens,
              },
            })
          }

          return Promise.resolve(relationships)
        })
      }

      return Promise.resolve(relationships)
    })
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
        fetchIncludeAfterUpdate={include}
        fetchRelationshipsBeforeDelete={this.fetchRelationshipsBeforeDelete}
        onInteraction={this.handleInteraction}
        renderCreateForm={this.renderCreateForm}
        renderEditForm={this.renderEditForm}
        renderFilterForm={this.renderFilterForm}
        resource="storageLocation"
        sortOrder={sortOrder}
        tableBatchFetchOptions={tableBatchFetchOptions}
        tableColumnSpecifications={tableColumnSpecifications}
        treeEnabled
      />
    )
  }
}

StorageLocationManager.propTypes = propTypes
StorageLocationManager.defaultProps = defaultProps

export default compose(connect(undefined, mapDispatchToProps))(
  StorageLocationManager
)

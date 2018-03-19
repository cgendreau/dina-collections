import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import { getStorageLocations as getStorageLocationsAc } from 'domainModules/storageService/actionCreators'
import globalStorageSelectors from 'domainModules/storageService/globalSelectors'

import SortableTree, { getTreeFromFlatData } from 'react-sortable-tree'
import 'react-sortable-tree/style.css'

const { getStorageLocations } = globalStorageSelectors

const mapStateToProps = state => {
  return {
    storageLocations: getStorageLocations(state),
  }
}

const mapDispatchToProps = {
  getStorageLocationsAc,
}

const propTypes = {
  getStorageLocationsAc: PropTypes.func.isRequired,
  storageLocations: PropTypes.array.isRequired,
}

class Storage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: [],
    }
  }
  componentWillMount() {
    this.props.getStorageLocationsAc().then(storageLocations => {
      const flatData = Object.keys(storageLocations).map(key => {
        const parentId =
          storageLocations[key].parent && storageLocations[key].parent.id
        return {
          id: storageLocations[key].id,
          parentId,
          title: storageLocations[key].locationText,
        }
      })

      const treeData = getTreeFromFlatData({
        flatData,
        rootKey: '1',
      })

      this.setState({
        treeData,
      })
    })
  }
  render() {
    const { treeData } = this.state
    return (
      <PageTemplate>
        <h1>
          <Icon name="options" />
          Storage
        </h1>
        <div style={{ height: '570px' }}>
          <SortableTree
            onChange={newTreeData => this.setState({ treeData: newTreeData })}
            treeData={treeData}
          />
        </div>
      </PageTemplate>
    )
  }
}

Storage.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(Storage)

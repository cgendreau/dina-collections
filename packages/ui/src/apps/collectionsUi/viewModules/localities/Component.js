import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import { getCuratedLocalities as getCuratedLocalitiesAc } from 'domainModules/localityService/actionCreators'
import SortableTree, { getTreeFromFlatData } from 'react-sortable-tree'
import 'react-sortable-tree/style.css'

const mapDispatchToProps = {
  getCuratedLocalitiesAc,
}

const propTypes = {
  getCuratedLocalitiesAc: PropTypes.func.isRequired,
}

class Localities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: [],
    }
  }
  componentWillMount() {
    this.props.getCuratedLocalitiesAc().then(localities => {
      console.log('localities', localities)
      const flatData = localities.map(locality => {
        return {
          id: locality.id,
          title: locality.name,
          parentId: '0',
        }
      })
      const parent = {
        title: 'Earth',
        id: '0',
      }

      console.log('flatData', flatData)
      const treeData = getTreeFromFlatData({
        flatData: [parent, ...flatData],
        rootKey: '0',
      })
      console.log('treeData', treeData)
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
          Localities
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

Localities.propTypes = propTypes

export default connect(null, mapDispatchToProps)(Localities)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import { getCuratedLocalities as getCuratedLocalitiesAc } from 'domainModules/localityService/actionCreators'
import SortableTree, { getTreeFromFlatData } from 'react-sortable-tree'
import 'react-sortable-tree/style.css'
import { globalSelectors as keyObjectGlobalSelectors } from 'domainModules/locality/keyObjectModule'

const mapStateToProps = state => {
  return {
    searchQuery: keyObjectGlobalSelectors['filter.searchQuery'](state),
  }
}

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
    this.generateNodeProps = this.generateNodeProps.bind(this)
  }
  generateNodeProps({ node, path }) {
    return {
      buttons: [
        <Button
          icon
          onClick={() => {
            this.props.onItemClick(node.id, 'edit')
          }}
        >
          <Icon name="edit" />
        </Button>,
        <Button
          icon
          onClick={() => {
            this.props.onItemClick(node.id, 'view')
          }}
        >
          <Icon name="folder open" />
        </Button>,
      ],
    }
  }

  componentWillMount() {
    this.props
      .getCuratedLocalitiesAc({
        queryParams: { relationships: ['parent'] },
      })
      .then(localities => {
        const subtitle = '123'

        const flatData = localities.map(locality => {
          return {
            id: locality.id,
            parentId: (locality.parent && locality.parent.id) || '0',
            subtitle,
            title: locality.name,
          }
        })
        const parent = {
          title: 'Earth',
          id: '0',
        }

        const treeData = getTreeFromFlatData({
          flatData: [parent, ...flatData],
          rootKey: '0',
        })
        this.setState({
          treeData,
        })
      })
  }
  render() {
    const { treeData } = this.state
    return (
      <div style={{ height: '400px' }}>
        <SortableTree
          expandOnlySearchedNodes
          generateNodeProps={this.generateNodeProps}
          onChange={newTreeData => this.setState({ treeData: newTreeData })}
          searchQuery={this.props.searchQuery}
          treeData={treeData}
        />
      </div>
    )
  }
}

Localities.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(Localities)

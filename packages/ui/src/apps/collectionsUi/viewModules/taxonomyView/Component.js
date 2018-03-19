import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import { fetchTaxonSearchResults } from 'domainModules/taxonomy/actionCreators'
import SortableTree, { getTreeFromFlatData } from 'react-sortable-tree'
import 'react-sortable-tree/style.css'

const mapDispatchToProps = {
  fetchTaxonSearchResults,
}

const propTypes = {
  fetchTaxonSearchResults: PropTypes.func.isRequired,
}

class Taxonomy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: [],
    }
  }
  componentWillMount() {
    this.props
      .fetchTaxonSearchResults({ relationships: 'all' })
      .then(taxons => {
        const flatData = taxons.data.map(rawTaxon => {
          const parentId =
            rawTaxon.relationships.parent &&
            rawTaxon.relationships.parent.data &&
            rawTaxon.relationships.parent.data.id
          return {
            id: rawTaxon.id,
            parentId,
            title: rawTaxon.attributes.scientificName,
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
          Taxonomy
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

Taxonomy.propTypes = propTypes

export default connect(null, mapDispatchToProps)(Taxonomy)

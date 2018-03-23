import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { globalSelectors as keyObjectGlobalSelectors } from 'domainModules/locality/keyObjectModule'
import { CrudManager } from 'coreModules/crudManager/components'

// import SplitView from './views/Split'
// import ModalView from './views/Modal'
// import SingleView from './views/Single'

// import CreateContent from './content/Create'
import EditContent from './content/Edit'
// import InspectContent from './content/Inspect'
import ListContent from './content/List'

const propTypes = {
  action: PropTypes.oneOf(['create', 'edit', 'inspect', 'explore']).isRequired,
  localityId: PropTypes.string,
  onItemInteraction: PropTypes.func.isRequired,
}

const defaultProps = {
  localityId: '',
}

const mapStateToProps = state => {
  return {
    viewMode: keyObjectGlobalSelectors.get.viewMode(state),
  }
}

class LocalityManager extends Component {
  constructor(props) {
    super(props)
    this.renderEdit = this.renderEdit.bind(this)
    this.renderExplore = this.renderExplore.bind(this)
  }
  renderEdit() {
    return (
      <EditContent
        localityId={this.props.localityId}
        onItemInteraction={this.props.onItemInteraction}
      />
    )
  }
  renderExplore() {
    return (
      <ListContent
        activeLocalityId={this.props.localityId}
        onItemInteraction={this.props.onItemInteraction}
      />
    )
  }

  render() {
    const { action } = this.props
    return (
      <CrudManager
        action={action}
        crudManagerId="locality"
        renderEdit={this.renderEdit}
        renderExplore={this.renderExplore}
        viewMode="single"
      />
    )
  }
}

LocalityManager.propTypes = propTypes
LocalityManager.defaultProps = defaultProps

export default connect(mapStateToProps)(LocalityManager)

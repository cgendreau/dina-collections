import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { globalSelectors as keyObjectGlobalSelectors } from 'domainModules/locality/keyObjectModule'

import SplitView from './views/Split'
import ModalView from './views/Modal'
import SingleView from './views/Single'

import CreateContent from './content/Create'
import EditContent from './content/Edit'
import InspectContent from './content/Inspect'
import ListContent from './content/List'

const propTypes = {
  viewMode: PropTypes.oneOf(['modal', 'single', 'split']),
  localityId: PropTypes.string,
  mode: PropTypes.string.isRequired,
  onItemClick: PropTypes.func,
}

const defaultProps = {
  viewMode: 'modal',
  localityId: '',
  onItemClick: undefined,
}

const mapStateToProps = state => {
  return {
    viewMode: keyObjectGlobalSelectors.viewMode(state),
  }
}

class LocalityManager extends Component {
  render() {
    const { viewMode, displayMode, mode, localityId } = this.props

    const displayList = !(viewMode === 'single' && mode !== 'list')

    const ListContentComponent = displayList ? (
      <ListContent
        activeLocalityId={localityId}
        onItemClick={this.props.onItemClick}
      />
    ) : null

    let ActionComponent = null

    if (mode === 'create') {
      ActionComponent = <CreateContent onBack={this.props.onBack} />
    }

    if (mode === 'edit') {
      ActionComponent = (
        <EditContent
          pickPrev={this.props.pickPrev}
          pickNext={this.props.pickNext}
          localityId={localityId}
          onBack={this.props.onBack}
        />
      )
    }

    if (mode === 'view') {
      ActionComponent = <InspectContent localityId={localityId} />
    }

    if (viewMode === 'split') {
      return (
        <SplitView
          leftContent={ListContentComponent}
          rightContent={ActionComponent}
        />
      )
    }

    if (viewMode === 'single') {
      return <SingleView component={ListContentComponent || ActionComponent} />
    }

    if (viewMode === 'modal') {
      return (
        <ModalView
          onBack={this.props.onBack}
          backgroundContent={ListContentComponent}
          modalComponent={ActionComponent}
        />
      )
    }
    return null
  }
}

LocalityManager.propTypes = propTypes
LocalityManager.defaultProps = defaultProps

export default connect(mapStateToProps)(LocalityManager)

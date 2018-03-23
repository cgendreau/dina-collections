import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { globalSelectors as keyObjectGlobalSelectors } from 'coreModules/crudManager/keyObjectModule'
import ViewPicker from '../ViewPicker'

import SplitView from './views/Split'
import ModalView from './views/Modal'
import SingleView from './views/Single'

const propTypes = {
  action: PropTypes.oneOf(['create', 'edit', 'inspect', 'explore']),
  crudManagerId: PropTypes.string.isRequired,
  itemId: PropTypes.string,
  onItemInteraction: PropTypes.func.isRequired,
  renderCreate: PropTypes.func,
  renderEdit: PropTypes.func,
  renderExplore: PropTypes.func.isRequired,
  renderInspect: PropTypes.func,
  viewMode: PropTypes.oneOf(['modal', 'single', 'split']),
}

const defaultProps = {
  action: 'explore',
  itemId: '',
  renderCreate: undefined,
  renderEdit: undefined,
  renderInspect: undefined,
  viewMode: 'modal',
}

const mapStateToProps = (state, { crudManagerId }) => {
  return {
    viewMode: keyObjectGlobalSelectors.indexGet.viewMode(state, crudManagerId),
  }
}

class CrudManager extends Component {
  render() {
    const {
      action,
      crudManagerId,
      itemId,
      renderCreate,
      renderEdit,
      renderExplore,
      renderInspect,
      viewMode,
    } = this.props

    const displayExplore = !(viewMode === 'single' && action !== 'explore')

    const ExploreComponent =
      displayExplore &&
      renderExplore({
        activeItemId: itemId,
        onItemInteraction: this.props.onItemInteraction,
      })

    let ItemComponent
    switch (action) {
      case 'create': {
        ItemComponent = renderCreate({
          onItemInteraction: this.props.onItemInteraction,
        })
        break
      }
      case 'edit': {
        ItemComponent = renderEdit({
          itemId,
          onItemInteraction: this.props.onItemInteraction,
        })
        break
      }
      case 'inspect': {
        ItemComponent = renderInspect({
          itemId,
          onItemInteraction: this.props.onItemInteraction,
        })
        break
      }
      case 'explore': {
        break
      }
      default: {
        throw new Error(`Unknown action ${action}`)
      }
    }

    let ViewComponent
    switch (viewMode) {
      case 'split': {
        ViewComponent = (
          <SplitView
            leftComponent={ExploreComponent}
            rightComponent={ItemComponent}
          />
        )
        break
      }
      case 'single': {
        ViewComponent = (
          <SingleView component={ExploreComponent || ItemComponent} />
        )
        break
      }
      case 'modal': {
        ViewComponent = (
          <ModalView
            backgroundComponent={ExploreComponent}
            modalComponent={ItemComponent}
            onItemInteraction={this.props.onItemInteraction}
          />
        )
        break
      }
      default: {
        throw new Error(`Unknown viewMode ${viewMode}`)
      }
    }
    return (
      <React.Fragment>
        <ViewPicker crudManagerId={crudManagerId} />
        {ViewComponent}
      </React.Fragment>
    )
  }
}

CrudManager.propTypes = propTypes
CrudManager.defaultProps = defaultProps

export default connect(mapStateToProps)(CrudManager)

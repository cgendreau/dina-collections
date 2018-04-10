import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import localityServiceSelectors from 'dataModules/localityService/globalSelectors'
import { ensureAllLocalitiesFetched } from 'dataModules/localityService/higherOrderComponents'
import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from '../../../keyObjectModule'
import { CONTINENT } from '../../../constants'
import localitySelectors from '../../../globalSelectors'
import { ITEM_CLICK } from '../../../interactions'
import ListItem from './ListItem'

const mapStateToProps = (state, { name }) => {
  const filter = keyObjectGlobalSelectors.get[':name.filter'](state, { name })
  const filterParentId = (filter && filter.parentId) || undefined
  const filterParent =
    filterParentId &&
    localityServiceSelectors.getCuratedLocality(state, filterParentId)

  const curatedLocalities = localitySelectors.getCuratedLocalitiesArrayByFilter(
    state,
    filter
  )

  return {
    curatedLocalities,
    filter,
    filterParent,
    numberOfCuratedLocalities: curatedLocalities.length,
  }
}

const mapDispatchToProps = {
  setFilter: keyObjectActionCreators.set[':name.filter'],
  setFilterOffset: keyObjectActionCreators.set[':name.filter.offset'],
  setFilterParentId: keyObjectActionCreators.set[':name.filter.parentId'],
  setFilterSearchGroup: keyObjectActionCreators.set[':name.filter.group'],
  setFilterSearchSearchQuery:
    keyObjectActionCreators.set[':name.filter.searchQuery'],
}

const propTypes = {
  activeLocalityId: PropTypes.string,
  curatedLocalities: PropTypes.array,
  displayNavigationButtons: PropTypes.bool.isRequired,
  filter: PropTypes.object,
  filterParent: PropTypes.object,
  name: PropTypes.string.isRequired,
  numberOfCuratedLocalities: PropTypes.number.isRequired,
  onInteraction: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  setFilterOffset: PropTypes.func.isRequired,
  setFilterParentId: PropTypes.func.isRequired,
  setFilterSearchGroup: PropTypes.func.isRequired,
  setFilterSearchSearchQuery: PropTypes.func.isRequired,
}

const defaultProps = {
  activeLocalityId: '',
  curatedLocalities: [],
  filter: {},
  filterParent: undefined,
}

class LocalityList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cursorIndex: 0,
    }

    this.getIndexFromOffsetAndNumberOfLocalities = this.getIndexFromOffsetAndNumberOfLocalities.bind(
      this
    )
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.setCursorIndex = this.setCursorIndex.bind(this)
  }

  componentWillMount() {
    this.props.setFilter(this.props.name, {
      group: 'continent',
      limit: 10,
      offset: 0,
      searchQuery: '',
    })
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  getIndexFromOffsetAndNumberOfLocalities() {
    const { filter: { offset }, numberOfCuratedLocalities } = this.props

    return Math.max(Math.min(offset, numberOfCuratedLocalities - 1), 0)
  }

  setCursorIndex(cursorIndex = 0) {
    this.setState({ cursorIndex })
  }

  expandLocalityAtCursor() {
    const { curatedLocalities } = this.props
    const { cursorIndex } = this.state
    const localityAtCursor = curatedLocalities[cursorIndex]
    if (localityAtCursor) {
      this.props.setFilterOffset(this.props.name, 0)
      this.setCursorIndex(0)
      this.props.setFilterSearchGroup(this.props.name, '')
      this.props.setFilterSearchSearchQuery(this.props.name, '')
      this.props.setFilterParentId(this.props.name, localityAtCursor.id)
    }
  }

  selectParent() {
    const { filter, filterParent } = this.props

    if (filterParent && filterParent.parent && filterParent.parent.id) {
      const filterParentParentId = filterParent.parent.id
      this.props.setFilterSearchGroup(this.props.name, '')
      this.props.setFilterSearchSearchQuery(this.props.name, '')
      this.props.setFilterOffset(
        this.props.name,
        this.getIndexFromOffsetAndNumberOfLocalities()
      )

      if (filterParent.parent.id === '1') {
        this.props.setFilterParentId(this.props.name, '') // don't use root as only parent filter

        if (!filter.group) {
          this.props.setFilterSearchGroup(this.props.name, CONTINENT)
        }
      } else {
        this.setCursorIndex(this.getIndexFromOffsetAndNumberOfLocalities())
        this.props.setFilterParentId(this.props.name, filterParentParentId)
      }
    }
  }

  selectLocalityAtCursor() {
    const { curatedLocalities } = this.props
    const { cursorIndex } = this.state
    const localityAtCursor = curatedLocalities[cursorIndex]
    if (localityAtCursor) {
      this.props.onInteraction(ITEM_CLICK, { itemId: localityAtCursor.id })
    }
  }

  moveCursorUp() {
    const { filter: { offset, limit } } = this.props
    const { cursorIndex } = this.state
    if (offset > 0 && cursorIndex === 0) {
      this.props.setFilterOffset(this.props.name, Math.max(offset - 1, 0))
      this.setState({
        cursorIndex: limit - 1,
      })
    }

    this.setState({
      cursorIndex: Math.max(cursorIndex - 1, 0),
    })
  }

  moveCursorDown() {
    const { filter: { offset, limit }, numberOfCuratedLocalities } = this.props
    const { cursorIndex } = this.state

    if (cursorIndex === numberOfCuratedLocalities) {
      return null
    }
    if (cursorIndex === limit - 1) {
      return this.props.setFilterOffset(this.props.name, offset + 1)
    }

    return this.setState({
      cursorIndex: Math.min(cursorIndex + 1, limit),
    })
  }

  handleKeyDown({ key }) {
    switch (key) {
      case 'ArrowDown': {
        return this.moveCursorDown()
      }
      case 'ArrowUp': {
        return this.moveCursorUp()
      }
      case 'ArrowLeft': {
        return this.selectParent()
      }
      case 'ArrowRight': {
        return this.expandLocalityAtCursor()
      }
      case 'Enter': {
        return this.selectLocalityAtCursor()
      }
      default: {
        return null
      }
    }
  }

  render() {
    const { cursorIndex } = this.state
    const {
      activeLocalityId,
      curatedLocalities,
      displayNavigationButtons,
      onInteraction,
    } = this.props
    return (
      <List divided selection size="small" verticalAlign="middle">
        {curatedLocalities.map((curatedLocality, index) => {
          const cursorFocus = index === cursorIndex
          return (
            <ListItem
              activeLocalityId={activeLocalityId}
              curatedLocality={curatedLocality}
              cursorFocus={cursorFocus}
              displayNavigationButtons={displayNavigationButtons}
              key={curatedLocality.id}
              onInteraction={onInteraction}
            />
          )
        })}
      </List>
    )
  }
}

LocalityList.propTypes = propTypes
LocalityList.defaultProps = defaultProps

export default compose(
  ensureAllLocalitiesFetched(),
  connect(mapStateToProps, mapDispatchToProps)
)(LocalityList)

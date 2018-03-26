import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Icon, Label, List, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import localityServiceSelectors from 'domainModules/localityService/globalSelectors'
import { getCuratedLocalities as getCuratedLocalitiesAc } from 'domainModules/localityService/actionCreators'
import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'domainModules/locality/keyObjectModule'

const mapStateToProps = state => {
  const filter = keyObjectGlobalSelectors.get.filter(state)
  return {
    curatedLocalities: localityServiceSelectors.getCuratedLocalitiesArrayByFilter(
      state,
      filter
    ),
  }
}

const mapDispatchToProps = {
  delFilterLimit: keyObjectActionCreators.del['filter.limit'],
  getCuratedLocalities: getCuratedLocalitiesAc,
  setFilterLimit: keyObjectActionCreators.set['filter.limit'],
}

const propTypes = {
  activeLocalityId: PropTypes.string,
  curatedLocalities: PropTypes.array,
  delFilterLimit: PropTypes.func.isRequired,
  getCuratedLocalities: PropTypes.func.isRequired,
  onItemInteraction: PropTypes.func.isRequired,
  setFilterLimit: PropTypes.func.isRequired,
}

const defaultProps = {
  activeLocalityId: '',
  curatedLocalities: [],
  onItemClick: undefined,
}

const groupColorMap = {
  continent: 'violet',
  country: 'teal',
  district: 'purple',
  province: 'blue',
}

class LocalityList extends Component {
  constructor(props) {
    super(props)
    this.handleItemClick = this.handleItemClick.bind(this)
  }
  componentDidMount() {
    this.props.setFilterLimit(10)
    this.props.getCuratedLocalities({
      queryParams: { relationships: ['all'] },
    })
  }

  componentWillUnmount() {
    this.props.delFilterLimit()
  }

  handleItemClick(action, id) {
    if (this.props.onItemInteraction) {
      this.props.onItemInteraction(action, { id })
    }
  }

  render() {
    const { activeLocalityId, curatedLocalities } = this.props
    return (
      <List
        divided
        selection
        size="small"
        style={{ minHeight: 505 }}
        verticalAlign="middle"
      >
        {curatedLocalities.map(curatedLocality => {
          return (
            <List.Item
              active={activeLocalityId === curatedLocality.id}
              key={curatedLocality.id}
            >
              <Link to={`/app/localities/${curatedLocality.id}/edit`}>
                <List.Content floated="right">
                  <Label
                    color={groupColorMap[curatedLocality.group]}
                    style={{ marginRight: 20 }}
                  >
                    {curatedLocality.group}
                  </Label>
                  <Button
                    icon
                    onClick={event => {
                      event.preventDefault()
                      this.handleItemClick('edit', curatedLocality.id)
                    }}
                  >
                    <Icon name="edit" />
                  </Button>
                  <Button
                    icon
                    onClick={event => {
                      event.preventDefault()
                      this.handleItemClick('inspect', curatedLocality.id)
                    }}
                  >
                    <Icon name="folder open" />
                  </Button>
                </List.Content>
              </Link>

              <List.Icon circular color="black" name="map" size="large" />

              <List.Content>{curatedLocality.name}</List.Content>
            </List.Item>
          )
        })}
      </List>
    )
  }
}

LocalityList.propTypes = propTypes
LocalityList.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  LocalityList
)

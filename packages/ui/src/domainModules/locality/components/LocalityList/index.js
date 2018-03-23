import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Label, List } from 'semantic-ui-react'
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
  const filter = keyObjectGlobalSelectors.filter(state)
  return {
    curatedLocalities: localityServiceSelectors.getCuratedLocalitiesArrayByFilter(
      state,
      filter
    ),
  }
}

const mapDispatchToProps = {
  getCuratedLocalities: getCuratedLocalitiesAc,
  setFilterLimit: keyObjectActionCreators.set['filter.limit'],
  delFilterLimit: keyObjectActionCreators.del['filter.limit'],
}

const propTypes = {
  curatedLocalities: PropTypes.array.isRequired,
  getCuratedLocalities: PropTypes.func.isRequired,
  onItemClick: PropTypes.func,
}

const defaultProps = {
  curatedLocalities: [],
  localityId: '',
  onItemClick: undefined,
}

const groupColorMap = {
  country: 'teal',
  province: 'blue',
  continent: 'violet',
  district: 'purple',
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

  handleItemClick(id, action) {
    if (this.props.onItemClick) {
      this.props.onItemClick(id, action)
    }
  }

  render() {
    const { activeLocalityId, curatedLocalities } = this.props
    return (
      <List
        divided
        size="huge"
        style={{ minHeight: 505 }}
        selection
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
                      this.handleItemClick(curatedLocality.id, 'edit')
                    }}
                  >
                    <Icon name="edit" />
                  </Button>
                  <Button
                    icon
                    onClick={event => {
                      event.preventDefault()
                      this.handleItemClick(curatedLocality.id, 'view')
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

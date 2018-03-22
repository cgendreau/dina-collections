import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactList from 'react-list'
import {
  Button,
  Container,
  Grid,
  Icon,
  Item,
  Label,
  List,
  Segment,
} from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import localityServiceSelectors from 'domainModules/localityService/globalSelectors'
import { getCuratedLocalities as getCuratedLocalitiesAc } from 'domainModules/localityService/actionCreators'
import { globalSelectors as keyObjectGlobalSelectors } from 'domainModules/locality/keyObjectModule'

import ListFilter from './ListFilter'
import Edit from './Edit'

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
}

const propTypes = {
  curatedLocalities: PropTypes.array.isRequired,
  getCuratedLocalities: PropTypes.func.isRequired,
  handleItemClick: PropTypes.func,
  localityId: PropTypes.string,
  mode: PropTypes.string.isRequired,
}

const defaultProps = {
  curatedLocalities: [],
  handleItemClick: undefined,
  localityId: '',
}

class LocalityList extends Component {
  constructor(props) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
  }
  componentDidMount() {
    this.props.getCuratedLocalities()
  }

  handleItemClick(id, action) {
    if (this.props.handleItemClick) {
      this.props.handleItemClick(id, action)
    }
  }

  renderItem(index, key) {
    const curatedLocality = this.props.curatedLocalities[index]
    return (
      <Item
        key={curatedLocality.id}
        style={{
          borderBottom: '1px solid rgba(34,36,38,.15)',
          height: '50px',
          paddingBottom: '5px',
          paddingTop: '5px',
        }}
      >
        <Item.Content>
          <Item.Header as="h4">
            {curatedLocality.name} ({curatedLocality.group})
            <Button.Group basic floated="right" size="small">
              <Button
                icon
                onClick={() => {
                  this.handleItemClick(curatedLocality.id, 'edit')
                }}
              >
                <Icon name="edit" />
              </Button>
              <Button
                icon
                onClick={() => {
                  this.handleItemClick(curatedLocality.id, 'view')
                }}
              >
                <Icon name="folder open" />
              </Button>
            </Button.Group>
          </Item.Header>
        </Item.Content>
      </Item>
    )
  }

  render() {
    const { mode, localityId } = this.props
    return (
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              <ListFilter />
              <Segment green segmentui>
                <div style={{ maxHeight: 500, overflow: 'auto' }}>
                  <ReactList
                    itemRenderer={this.renderItem}
                    length={this.props.curatedLocalities.length}
                    type="uniform"
                  />
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              {mode === 'create' && <div>CREATE</div>}
              {mode === 'list' && <div>LIST {localityId}</div>}
              {mode === 'edit' && <Edit />}
              {mode === 'view' && <div>VIEW {localityId}</div>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

LocalityList.propTypes = propTypes
LocalityList.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  LocalityList
)

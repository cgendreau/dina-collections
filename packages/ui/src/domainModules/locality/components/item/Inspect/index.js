import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import {
  createEnsureAllItemsFetched,
  createGetItemById,
} from 'coreModules/crud/higherOrderComponents'
import { ParentChildTables } from 'coreModules/crudBlocks/components'
import { SET_ITEM_INSPECT } from 'coreModules/crudBlocks/constants'

const mapStateToProps = (state, ownProps) => {
  const { item: place } = ownProps

  const parent =
    place &&
    place.parent &&
    globalCrudSelectors.place.getOne(state, place.parent.id)
  const children =
    place &&
    place.children &&
    place.children.map(({ id }) => {
      return globalCrudSelectors.place.getOne(state, id)
    })

  return {
    children,
    parent,
    place,
  }
}

const propTypes = {
  allItemsFetched: PropTypes.bool.isRequired,
  children: PropTypes.array,
  onInteraction: PropTypes.func.isRequired,
  parent: PropTypes.object,
  place: PropTypes.object,
}

const defaultProps = {
  children: [],
  parent: null,
  place: undefined,
}

export class Inspect extends PureComponent {
  constructor(props) {
    super(props)
    this.handleRowClick = this.handleRowClick.bind(this)
  }

  handleRowClick(event, itemId) {
    event.preventDefault()
    this.props.onInteraction(SET_ITEM_INSPECT, {
      itemId,
    })
  }

  render() {
    const { allItemsFetched, children, place, parent } = this.props

    if (!place || !allItemsFetched) {
      return null
    }

    return (
      <React.Fragment>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Key</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {place && (
            <Table.Body>
              <Table.Row>
                <Table.Cell>Name</Table.Cell>
                <Table.Cell>{place.name}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>id</Table.Cell>
                <Table.Cell>{place.id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MaximumElevationInMeters</Table.Cell>
                <Table.Cell>
                  {place.verticalPosition &&
                    place.verticalPosition.maximummElevationInMeters}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MinimumElevationInMeters</Table.Cell>
                <Table.Cell>
                  {place.verticalPosition &&
                    place.verticalPosition.minimumElevationInMeters}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MaximumDepthInMeters</Table.Cell>
                <Table.Cell>
                  {place.verticalPosition &&
                    place.verticalPosition.maximumDepthInMeters}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MinimumDepthInMeters</Table.Cell>
                <Table.Cell>
                  {place.verticalPosition &&
                    place.verticalPosition.minimumDepthInMeters}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Latitude</Table.Cell>
                <Table.Cell>{place.latitude}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Longitude</Table.Cell>
                <Table.Cell>{place.longitude}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>UncertaintyInMeters</Table.Cell>
                <Table.Cell>{place.uncertaintyInMeters}</Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table>

        <ParentChildTables
          childrenItems={children}
          onRowClick={this.handleRowClick}
          parentItem={parent}
        />
      </React.Fragment>
    )
  }
}

Inspect.propTypes = propTypes
Inspect.defaultProps = defaultProps

export default compose(
  createEnsureAllItemsFetched({
    relationships: ['parent'],
    resource: 'place',
  }),

  createGetItemById({
    resource: 'place',
  }),
  connect(mapStateToProps)
)(Inspect)

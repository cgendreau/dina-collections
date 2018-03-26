import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import localityServiceSelectors from 'domainModules/localityService/globalSelectors'

const mapStateToProps = (state, ownProps) => {
  const { itemId } = ownProps
  const curatedLocality = localityServiceSelectors.getCuratedLocality(
    state,
    itemId
  )
  const parent =
    curatedLocality &&
    curatedLocality.parent &&
    localityServiceSelectors.getCuratedLocality(
      state,
      curatedLocality.parent.id
    )

  const children =
    curatedLocality &&
    curatedLocality.children &&
    curatedLocality.children.map(({ id }) => {
      return localityServiceSelectors.getCuratedLocality(state, id)
    })

  return {
    children,
    curatedLocality,
    parent,
  }
}

const propTypes = {
  children: PropTypes.array,
  curatedLocality: PropTypes.object,
  parent: PropTypes.object,
}

const defaultProps = {
  children: [],
  curatedLocality: undefined,
  parent: null,
}

export class Inspect extends Component {
  render() {
    const { children, curatedLocality, parent } = this.props
    if (!curatedLocality) {
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
          {curatedLocality && (
            <Table.Body>
              <Table.Row>
                <Table.Cell>id</Table.Cell>
                <Table.Cell>{curatedLocality.id}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Namn</Table.Cell>
                <Table.Cell>{curatedLocality.name}</Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table>
        <h2>Parent</h2>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {parent && (
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Link to={`/app/localities/${parent.id}/inspect`}>
                    {parent.id}
                  </Link>
                </Table.Cell>
                <Table.Cell>{parent.name}</Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table>

        <h2>Children</h2>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {children &&
              children.map(child => {
                return (
                  <Table.Row>
                    <Table.Cell>
                      <Link to={`/app/localities/${child.id}/inspect`}>
                        {child.id}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{child.name}</Table.Cell>
                  </Table.Row>
                )
              })}
          </Table.Body>
        </Table>
      </React.Fragment>
    )
  }
}

Inspect.propTypes = propTypes
Inspect.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(Inspect)

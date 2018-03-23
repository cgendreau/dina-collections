import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Icon, Segment, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import createLog from 'utilities/log'
import { compose } from 'redux'
import { connect } from 'react-redux'
import localityServiceSelectors from 'domainModules/localityService/globalSelectors'
import { updateCuratedLocality as updateCuratedLocalityAc } from 'domainModules/localityService/actionCreators'
import TempNavigation from '../../../TempNavigation'

const log = createLog('modules:user:InspectForm')

const mapStateToProps = (state, ownProps) => {
  const { localityId } = ownProps
  const curatedLocality = localityServiceSelectors.getCuratedLocality(
    state,
    localityId
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

const mapDispatchToProps = {
  updateCuratedLocality: updateCuratedLocalityAc,
}

const propTypes = {
  curatedLocality: PropTypes.object,
  localityId: PropTypes.string.isRequired,
  updateCuratedLocality: PropTypes.func.isRequired,
}

const defaultProps = {
  curatedLocality: undefined,
}

export class Inspect extends Component {
  render() {
    const { children, parent, curatedLocality, localityId } = this.props
    log.render()
    if (!curatedLocality) {
      return null
    }
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <TempNavigation
            onBack={this.props.onBack}
            pickPrev={this.props.pickPrev}
            pickNext={this.props.pickNext}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Segment size="tiny" stacked style={{ minHeight: 505 }}>
            <h2>
              <Link to={`/app/localities/${curatedLocality.id}/edit`}>
                <Button icon>
                  <Icon name="edit" />
                </Button>
              </Link>
              {curatedLocality.name}
            </h2>
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
                      <Link to={`/app/localities/${parent.id}/view`}>
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
                          <Link to={`/app/localities/${child.id}/view`}>
                            {child.id}
                          </Link>
                        </Table.Cell>
                        <Table.Cell>{child.name}</Table.Cell>
                      </Table.Row>
                    )
                  })}
              </Table.Body>
            </Table>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

Inspect.propTypes = propTypes
Inspect.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(Inspect)

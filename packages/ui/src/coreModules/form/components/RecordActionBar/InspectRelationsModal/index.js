import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Header, List, Modal } from 'semantic-ui-react'
import objectPath from 'object-path'

import { ModuleTranslate } from 'coreModules/i18n/components'
import ListItem from './ListItem'

const propTypes = {
  onClose: PropTypes.func.isRequired,
  recordHeader: PropTypes.string.isRequired,
  relationships: PropTypes.objectOf(
    PropTypes.shape({
      data: PropTypes.oneOfType([
        PropTypes.arrayOf({
          id: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
        }).isRequired,
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
        }).isRequired,
      ]),
      customNumberOfItems: PropTypes.number,
    })
  ),
}
const defaultProps = {
  relationships: {},
}

class InspectRelationsModal extends PureComponent {
  render() {
    const { onClose: handleClose, recordHeader, relationships } = this.props

    const sortedRelationships = Object.keys(relationships).sort()

    return (
      <Modal onClose={handleClose} open size="small">
        <Modal.Header>{`Relations for: ${recordHeader}`}</Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Row className="relaxed" columns={1}>
              {sortedRelationships.map(relationshipKey => {
                const data = objectPath.get(
                  relationships,
                  `${relationshipKey}.data`
                )

                const isArray = Array.isArray(data)

                if (!data || (isArray && !data.length)) {
                  return null
                }

                const customNumberOfItems = objectPath.get(
                  relationships,
                  `${relationshipKey}.customNumberOfItems`
                )

                const numberOfItems = isArray
                  ? customNumberOfItems || data.length
                  : 1

                const { type: relationshipResource } = isArray ? data[0] : data

                return (
                  <React.Fragment>
                    <Grid.Column>
                      <Header>
                        <ModuleTranslate
                          capitalize
                          module="form"
                          textKey={`relationshipKey.${relationshipKey}`}
                        />{' '}
                        ({numberOfItems}{' '}
                        <ModuleTranslate module="form" textKey="relations" />)
                        {numberOfItems > 30 && (
                          <Header.Subheader>
                            {`Below are 30 of the relations. To see all ${
                              numberOfItems
                            } relations, please use the search for `}
                            <ModuleTranslate
                              module="form"
                              textKey={`resourcePlural.${relationshipResource}`}
                            />.
                          </Header.Subheader>
                        )}
                      </Header>
                    </Grid.Column>
                    <Grid.Column>
                      <List divided selection verticalAlign="middle">
                        {(isArray ? data : [data])
                          .slice(0, 30)
                          .map(({ id, type }) => {
                            return <ListItem id={id} resource={type} />
                          })}
                      </List>
                    </Grid.Column>
                  </React.Fragment>
                )
              })}
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions style={{ textAlign: 'left' }}>
          <Button onClick={handleClose} primary>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

InspectRelationsModal.propTypes = propTypes
InspectRelationsModal.defaultProps = defaultProps

export default InspectRelationsModal

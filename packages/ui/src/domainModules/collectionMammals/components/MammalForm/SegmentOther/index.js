import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid, Segment } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { CustomData, Field, Input } from 'coreModules/form/components'
import { CATALOG_CARD } from '../../../constants'
import RecordHistoryEvent from './RecordHistoryEvent'

const log = createLog('modules:collectionMammals:MammalForm:SegmentOther')

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    recordHistoryEvents: formValueSelector(state, 'recordHistoryEvents'),
  }
}

const propTypes = {
  readOnly: PropTypes.object,
  recordHistoryEvents: PropTypes.array,
}

const defaultProps = {
  readOnly: undefined,
  recordHistoryEvents: undefined,
}

class SegmentOther extends PureComponent {
  render() {
    const { readOnly, recordHistoryEvents } = this.props

    const catalogCardEventIndex =
      recordHistoryEvents &&
      recordHistoryEvents.findIndex(({ system }) => system === CATALOG_CARD)
    const hasCatalogCardHistory =
      catalogCardEventIndex !== undefined && catalogCardEventIndex !== -1
    const fallbackIndex =
      (recordHistoryEvents && recordHistoryEvents.length) || 0

    log.debug('recordHistoryEvents', recordHistoryEvents)
    log.debug('catalogCardEventIndex', catalogCardEventIndex)
    log.debug('hasCatalogCardHistory', hasCatalogCardHistory)
    log.debug('fallbackIndex', fallbackIndex)
    log.render()
    return (
      <Segment color="green">
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Row>
            <Grid.Column computer={6} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                component={Input}
                disabled
                label={
                  <ModuleTranslate
                    scope="collectionItems"
                    textKey="storedUnderTaxonName"
                  />
                }
                module="collectionMammals"
                name="collectionItems.0.physicalObject.storedUnderTaxonName"
                type="text"
              />
            </Grid.Column>
            <Grid.Column computer={6} mobile={16} tablet={8}>
              <CustomData
                autoComplete="off"
                disabled
                input={{ name: 'readOnly', value: readOnly }}
                label={<ModuleTranslate scope="other" textKey="readOnly" />}
                meta={{}}
                module="collectionMammals"
                name="readOnly"
                type="read-only"
              />
            </Grid.Column>
          </Grid.Row>
          <RecordHistoryEvent
            index={
              hasCatalogCardHistory ? catalogCardEventIndex : fallbackIndex
            }
          />
        </Grid>
      </Segment>
    )
  }
}

SegmentOther.propTypes = propTypes
SegmentOther.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(SegmentOther)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { Field, Input, SingleDate } from 'coreModules/form/components'
import { ModuleTranslate } from 'coreModules/i18n/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { FeatureObservationDropdownSearch } from 'domainModules/curatedList/components'
import { TogglableAgentDropdownPickerSearch } from 'domainModules/agent/components'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentFeatureObservations:FeatureObservationsTableRow'
)

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  featureType: PropTypes.object.isRequired,
  getPath: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
}

class FeatureObservationTableRow extends PureComponent {
  componentWillMount() {
    const { changeFieldValue, getPath, featureType } = this.props
    changeFieldValue(getPath('featureType.id'), featureType.id)
  }

  render() {
    const { featureType, getPath, index } = this.props

    const {
      attributes: { key, selectableMethods, selectableUnits, selectableValues },
    } = featureType

    const hasSelectableMethods = !!selectableMethods
    const hasSelectableUnits = !!selectableUnits
    const hasSelectableValues = !!selectableValues

    log.render()
    return (
      <Table.Row key={index}>
        <Table.Cell key={getPath('featureType.id')}>
          <ModuleTranslate
            fallback={key}
            module="collectionMammals"
            scope="featureObservations"
            textKey={`other.${key}`}
          />
        </Table.Cell>
        {hasSelectableValues ? (
          <Table.Cell key={getPath('featureObservationText')}>
            <Field
              autoComplete="off"
              className="transparent"
              component={FeatureObservationDropdownSearch}
              displayLabel={false}
              module="collectionMammals"
              name={getPath('featureObservationText')}
              rawOptions={selectableValues}
              type="text"
            />
          </Table.Cell>
        ) : (
          <Table.Cell key={getPath('featureObservationText')}>
            <Field
              autoComplete="off"
              className="transparent"
              component={Input}
              displayLabel={false}
              module="collectionMammals"
              name={getPath('featureObservationText')}
              type="text"
            />
          </Table.Cell>
        )}

        {hasSelectableUnits && (
          <Table.Cell key={getPath('featureObservationUnit')}>
            <Field
              autoComplete="off"
              className="transparent"
              component={FeatureObservationDropdownSearch}
              displayLabel={false}
              module="collectionMammals"
              name={getPath('featureObservationUnit')}
              rawOptions={selectableUnits}
              type="text"
            />
          </Table.Cell>
        )}
        {hasSelectableMethods && (
          <Table.Cell key={getPath('methodText')}>
            <Field
              autoComplete="off"
              className="transparent"
              component={FeatureObservationDropdownSearch}
              displayLabel={false}
              module="collectionMammals"
              name={getPath('methodText')}
              rawOptions={selectableMethods}
              type="text"
            />
          </Table.Cell>
        )}

        <Table.Cell key={getPath('date')} width={2}>
          <SingleDate
            autoComplete="off"
            displayExact={false}
            displayFlexible
            displayLabel={false}
            displaySubLabels={false}
            displayText={false}
            module="collectionMammals"
            name={getPath('date')}
            parameterKey="date"
            past
            stack={false}
          />
        </Table.Cell>
        <Table.Cell
          key={getPath('featureObservationAgent')}
          style={{ minWidth: '150px' }}
        >
          <Field
            autoComplete="off"
            component={TogglableAgentDropdownPickerSearch}
            displayLabel={false}
            module="collectionMammals"
            name={getPath('featureObservationAgent')}
          />
        </Table.Cell>
        <Table.Cell key={getPath('remarks')}>
          <Field
            autoComplete="off"
            className="transparent"
            component={Input}
            displayLabel={false}
            module="collectionMammals"
            name={getPath('remarks')}
            type="text"
          />
        </Table.Cell>
      </Table.Row>
    )
  }
}

FeatureObservationTableRow.propTypes = propTypes

export default compose(pathBuilder())(FeatureObservationTableRow)

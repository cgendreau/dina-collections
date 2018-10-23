import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import config from 'config'
import createLog from 'utilities/log'
import { Accordion } from 'coreModules/commonUi/components'
import { ALL_COLLAPSED } from 'coreModules/commonUi/constants'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import formParts from 'coreModules/form/components/parts'
import DeterminationContent from './DeterminationContent'
import DeterminationTitle from './DeterminationTitle'

const { AddButton } = formParts

const log = createLog(
  'modules:collectionMammals:MammalManager/MainColumn/RecordForm/FormRow/formParts/DeterminationsAccordion'
)

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    determinations: formValueSelector(state, 'individual.determinations'),
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  determinations: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.object,
      determinedByAgentText: PropTypes.string,
      remarks: PropTypes.string,
      taxonNameStandardized: PropTypes.string,
    })
  ),
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  determinations: [],
}

const DeterminationsAccordion = ({
  changeFieldValue,
  determinations,
  removeArrayFieldByIndex,
}) => {
  log.render()

  return (
    <React.Fragment>
      {determinations &&
        determinations.length > 0 && (
          <Grid.Column width={16}>
            <Accordion
              expandFirstItemOnMountIfEmpty
              initialActiveMode={ALL_COLLAPSED}
              items={determinations}
              renderContent={props => (
                <DeterminationContent
                  removeArrayFieldByIndex={removeArrayFieldByIndex}
                  skipRemoveDeterminationConfirmation={config.isTest}
                  {...props}
                />
              )}
              renderTitle={({ index, ...rest }) => (
                <DeterminationTitle
                  {...determinations[index] || {}}
                  {...rest}
                />
              )}
              skipRemoveDeterminationConfirmation={config.isTest}
            />
          </Grid.Column>
        )}
      <Grid.Column width={16}>
        <AddButton
          id="add-determination"
          module="collectionMammals"
          onClick={event => {
            event.preventDefault()
            changeFieldValue(
              `individual.determinations.${(determinations &&
                determinations.length) ||
                0}`,
              {}
            )
          }}
          textKey="other.addDetermination"
        />
      </Grid.Column>
    </React.Fragment>
  )
}

DeterminationsAccordion.propTypes = propTypes
DeterminationsAccordion.defaultProps = defaultProps

export default compose(connect(mapStateToProps), pathBuilder())(
  DeterminationsAccordion
)
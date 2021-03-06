import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import {
  ButtonCopyPasteField,
  ConfirmationPopup,
  Field,
  Input,
  Remarks,
  SingleDate,
} from 'coreModules/form/components'

import { TaxonNameDropdownSearch } from 'domainModules/taxon/components'
import crudSelectors from 'coreModules/crud/globalSelectors'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { TogglableAgentDropdownPickerSearch } from 'domainModules/agent/components'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentDeterminations:DeterminationContent'
)

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  handleSetInactive: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  skipRemoveDeterminationConfirmation: PropTypes.bool.isRequired,
}

class DeterminationContent extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove() {
    const { handleSetInactive, index, removeArrayFieldByIndex } = this.props
    handleSetInactive(index)
    removeArrayFieldByIndex('determinations', index)
  }

  render() {
    const {
      changeFieldValue,
      formValueSelector,
      getPath,
      handleSetInactive,
      i18n: { moduleTranslate },
      index,
      isSmallScreen,
      removeArrayFieldByIndex,
      skipRemoveDeterminationConfirmation,
    } = this.props

    const taxonIdFieldKey = getPath('taxonName.id')

    log.render()
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Row>
          <Grid.Column computer={6} mobile={16} tablet={5}>
            <Field
              autoComplete="off"
              component={TaxonNameDropdownSearch}
              module="collectionMammals"
              name={taxonIdFieldKey}
              type="text"
            />
          </Grid.Column>
          <Grid.Column computer={2} mobile={8} tablet={3}>
            <ButtonCopyPasteField
              arrowIcon={`${isSmallScreen ? 'down' : 'right'} arrow`}
              changeFieldValue={changeFieldValue}
              copyField={taxonIdFieldKey}
              fluid={!isSmallScreen}
              label={moduleTranslate({ textKey: 'other.copyToVerbatim' })}
              newValueSelector={state => {
                const taxonName = crudSelectors.taxonName.getOne(
                  state,
                  formValueSelector(state, taxonIdFieldKey)
                )
                return (
                  taxonName && taxonName.attributes && taxonName.attributes.name
                )
              }}
              pasteField={getPath('determinationVerbatim')}
            />
          </Grid.Column>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Field
              autoComplete="off"
              component={Input}
              module="collectionMammals"
              name={getPath('determinationVerbatim')}
              type="input-text"
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Column computer={6} mobile={16} tablet={8}>
          <SingleDate
            autoComplete="off"
            displayExact={false}
            displayFlexible
            displaySubLabels={false}
            displayText={false}
            displayTodayButton
            module="collectionMammals"
            name={getPath('date')}
            parameterKey="determinations.date"
            past
            stack={false}
          />
        </Grid.Column>

        <Grid.Column computer={5} mobile={16} tablet={5}>
          <Field
            autoComplete="off"
            component={TogglableAgentDropdownPickerSearch}
            module="collectionMammals"
            name={getPath('determinedByAgent')}
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Remarks}
            label="Origin remarks"
            module="collectionMammals"
            name={getPath('remarks')}
          />
        </Grid.Column>
        <Grid.Column mobile={16}>
          <Button
            onClick={event => {
              event.preventDefault()
              handleSetInactive(index)
            }}
          >
            Save
          </Button>
          {skipRemoveDeterminationConfirmation && (
            <Button
              onClick={event => {
                event.preventDefault()
                handleSetInactive(index)
                removeArrayFieldByIndex('determinations', index)
              }}
            >
              {moduleTranslate({ textKey: 'other.remove' })}
            </Button>
          )}
          {!skipRemoveDeterminationConfirmation && (
            <ConfirmationPopup
              cancelButtonText={moduleTranslate({
                capitalize: true,
                textKey: 'other.cancel',
              })}
              confirmButtonText={moduleTranslate({
                capitalize: true,
                textKey: 'other.remove',
              })}
              header={moduleTranslate({
                capitalize: true,
                textKey: 'other.removeThisDetermination',
              })}
              hideOnScroll
              onConfirm={this.handleRemove}
              text={moduleTranslate({
                capitalize: true,
                textKey: 'other.remove',
              })}
            />
          )}
        </Grid.Column>
      </Grid>
    )
  }
}

DeterminationContent.propTypes = propTypes

export default compose(
  withI18n({
    module: 'collectionMammals',
    scope: 'determination',
  }),
  pathBuilder({
    name: 'individual.determinations',
  })
)(DeterminationContent)

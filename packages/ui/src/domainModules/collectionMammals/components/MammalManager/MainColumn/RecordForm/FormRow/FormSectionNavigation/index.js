import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import objectPath from 'object-path'
import { Grid, Header, Step, Loader } from 'semantic-ui-react'

import { emToPixels } from 'coreModules/layout/utilities'
import { createModuleTranslate } from 'coreModules/i18n/components'
import collectionMammalsSelectors from 'domainModules/collectionMammals/globalSelectors'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const activeStyle = {
  backgroundColor: 'rgb(245, 245, 244)',
  borderColor: '#1e8c45',
  cursor: 'pointer',
  margin: 0,
}

const inactiveStyle = {
  background: 'none',
  borderColor: '#fff',
  cursor: 'pointer',
  margin: 0,
}

const mapStateToProps = (state, { formName, formValueSelector }) => {
  return {
    catalogNumber: collectionMammalsSelectors.createGetCatalogNumber(formName)(
      state
    ),
    taxonNameId: formValueSelector(
      state,
      'individual.taxonInformation.curatorialTaxonName.id'
    ),
  }
}

const propTypes = {
  activeFormSectionIndex: PropTypes.number,
  availableHeight: PropTypes.number.isRequired,
  catalogNumber: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onSetActiveFormSection: PropTypes.func.isRequired,
  onShowAllFormSections: PropTypes.func.isRequired,
  sectionSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  showAllFormSections: PropTypes.bool.isRequired,
  taxonName: PropTypes.shape({
    attributes: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
}
const defaultProps = {
  activeFormSectionIndex: undefined,
  catalogNumber: undefined,
  taxonName: undefined,
}

export class FormSectionNavigation extends PureComponent {
  renderSection(index, name) {
    const {
      activeFormSectionIndex,
      onSetActiveFormSection: handleSetActiveFormSection,
    } = this.props

    return (
      <Step
        active={index === activeFormSectionIndex}
        key={index}
        onClick={event => handleSetActiveFormSection(event, index)}
        style={{ width: emToPixels(21.875) }}
      >
        <Step.Content>
          <Step.Title>
            <ModuleTranslate capitalize textKey={`formSectionTitles.${name}`} />
          </Step.Title>
          <Step.Description>
            <ModuleTranslate
              capitalize
              textKey={`formSectionDescriptions.${name}`}
            />
          </Step.Description>
        </Step.Content>
      </Step>
    )
  }

  render() {
    const {
      availableHeight: height,
      catalogNumber,
      loading,
      onShowAllFormSections: handleShowAllFormSections,
      sectionSpecs,
      showAllFormSections,
      taxonName,
    } = this.props

    const curatorialTaxonName = objectPath.get(taxonName, 'attributes.name')

    return (
      <Grid padded style={{ height, overflow: 'auto' }}>
        <Grid.Column>
          <Header
            as="h1"
            block
            style={{
              background: 'none',
              borderColor: '#fff',
            }}
          >
            {loading && <Loader active inline size="tiny" />}
            {!loading &&
              (catalogNumber || (
                <ModuleTranslate textKey="headers.newSpecimen" />
              ))}
            {curatorialTaxonName && (
              <Header.Subheader size="large">
                <em>{curatorialTaxonName}</em>
              </Header.Subheader>
            )}
          </Header>

          <Step.Group size="small" style={{ marginTop: '-10px' }} vertical>
            {sectionSpecs.map(({ name }, index) => {
              return this.renderSection(index, name)
            })}
          </Step.Group>

          {handleShowAllFormSections && (
            <Header
              block
              onClick={handleShowAllFormSections}
              size="small"
              style={showAllFormSections ? activeStyle : inactiveStyle}
              sub
            >
              Show all
            </Header>
          )}
        </Grid.Column>
      </Grid>
    )
  }
}

FormSectionNavigation.propTypes = propTypes
FormSectionNavigation.defaultProps = defaultProps

export default compose(
  connect(mapStateToProps),
  createGetItemById({
    idPath: 'taxonNameId',
    itemKey: 'taxonName',
    resource: 'taxonName',
  })
)(FormSectionNavigation)

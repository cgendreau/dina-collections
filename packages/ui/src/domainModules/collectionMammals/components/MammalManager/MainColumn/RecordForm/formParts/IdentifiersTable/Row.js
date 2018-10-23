import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Icon, Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { DropdownSearch, Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

const log = createLog(
  'modules:collectionMammals:MammalManager/MainColumn/RecordForm/FormRow/formParts/IdentifiersTable/Row'
)

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  getTranslationPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  identifier: PropTypes.shape({
    id: PropTypes.string,
    identifierType: PropTypes.object,
    remarks: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  identifierTypeOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  index: PropTypes.number.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}

class IdentifiersTableRow extends PureComponent {
  componentWillMount() {
    const { changeFieldValue, getPath, identifier } = this.props
    changeFieldValue(getPath('identifier.id'), identifier.id)
  }

  render() {
    const {
      identifierTypeOptions,
      getPath,
      getTranslationPath,
      i18n: { moduleTranslate },
      index,
      removeArrayFieldByIndex,
    } = this.props

    log.render()
    return (
      <Grid textAlign="left" verticalAlign="middle">
        <Grid.Column width={6}>
          <Field
            autoComplete="off"
            className="transparent"
            component={DropdownSearch}
            displayLabel={false}
            module="collectionMammals"
            name={getPath('identifierType.id')}
            options={identifierTypeOptions}
            placeholder={moduleTranslate({
              capitalize: true,
              textKey: 'other.selectIdentifierType',
            })}
            type="dropdown-search-local"
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Field
            autoComplete="off"
            className="transparent"
            component={Input}
            displayLabel={false}
            fluid
            module="collectionMammals"
            name={getPath('value')}
            placeholder={moduleTranslate({
              capitalize: true,
              textKey: 'other.addIdentifierOrIdentifiers',
            })}
            type="text"
          />
        </Grid.Column>
        <Grid.Column width={2}>
          <Icon
            name="trash"
            onClick={event => {
              event.preventDefault()
              removeArrayFieldByIndex(getTranslationPath(), index)
            }}
            size="large"
            style={{ cursor: 'pointer' }}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

IdentifiersTableRow.propTypes = propTypes

export default compose(
  withI18n({ module: 'collectionMammals' }),
  pathBuilder()
)(IdentifiersTableRow)
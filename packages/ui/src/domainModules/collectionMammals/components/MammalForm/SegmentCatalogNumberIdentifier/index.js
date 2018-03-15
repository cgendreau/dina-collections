import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { Checkbox, Field } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import CatalogNumberInput from '../CatalogNumberInput'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentCatalogNumberIdentifier'
)

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'identifiers',
})

const propTypes = {
  editMode: PropTypes.bool.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
}

class SegmentCatalogNumberIdentifier extends PureComponent {
  render() {
    const { editMode, formValueSelector, getPath } = this.props
    log.render()
    return (
      <Segment color="green">
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Column width={16}>
            <Field
              autoComplete="off"
              component={CatalogNumberInput}
              editMode={editMode}
              formValueSelector={formValueSelector}
              helpText={<ModuleTranslate textKey="sixOrEightDigits" />}
              label={<ModuleTranslate textKey="catalogNumber" />}
              module="collectionMammals"
              name={getPath('identifier.value')}
              type="text"
            />
          </Grid.Column>

          <Grid.Column computer={3} mobile={16}>
            <Field
              autoComplete="off"
              component={Checkbox}
              label={<ModuleTranslate textKey="isPublic" />}
              module="collectionMammals"
              name={getPath('publishRecord')}
              type="checkbox"
            />
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

SegmentCatalogNumberIdentifier.propTypes = propTypes

export default pathBuilder({ name: 'identifiers.0' })(
  SegmentCatalogNumberIdentifier
)

import React, { PureComponent } from 'react'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'
import { higherOrderComponents } from '../../../queryBuilder'

const WrappedMultipleChoiceCheckboxesField = higherOrderComponents.createFieldHoc()(
  MultipleChoiceCheckboxesField
)

class BonesFilterForm extends PureComponent {
  render() {
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            component={WrappedMultipleChoiceCheckboxesField}
            displayCount
            label="Bones"
            name="bones.bones"
            resource="searchSpecimen"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default BonesFilterForm

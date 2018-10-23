import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { defaultValidate } from 'coreModules/form/components/fields/Date/SingleDate'
import formParts from 'coreModules/form/components/parts'
import agentParts from 'domainModules/agent/components/formParts'

const { SingleDate } = formParts
const { AgentDropdownPickerSearch } = agentParts

const propTypes = {
  baseName: PropTypes.string.isRequired,
}

const Fields = ({ baseName }) => {
  return (
    <React.Fragment>
      <Grid.Column width={16}>
        <Field
          autoComplete="off"
          component={AgentDropdownPickerSearch}
          module="collectionMammals"
          name={`${baseName}.agent`}
          resultSuffix="(agent)"
          type="input-text"
        />
      </Grid.Column>
      <Grid.Column width={16}>
        <Field
          autoComplete="off"
          component={SingleDate}
          label="Condition"
          module="collectionMammals"
          name={`${baseName}.date`}
          validate={defaultValidate}
        />
      </Grid.Column>
    </React.Fragment>
  )
}

Fields.propTypes = propTypes

export default Fields
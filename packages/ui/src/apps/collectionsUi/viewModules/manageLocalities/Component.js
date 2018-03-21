import { Grid } from 'semantic-ui-react'
import { Translate } from 'coreModules/i18n/components'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import React from 'react'

const ManageLocalities = () => (
  <PageTemplate>
    <h1>
      <Translate textKey="modules.manageLocalities.title" />
    </h1>
    <Grid textAlign="left" verticalAlign="middle" />
  </PageTemplate>
)

export default ManageLocalities

/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import { Segment } from 'semantic-ui-react'

import DefaultWrapper from './DefaultWrapper'

storiesOf('coreModules/bootstrap/DefaultWrapper', module)
  .addDecorator(createStoryDecorator())
  .add(
    'Default',
    withInfo({ propTables: [DefaultWrapper], propTablesExclude: [Segment] })(
      () => {
        return (
          <div>
            <DefaultWrapper>
              <Segment>
                Wrapped content (DefaultWrapper does nothing but render
                children)
              </Segment>
            </DefaultWrapper>
            <p>After DefaultWrapper</p>
          </div>
        )
      }
    )
  )

/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions'
import withInfo from 'utilities/test/customStorybookWithInfo'

import NavigationSidebar from './index'

const NAVIGATION_SIDEBAR_ITEMS = [
  {
    exact: true,
    icon: 'home',
    name: 'home',
    path: '/app',
  },
  {
    exact: true,
    icon: 'plus',
    name: 'registerMammal',
    path: '/app/mammals/register',
  },
  {
    exact: true,
    icon: 'search',
    name: 'lookupMammals',
    path: '/app/mammals/lookup',
  },
  {
    exact: true,
    icon: 'setting',
    name: 'settings',
    path: '/app/settings',
    push: true,
  },
]

storiesOf('coreModules/commonUi/NavigationSidebar', module)
  .addDecorator(createStoryDecorator({ wrap: false }))
  .add(
    'Default',
    withInfo({
      maxPropsIntoLine: 3,
    })(() => {
      return (
        <NavigationSidebar
          logout={action('logout')}
          navigationItems={NAVIGATION_SIDEBAR_ITEMS}
        />
      )
    })
  )

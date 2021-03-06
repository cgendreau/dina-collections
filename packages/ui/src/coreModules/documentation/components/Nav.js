import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import schemaInterface from 'common/es5/schemaInterface'

import i18nSelectors from 'coreModules/i18n/globalSelectors'
import { NavigationSidebar } from 'coreModules/layout/components'

import createModelLink from '../utilities/createModelLink'
import getAvailableSchemaVersions from '../utilities/getAvailableSchemaVersions'

const specification = schemaInterface.getOpenApiSpec()
const { schemas } = specification.components

const availableVersions = getAvailableSchemaVersions()

const models = Object.keys(schemas)
  .map(key => {
    return {
      ...schemas[key],
      key,
    }
  })
  .filter(model => {
    if (model['x-internal']) {
      return false
    }
    return model['x-modelType'] === 'model'
  })

const mapStateToProps = state => {
  return {
    markdownKeys: i18nSelectors.getMarkdownKeysByPath(state, 'docs.overview'),
  }
}

const propTypes = {
  markdownKeys: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      schemaVersion: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

class Nav extends Component {
  render() {
    const { match: { params: { schemaVersion: version } } } = this.props

    const markdownNavItems = this.props.markdownKeys.map(markdownKey => {
      return {
        exact: true,
        name: markdownKey,
        path: `/docs/${version}/${markdownKey}`,
        translate: false,
      }
    })

    const versionNavItems = availableVersions.map(availableVersion => {
      return {
        exact: false,
        name: availableVersion,
        path: `/docs/${availableVersion}`,
        translate: false,
      }
    })

    const modelCategories = models
      .map(model => {
        return {
          category: model['x-category'],
          exact: false,
          name: model.key,
          path: createModelLink({ modelName: model.key, version }),
          translate: false,
        }
      })
      .reduce((obj, modelNavItem) => {
        const { category } = modelNavItem
        let group = obj[category] || []
        group = [...group, modelNavItem]
        return {
          ...obj,
          [category]: group,
        }
      }, {})

    const markdownNavItemsGroup = {
      items: markdownNavItems,
      name: 'overview',
    }

    const versionItemsGroup = {
      items: versionNavItems,
      name: 'versions',
    }

    const modelItemGroups = Object.keys(modelCategories).map(category => {
      return {
        items: modelCategories[category],
        name: category,
        translate: false,
      }
    })

    const navigationItems = [
      markdownNavItemsGroup,
      versionItemsGroup,
      ...modelItemGroups,
    ]

    return (
      <NavigationSidebar
        displayHome
        displayLogout={false}
        navigationItems={navigationItems}
        nested
        width={180}
      />
    )
  }
}

Nav.propTypes = propTypes

export default compose(connect(mapStateToProps))(Nav)

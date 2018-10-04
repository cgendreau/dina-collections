import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Menu } from 'semantic-ui-react'

const propTypes = {
  createItemActive: PropTypes.bool.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  itemEnabled: PropTypes.bool.isRequired,
  onFormTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onListTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onTreeTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  tableActive: PropTypes.bool.isRequired,
  treeActive: PropTypes.bool.isRequired,
  treeEnabled: PropTypes.bool.isRequired,
}

export class ResultOptionsBar extends Component {
  render() {
    const {
      createItemActive,
      editItemActive,
      itemEnabled,
      onFormTabClick: handleFormTabClick,
      onListTabClick: handleListTabClick,
      onTreeTabClick: handleTreeTabClick,
      tableActive,
      treeActive,
      treeEnabled,
    } = this.props

    return (
      <Menu attached="top" tabular>
        {itemEnabled && (
          <Menu.Item
            active={createItemActive || editItemActive}
            name="form"
            onClick={event => handleFormTabClick(event)}
          >
            <Icon name="wordpress forms" />
          </Menu.Item>
        )}

        {treeEnabled && (
          <Menu.Item
            active={treeActive}
            name="form"
            onClick={event => handleTreeTabClick(event)}
          >
            <Icon name="sitemap" />
          </Menu.Item>
        )}

        <Menu.Item
          active={tableActive}
          name="table"
          onClick={event => handleListTabClick(event)}
        >
          <Icon name="table" />
        </Menu.Item>
      </Menu>
    )
  }
}

ResultOptionsBar.propTypes = propTypes

export default ResultOptionsBar
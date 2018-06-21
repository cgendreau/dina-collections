import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Icon, Menu, Popup } from 'semantic-ui-react'

const propTypes = {
  onExportCsv: PropTypes.func.isRequired,
  onFormTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onSettingClick: PropTypes.func.isRequired,
  onTableTabClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
}

export class ResultOptionsBar extends Component {
  render() {
    const {
      onExportCsv: handleExportToCsv,
      onFormTabClick: handleFormTabClick,
      onSettingClick: handleSettingClick,
      onTableTabClick: handleTableTabClick,
    } = this.props

    return (
      <Menu attached="top" tabular>
        <Menu.Item
          active={!handleFormTabClick}
          disabled={!handleFormTabClick}
          name="form"
          onClick={event => handleFormTabClick(event)}
        >
          <Icon name="wordpress forms" size="large" />
        </Menu.Item>
        <Menu.Item
          active={!handleTableTabClick}
          disabled={!handleTableTabClick}
          name="table"
          onClick={event => handleTableTabClick(event)}
        >
          <Icon name="table" size="large" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column>
              <Popup
                content={
                  <Button
                    content="Export result to CSV"
                    onClick={event => handleExportToCsv(event)}
                  />
                }
                on="click"
                trigger={<Icon name="share" size="large" />}
              />
            </Grid.Column>
          </Grid>

          <Menu.Item>
            <Icon
              name="setting"
              onClick={event => handleSettingClick(event)}
              size="large"
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

ResultOptionsBar.propTypes = propTypes

export default ResultOptionsBar
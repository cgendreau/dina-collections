import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Label, List } from 'semantic-ui-react'

import {
  ITEM_CLICK,
  SET_ITEM_CREATE_CHILD,
  SET_ITEM_EDIT,
  SET_ITEM_INSPECT,
} from 'coreModules/crudBlocks/constants'
import { CONTINENT, COUNTRY, DISTRICT, PROVINCE } from '../../../constants'

const propTypes = {
  activeLocalityId: PropTypes.string,
  curatedLocality: PropTypes.object.isRequired,
  cursorFocus: PropTypes.bool,
  disableEdit: PropTypes.bool.isRequired,
  displayNavigationButtons: PropTypes.bool.isRequired,
  onInteraction: PropTypes.func.isRequired,
}

const defaultProps = {
  activeLocalityId: '',
  cursorFocus: false,
}

const groupColorMap = {
  [CONTINENT]: 'violet',
  [COUNTRY]: 'teal',
  [DISTRICT]: 'purple',
  [PROVINCE]: 'blue',
}

class ListItem extends Component {
  render() {
    const {
      activeLocalityId,
      curatedLocality,
      cursorFocus,
      disableEdit,
      displayNavigationButtons,
      onInteraction,
    } = this.props

    const style = cursorFocus
      ? {
          borderLeft: '3px solid black',
        }
      : {}

    return (
      <List.Item
        active={activeLocalityId === curatedLocality.id}
        key={curatedLocality.id}
        onClick={event => {
          event.preventDefault()
          onInteraction(ITEM_CLICK, {
            itemId: curatedLocality.id,
          })
        }}
        style={style}
      >
        <List.Content floated="right">
          <Label
            color={groupColorMap[curatedLocality.group]}
            style={{ marginRight: 20 }}
          >
            {curatedLocality.group}
          </Label>
          {displayNavigationButtons &&
            !disableEdit && (
              <Button
                icon
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  onInteraction(SET_ITEM_EDIT, {
                    itemId: curatedLocality.id,
                  })
                }}
                size="tiny"
              >
                <Icon name="edit" />
              </Button>
            )}
          {displayNavigationButtons && (
            <Button
              icon
              onClick={event => {
                event.preventDefault()
                event.stopPropagation()
                onInteraction(SET_ITEM_INSPECT, {
                  itemId: curatedLocality.id,
                })
              }}
              size="tiny"
            >
              <Icon name="folder open" />
            </Button>
          )}
          {displayNavigationButtons && (
            <Button
              color="orange"
              onClick={event => {
                event.preventDefault()
                event.stopPropagation()
                onInteraction(SET_ITEM_CREATE_CHILD, {
                  itemId: curatedLocality.id,
                })
              }}
              size="tiny"
              style={{ marginLeft: 10 }}
            >
              Add child
            </Button>
          )}
        </List.Content>

        <List.Content>
          <h3>{curatedLocality.name}</h3>
        </List.Content>
      </List.Item>
    )
  }
}

ListItem.propTypes = propTypes
ListItem.defaultProps = defaultProps

export default ListItem

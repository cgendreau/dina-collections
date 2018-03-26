import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'
import { Block } from 'coreModules/layout/components'
import LocalityList from '../../../LocalityList'
import LocalityTree from '../../../LocalityTree'
import ActionBar from './ActionBar'

const propTypes = {
  collectionBlockType: PropTypes.string.isRequired,
  layoutMode: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
}

const CollectionBlock = ({
  collectionBlockType,
  layoutMode,
  onInteraction,
  ...rest
}) => {
  let content
  if (collectionBlockType === 'list') {
    content = <LocalityList onInteraction={onInteraction} {...rest} />
  }
  if (collectionBlockType === 'tree') {
    content = <LocalityTree onInteraction={onInteraction} {...rest} />
  }

  return (
    <Block>
      <Block.Header title="Localities">
        <Button.Group floated="right">
          {layoutMode === 'split' && (
            <Button
              icon
              onClick={event => {
                event.preventDefault()
                onInteraction('layout-single-collection')
              }}
              size="tiny"
            >
              <Icon name="stop" />
            </Button>
          )}
          {layoutMode === 'single' && (
            <Button
              icon
              onClick={event => {
                event.preventDefault()
                onInteraction('layout-split')
              }}
              size="tiny"
            >
              <Icon name="pause" />
            </Button>
          )}
        </Button.Group>
      </Block.Header>
      <Block.Content
        preContent={
          <ActionBar
            collectionBlockType={collectionBlockType}
            onInteraction={onInteraction}
          />
        }
      >
        {content}
      </Block.Content>
    </Block>
  )
}

CollectionBlock.propTypes = propTypes

export default CollectionBlock

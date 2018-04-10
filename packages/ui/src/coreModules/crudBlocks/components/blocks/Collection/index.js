import React from 'react'
import PropTypes from 'prop-types'
import { Block } from 'coreModules/layout/components'
import ActionBar from './ActionBar'
import Header from './Header'

const propTypes = {
  collectionBlockType: PropTypes.string.isRequired,
  displayNavigationButtons: PropTypes.bool,
  dropdownFilterOptions: PropTypes.array.isRequired,
  getAncestorsByParentId: PropTypes.func.isRequired,
  layoutMode: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  renderList: PropTypes.func,
  renderTree: PropTypes.func,
}

const defaultProps = {
  displayNavigationButtons: true,
  renderList: undefined,
  renderTree: undefined,
}

const CollectionBlock = ({
  collectionBlockType,
  displayNavigationButtons,
  dropdownFilterOptions,
  getAncestorsByParentId,
  layoutMode,
  name,
  onInteraction,
  renderList,
  renderTree,
  ...rest
}) => {
  let content
  if (collectionBlockType === 'list' && renderList) {
    content = renderList({
      displayNavigationButtons,
      name,
      onInteraction,
      ...rest,
    })
  }
  if (collectionBlockType === 'tree' && renderTree) {
    content = renderTree({
      displayNavigationButtons,
      name,
      onInteraction,
      ...rest,
    })
  }

  return (
    <Block>
      <Header
        layoutMode={layoutMode}
        onInteraction={onInteraction}
        title={`Collection - ${collectionBlockType}`}
      />
      <Block.Content
        preContent={
          <ActionBar
            collectionBlockType={collectionBlockType}
            displayNavigationButtons={displayNavigationButtons}
            dropdownFilterOptions={dropdownFilterOptions}
            getAncestorsByParentId={getAncestorsByParentId}
            name={name}
            onInteraction={onInteraction}
          />
        }
      >
        {content}
      </Block.Content>
    </Block>
  )
}

CollectionBlock.defaultProps = defaultProps
CollectionBlock.propTypes = propTypes

export default CollectionBlock

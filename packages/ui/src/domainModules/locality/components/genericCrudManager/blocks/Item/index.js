import React from 'react'
import PropTypes from 'prop-types'
import CreateBlock from './Create'
import EditBlock from './Edit'
import InspectBlock from './Inspect'

const propTypes = {
  itemBlockType: PropTypes.string.isRequired,
  renderCreateBlockChild: PropTypes.func,
  renderEditBlockChild: PropTypes.func,
  renderInspectBlockChild: PropTypes.func,
}
const defaultProps = {
  renderCreateBlockChild: undefined,
  renderEditBlockChild: undefined,
  renderInspectBlockChild: undefined,
}

const ItemBlock = ({
  itemBlockType,
  renderCreateBlockChild,
  renderEditBlockChild,
  renderInspectBlockChild,
  ...rest
}) => {
  if (itemBlockType === 'create' && renderCreateBlockChild) {
    return (
      <CreateBlock
        itemBlockType={itemBlockType}
        renderChild={renderCreateBlockChild}
        {...rest}
      />
    )
  }

  if (itemBlockType === 'edit' && renderEditBlockChild) {
    return (
      <EditBlock
        itemBlockType={itemBlockType}
        renderChild={renderEditBlockChild}
        {...rest}
      />
    )
  }
  if (itemBlockType === 'inspect' && renderInspectBlockChild) {
    return (
      <InspectBlock
        itemBlockType={itemBlockType}
        renderChild={renderInspectBlockChild}
        {...rest}
      />
    )
  }
  return null
}

ItemBlock.propTypes = propTypes
ItemBlock.defaultProps = defaultProps

export default ItemBlock

import React from 'react'
import PropTypes from 'prop-types'
import CreateBlock from './Create'
import EditBlock from './Edit'
import InspectBlock from './Inspect'

const propTypes = {
  itemBlockType: PropTypes.string.isRequired,
}

const ItemBlock = ({ itemBlockType, ...rest }) => {
  if (itemBlockType === 'create') {
    return <CreateBlock {...rest} />
  }

  if (itemBlockType === 'edit') {
    return <EditBlock {...rest} />
  }
  if (itemBlockType === 'inspect') {
    return <InspectBlock {...rest} />
  }
  return null
}

ItemBlock.propTypes = propTypes

export default ItemBlock

import React, { Component } from 'react'
import Rule from './Rule'
import Condition from './Condition'

class Node extends Component {
  render() {
    const { node } = this.props
    const { type } = node
    console.log('node', node)
    if (type === 'rule') {
      return <Rule rule={node} />
    }

    if (type === 'condition') {
      return <Condition condition={node} />
    }

    return null
  }
}

export default Node

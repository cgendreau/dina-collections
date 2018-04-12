import React, { Component } from 'react'
import Node from './Node'
import { injectNode } from './Rule'

injectNode(Node)

class Tree extends Component {
  render() {
    const { treeRoot } = this.props
    return <Node node={treeRoot} />
  }
}

export default Tree

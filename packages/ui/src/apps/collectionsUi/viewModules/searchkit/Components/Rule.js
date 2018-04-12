import React, { Component } from 'react'

let Node
export const injectNode = InjectNode => {
  Node = InjectNode
}

class Rule extends Component {
  render() {
    const { rule } = this.props

    return (
      <div>
        <span>Rule {rule.ruleType}</span>
        <div style={{ marginLeft: 20 }}>
          {(rule.content || []).map(item => {
            return <Node node={item} />
          })}
        </div>
        <button>New condition</button>
        <button>New Rule</button>
      </div>
    )
  }
}

export default Rule

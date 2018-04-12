import React, { Component } from 'react'
import Tree from './Components/Tree'
// import PropTypes from 'prop-types'

import { Icon } from 'semantic-ui-react'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

// const Item = props => {
//   return (
//     <div style={{ marginBottom: 20, widht: '100%', float: 'left' }}>
//       {props && JSON.stringify(props)}
//     </div>
//   )
// }

// class Condition extends Component {
//   render() {
//     const { condition } = this.props
//     console.log('condition', condition)
//     return <div>Condition {JSON.stringify(condition)}</div>
//   }
// }

// class Rule extends Component {
//   render() {
//     const { rule } = this.props

//     return (
//       <div>
//         <span>Rule {rule.ruleType}</span>
//         <div style={{ marginLeft: 20 }}>
//           {(rule.content || []).map(item => {
//             return <Node node={item} />
//           })}
//         </div>
//         <button>New condition</button>
//         <button>New Rule</button>
//       </div>
//     )
//   }
// }

// class Node extends Component {
//   render() {
//     const { node } = this.props
//     const { type } = node
//     console.log('node', node)
//     if (type === 'rule') {
//       return <Rule rule={node} />
//     }

//     if (type === 'condition') {
//       return <Condition condition={node} />
//     }

//     return null
//   }
// }

// class Tree extends Component {
//   render() {
//     const { treeRoot } = this.props
//     return <Node node={treeRoot} />
//   }
// }

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tree: {
        type: 'rule',
        ruleType: 'and',
        content: [
          {
            type: 'condition',
            conditionType: 'identifierCatalogNumber',
            params: {
              value: '1234',
            },
          },
        ],
      },
    }
  }
  render() {
    const tree = this.state.tree
    return (
      <PageTemplate>
        <Tree treeRoot={tree} />
      </PageTemplate>
    )
  }
}

// Settings.propTypes = propTypes

export default Test

// <RefinementListFilter
//   field="actors.raw"
//   id="actors"
//   operator="AND"
//   size={10}
//   title="Actors"
// />

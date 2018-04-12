import React, { Component } from 'react'

class Condition extends Component {
  render() {
    const { condition } = this.props
    console.log('condition', condition)
    return <div>Condition {JSON.stringify(condition)}</div>
  }
}

export default Condition

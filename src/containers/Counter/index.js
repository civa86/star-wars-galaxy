import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { increment, decrement } from '../../reducers/counter'

class Counter extends Component {
  render() {
    const { counter, increment, decrement } = this.props
    return (
      <div>
        <h1>Counter</h1>
        <div>{counter.value}</div>
        <button onClick={() => increment()}>+</button>
        <button onClick={() => decrement()}>-</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  counter: state.counter
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      decrement
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Counter)

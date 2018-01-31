import React from 'react'

class ThemeColor extends React.Component {
  setClassName(color) {
    const elem = document.querySelector('html')
    elem.classList.remove('light', 'dark')
    elem.classList.add(color)
  }

  componentDidMount() {
    this.setClassName(this.props.color)
  }
  componentWillReceiveProps(nextProps) {
    this.setClassName(nextProps.color)
  }
  render() {
    return this.props.children
  }
}

export default ThemeColor

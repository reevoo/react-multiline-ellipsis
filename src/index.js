import { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'

export const ellipsis = (ComposedComponent, maxLines, ellipsis = '...') => {
  class Ellipsis extends Component {

    constructor (props) {
      super(props)

      this.checkEllipsis = this.checkEllipsis.bind(this)
      this.getDOMNodeProperty = this.getDOMNodeProperty.bind(this)
      this.startsWith = this.startsWith.bind(this)

      this.state = {
        text: `${props.text}`,
      }
    }

    componentDidMount () {
      this.checkEllipsis()
    }

    componentDidUpdate () {
      this.checkEllipsis()
    }

    getDOMNodeProperty (node, property) {
      return document.defaultView.getComputedStyle(node, null)
        .getPropertyValue(property)
    }

    checkEllipsis () {
      const node = findDOMNode(this.refs.component)
      const lineHeight = this.getDOMNodeProperty(node, 'line-height').replace('px', '')
      const height = this.getDOMNodeProperty(node, 'height').replace('px', '')

      const numberOfLines = height / lineHeight

      if (numberOfLines > maxLines) {
        const currentText = this.state.text
        let ellipsedText = currentText.substring(0, currentText.lastIndexOf(' '))
        if (this.startsWith(ellipsis, ' ')) {
          ellipsedText = ellipsedText.substring(0, ellipsedText.lastIndexOf(' '))
        }

        this.setState({ text: `${ellipsedText}${ellipsis}` })
      }
    }

    startsWith (str, textToSearch) {
      return str.startsWith
        ? str.startsWith(textToSearch)
        : str.indexOf(textToSearch, 0) === 0
    }

    render () {
      return <ComposedComponent ref='component' { ...this.props } { ...this.state } />
    }

  }

  Ellipsis.propTypes = {
    text: PropTypes.string.isRequired,
  }

  return Ellipsis
}

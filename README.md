# react-multiline-ellipsis
React higher order component to create multiline ellipsed boxes.

Adds an ellipsis text (and hides the rest) if the original text is longer than the desired number of lines.

## API

### ellipsis(componentClass, numberOfLines \[, ellipsisString\])

| Parameter |  Type | Description |
| -------------- | ------ | --------------- |
| componentClass       | Class Name | The Component class name |
| numberOfLines     | number | The number of text lines that we want our component to have |
| ellipsisString (Optional)    | string | The string that we want to use as an ellipsis (defaults to '...') |

This example shows a box that is going to get an ellipsis ' (...)' if the text takes more than 3 lines.

```javascript
import React, { Component, PropTypes } from 'react'
import { ellipsis } from 'react-multiline-ellipsis'

class MyTextBox extends Component {
  render () {
    return <div>{this.props.text}</div>
  }
}

MyTextBox.propTypes = {
  text: PropTypes.string.isRequired,
}

export default ellipsis(MyTextBox, 3, ' (...)')
```

**Notes:**
- In order for this to work, the html container of the text shouldn't have any property that sets a height. So no `height, max-height, min-height`, etc.
- Sometimes, depending on the amount of JavaScript on the page, it might be flaky and not execute. Most of the time this is not an issue, but it should be fixed at some point.

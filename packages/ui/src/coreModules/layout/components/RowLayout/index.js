import React, { Component } from 'react'
import PropTypes from 'prop-types'

import extractProps from 'utilities/extractProps'

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  renderRow: PropTypes.func,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      key: PropTypes.string.isRequired,
      renderRow: PropTypes.func,
    }).isRequired
  ),
  wrapperClassNames: PropTypes.string,
  wrapperId: PropTypes.string,
  wrapperStyle: PropTypes.object,
}
const defaultProps = {
  renderRow: undefined,
  rows: undefined,
  wrapperClassNames: undefined,
  wrapperId: undefined,
  wrapperStyle: undefined,
}

class RowLayout extends Component {
  render() {
    const {
      availableHeight,
      renderRow,
      rows,
      wrapperClassNames,
      wrapperId,
      wrapperStyle,
    } = this.props

    if (!rows || !rows.length) {
      return null
    }

    return (
      <div
        className={wrapperClassNames}
        id={wrapperId}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: `${availableHeight}px`,
          overflow: 'hidden',
          ...(wrapperStyle || {}),
        }}
      >
        {rows.map((rowSpec, index) => {
          const { extractedProps: rowProps, rest } = extractProps({
            keys: ['classNames', 'id', 'height', 'key', 'renderRow', 'style'],
            props: rowSpec,
          })

          return (
            <div
              className={rowProps.classNames}
              id={rowProps.id}
              key={rowProps.key || index}
              style={
                rowProps.height
                  ? {
                      flex: 'none',
                      float: 'left',
                      height: rowProps.height,
                      ...(rowProps.style || {}),
                    }
                  : {
                      flex: 'auto',
                      float: 'left',
                      minHeight: 0, // needed to fix flexbox issue, kind of like: https://css-tricks.com/flexbox-truncated-text/
                      ...(rowProps.style || {}),
                    }
              }
            >
              {!rowProps.renderRow &&
                renderRow &&
                renderRow(rowProps.key, { ...this.props, ...rest })}
              {rowProps.renderRow &&
                rowProps.renderRow({ ...this.props, ...rest })}
            </div>
          )
        })}
      </div>
    )
  }
}

RowLayout.propTypes = propTypes
RowLayout.defaultProps = defaultProps

export default RowLayout

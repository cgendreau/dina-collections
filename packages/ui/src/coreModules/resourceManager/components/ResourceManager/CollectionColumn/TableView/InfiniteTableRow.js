import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'
import objectPath from 'object-path'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'

const propTypes = {
  background: PropTypes.string.isRequired,
  itemId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  nestedItem: PropTypes.object,
  onClickRow: PropTypes.func.isRequired,
  rowNumber: PropTypes.number.isRequired,
  tableColumnSpecifications: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
}

const defaultProps = {
  itemId: undefined,
  nestedItem: undefined,
}

const InfiniteTableRow = ({
  background,
  itemId,
  nestedItem,
  onClickRow,
  rowNumber,
  tableColumnSpecifications,
  width,
}) => {
  if (!nestedItem) {
    return (
      <Grid.Row style={{ height: 43, width }}>
        <Grid.Column style={{ width: 80 }} textAlign="right">
          {rowNumber}
        </Grid.Column>
        <Grid.Column style={{ width: 60 }}>
          <Dimmer active inverted>
            <Loader inverted size="mini" />
          </Dimmer>
        </Grid.Column>
      </Grid.Row>
    )
  }

  return (
    <Grid.Row
      onClick={event => {
        event.preventDefault()
        onClickRow(rowNumber, itemId)
      }}
      style={{ background, height: 43, width }}
    >
      <Grid.Column key="rowNumber" style={{ width: 80 }} textAlign="right">
        {rowNumber}
      </Grid.Column>
      {tableColumnSpecifications.map(
        ({ buildText, fieldPath, width: columnWidth }) => {
          let value = objectPath.get(nestedItem, fieldPath)

          const runBuildText =
            value && buildText && (Array.isArray(value) ? value.length : true)

          if (runBuildText) {
            value = buildText({ nestedItem, objectPath, value })
          }

          if (Array.isArray(value)) {
            value = value.join('; ')
          }

          return (
            <Grid.Column
              key={fieldPath}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: columnWidth,
              }}
            >
              {value}
            </Grid.Column>
          )
        }
      )}
    </Grid.Row>
  )
}

InfiniteTableRow.propTypes = propTypes
InfiniteTableRow.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    refresh: false,
    shouldFetch: false,
  })
)(InfiniteTableRow)

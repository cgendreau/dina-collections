import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import memoize from 'memoize-one'
import {
  ColumnLayout,
  InformationSidebar,
  RowLayout,
} from 'coreModules/layout/components'
import { createResourceManagerWrapper } from 'coreModules/resourceManager/higherOrderComponents'
import layoutSelectors from 'coreModules/layout/globalSelectors'
import extractProps from 'utilities/extractProps'

import CollectionColumn from './CollectionColumn'
import CreateItemColumn from './CreateItemColumn'
import EditItemColumn from './EditItemColumn'
import FilterColumn from './FilterColumn'
import PickerHeader from './picker/Header'
import PickerActionBar from './picker/ActionBar'

const TOP_NAVBAR_HEIGHT = 41
const PICKER_MODAL_PADDING = 40
const PICKER_HEADER_HEIGHT = 40
const PICKER_ACTION_BAR_HEIGHT = 60

const mapStateToProps = (state, { isPicker, windowHeight }) => {
  const availableHeight = isPicker
    ? windowHeight - PICKER_MODAL_PADDING
    : windowHeight - TOP_NAVBAR_HEIGHT

  const columnHeight = isPicker
    ? availableHeight - PICKER_HEADER_HEIGHT - PICKER_ACTION_BAR_HEIGHT
    : availableHeight

  return {
    availableHeight,
    columnHeight,
    rightSidebarIsOpen: layoutSelectors.getRightSidebarIsOpen(state),
  }
}

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  columnHeight: PropTypes.number.isRequired,
  createItemActive: PropTypes.bool.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  editItemColumnWidth: PropTypes.number,
  filterActive: PropTypes.bool.isRequired,
  focusedItemId: PropTypes.string,
  isPicker: PropTypes.bool,
  itemFetchOptions: PropTypes.object.isRequired,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
  renderEditForm: PropTypes.func.isRequired,
  renderFilterForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  rightSidebarIsOpen: PropTypes.bool.isRequired,
  rightSidebarWidth: PropTypes.number,
  rootActive: PropTypes.bool.isRequired,
  tableActive: PropTypes.bool.isRequired,
  tableColumnSpecifications: PropTypes.array.isRequired,
  treeActive: PropTypes.bool.isRequired,
  treeEnabled: PropTypes.bool.isRequired,
  windowHeight: PropTypes.number.isRequired,
}
const defaultProps = {
  editItemColumnWidth: 500,
  focusedItemId: undefined,
  isPicker: false,
  itemId: undefined,
  rightSidebarWidth: 300,
}

class ResourceManager extends Component {
  constructor(props) {
    super(props)

    this.getColumns = this.getColumns.bind(this)
    this.renderColumn = this.renderColumn.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  getColumns = memoize(
    (
      createItemActive,
      editItemActive,
      editItemColumnWidth,
      filterActive,
      rightSidebarIsOpen,
      rightSidebarWidth
    ) => {
      const columns = [
        {
          key: 'collectionColumn',
        },
      ]

      const itemColumnStyle = {
        background: 'white',
        borderLeft: '1px solid #D4D4D5',
        zIndex: 100,
      }

      if (filterActive) {
        columns.push({
          key: 'filterColumn',
          style: itemColumnStyle,
          width: `${editItemColumnWidth}px`,
        })
      }
      if (editItemActive) {
        columns.push({
          key: 'editItemColumn',
          style: itemColumnStyle,
          width: `${editItemColumnWidth}px`,
        })
      }

      if (createItemActive) {
        columns.push({
          key: 'createItemColumn',
          style: itemColumnStyle,
          width: `${editItemColumnWidth}px`,
        })
      }

      if (rightSidebarIsOpen) {
        columns.push({
          key: 'rightSidebar',
          style: itemColumnStyle,
          width: `${rightSidebarWidth}px`,
        })
      }
      return columns
    }
  )

  getRows = memoize(isPicker => {
    return isPicker
      ? [
          { height: `${PICKER_HEADER_HEIGHT}px`, key: 'pickerHeader' },
          { key: 'main' },
          { height: `${PICKER_ACTION_BAR_HEIGHT}px`, key: 'pickerActionBar' },
        ]
      : [{ key: 'main' }]
  })

  renderColumn(key) {
    switch (key) {
      case 'collectionColumn': {
        const { extractedProps } = extractProps({
          keys: [
            'availableHeight',
            'baseItems',
            'createItemActive',
            'currentTableRowNumber',
            'expandedIds',
            'fetchTreeBase',
            'filterActive',
            'focusedIndex',
            'itemId',
            'ItemTitle',
            'tableActive',
            'listItems',
            'nextRowAvailable',
            'onClickRow',
            'onInteraction',
            'onOpenNewRecordForm',
            'onSelectNextRecord',
            'onSelectPreviousRecord',
            'onSetCurrentTableRowNumber',
            'onShowAllRecords',
            'onToggleCurrentRow',
            'onToggleFilters',
            'onToggleRow',
            'prevRowAvailable',
            'resource',
            'rootActive',
            'setListItems',
            'showAll',
            'tableBatchFetchOptions',
            'tableColumnSpecifications',
            'tableSearch',
            'totalNumberOfRecords',
            'treeActive',
            'itemFetchOptions',
            'treeEnabled',
          ],
          props: this.props,
        })

        const { columnHeight } = this.props
        return (
          <CollectionColumn
            {...extractedProps}
            availableHeight={columnHeight}
          />
        )
      }

      case 'editItemColumn': {
        const { extractedProps } = extractProps({
          keys: [
            'itemId',
            'ItemTitle',
            'onInteraction',
            'renderEditForm',
            'resource',
            'itemFetchOptions',
          ],
          props: this.props,
        })
        const { columnHeight } = this.props
        return (
          <EditItemColumn {...extractedProps} availableHeight={columnHeight} />
        )
      }

      case 'createItemColumn': {
        const { extractedProps } = extractProps({
          keys: ['onInteraction', 'resource', 'renderCreateForm'],
          props: this.props,
        })
        const { columnHeight } = this.props
        return (
          <CreateItemColumn
            {...extractedProps}
            availableHeight={columnHeight}
          />
        )
      }

      case 'filterColumn': {
        const { extractedProps } = extractProps({
          keys: [
            'buildFilterQuery',
            'filterValues',
            'onInteraction',
            'onUpdateFilterValues',
            'renderFilterForm',
            'resource',
          ],
          props: this.props,
        })
        const { columnHeight } = this.props
        return (
          <FilterColumn {...extractedProps} availableHeight={columnHeight} />
        )
      }

      case 'rightSidebar': {
        return <InformationSidebar />
      }

      default: {
        throw new Error(`Unknown column: ${key}`)
      }
    }
  }
  renderRow(key) {
    switch (key) {
      case 'main': {
        const {
          createItemActive,
          editItemActive,
          editItemColumnWidth,
          filterActive,
          rightSidebarIsOpen,
          rightSidebarWidth,
        } = this.props
        const columns = this.getColumns(
          createItemActive,
          editItemActive,
          editItemColumnWidth,
          filterActive,
          rightSidebarIsOpen,
          rightSidebarWidth
        )
        return (
          <ColumnLayout
            {...this.props}
            columns={columns}
            renderColumn={this.renderColumn}
          />
        )
      }

      case 'pickerHeader': {
        const { extractedProps } = extractProps({
          keys: ['onClosePicker', 'pickerTitle'],
          props: this.props,
        })

        return <PickerHeader {...extractedProps} />
      }

      case 'pickerActionBar': {
        const { extractedProps } = extractProps({
          keys: ['ItemTitle', 'onPickItem', 'resource'],
          props: this.props,
        })

        const { itemFetchOptions } = this.props

        return (
          <PickerActionBar
            {...extractedProps}
            {...itemFetchOptions}
            itemId={this.props.focusedItemId}
          />
        )
      }

      default: {
        throw new Error(`Unknown row: ${key}`)
      }
    }
  }

  render() {
    const { isPicker } = this.props
    const rows = this.getRows(isPicker)

    return <RowLayout {...this.props} renderRow={this.renderRow} rows={rows} />
  }
}

ResourceManager.propTypes = propTypes
ResourceManager.defaultProps = defaultProps

export default compose(
  createResourceManagerWrapper(),
  injectWindowHeight,
  connect(mapStateToProps)
)(ResourceManager)
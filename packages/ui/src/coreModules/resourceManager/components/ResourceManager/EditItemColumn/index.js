import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  getFormValues,
  reset as resetActionCreator,
  startSubmit as startSubmitActionCreator,
  stopSubmit as stopSubmitActionCreator,
} from 'redux-form'
import { isEmpty } from 'lodash'

import {
  InspectRelationsModal,
  RecordActionBar,
} from 'coreModules/form/components'
import { globalSelectors as formSupportKeyObjectSelectors } from 'coreModules/formSupport/keyObjectModule'
import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { createNotification as createNotificationActionCreator } from 'coreModules/notifications/actionCreators'
import {
  CLOSE_ITEM_VIEW,
  DEL_SUCCESS,
  EDIT_SUCCESS,
} from 'coreModules/resourceManager/constants'
import crudActionCreators from 'coreModules/crud/actionCreators'
import extractProps from 'utilities/extractProps'

const mapStateToProps = (state, { resource }) => {
  const formName = `${resource}Edit`

  return {
    formHeader: formSupportKeyObjectSelectors.get[
      'sectionNavigation.:formName.header'
    ](state, { formName }),
    formName,
    formSubHeader: formSupportKeyObjectSelectors.get[
      'sectionNavigation.:formName.subHeader'
    ](state, { formName }),
    values: getFormValues(formName)(state),
  }
}

const mapDispatchToProps = {
  createNotification: createNotificationActionCreator,
  reset: resetActionCreator,
  startSubmit: startSubmitActionCreator,
  stopSubmit: stopSubmitActionCreator,
}

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  createNotification: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  fetchIncludeAfterUpdate: PropTypes.arrayOf(PropTypes.string),
  fetchRelationshipsBeforeDelete: PropTypes.func,
  formHeader: PropTypes.string,
  formName: PropTypes.string.isRequired,
  formSubHeader: PropTypes.string,
  itemFetchOptions: PropTypes.object.isRequired,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
  relationshipsToCheckBeforeDelete: PropTypes.arrayOf(PropTypes.string),
  renderEditForm: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  startSubmit: PropTypes.func.isRequired,
  stopSubmit: PropTypes.func.isRequired,
  transformOutput: PropTypes.func,
  values: PropTypes.object,
}
const defaultProps = {
  fetchIncludeAfterUpdate: undefined,
  fetchRelationshipsBeforeDelete: undefined,
  formHeader: undefined,
  formSubHeader: undefined,
  itemId: undefined,
  relationshipsToCheckBeforeDelete: [],
  transformOutput: undefined,
  values: undefined,
}

const rows = [
  {
    key: 'itemEditForm',
    style: { overflow: 'auto' },
  },
  {
    height: emToPixels(4.625),
    key: 'bottomBar',
  },
]

class EditItemColumn extends Component {
  constructor(props) {
    super(props)

    this.deleteItemOrShowRelationships = this.deleteItemOrShowRelationships.bind(
      this
    )
    this.handleClose = this.handleClose.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUndoChanges = this.handleUndoChanges.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleModalOpen = this.handleModalOpen.bind(this)

    this.state = {
      checkingRemovability: false,
      open: false,
      relationships: undefined,
    }
  }

  handleClose(event) {
    event.preventDefault()
    this.props.onInteraction(CLOSE_ITEM_VIEW)
  }

  handleDelete() {
    const {
      dispatch,
      fetchRelationshipsBeforeDelete,
      itemId,
      relationshipsToCheckBeforeDelete,
      resource,
    } = this.props

    const { getOne } = crudActionCreators[resource]

    this.setState({ checkingRemovability: true })
    if (fetchRelationshipsBeforeDelete) {
      return fetchRelationshipsBeforeDelete().then(relationships => {
        this.setState({ checkingRemovability: false })
        return this.deleteItemOrShowRelationships(relationships)
      })
    }

    return dispatch(
      getOne({
        id: itemId,
        relationships: relationshipsToCheckBeforeDelete,
      })
    ).then(res => {
      const { relationships } = res || {}
      this.setState({ checkingRemovability: false })
      return this.deleteItemOrShowRelationships(relationships)
    })
  }

  deleteItemOrShowRelationships(relationships = {}) {
    const {
      createNotification,
      dispatch,
      itemId,
      onInteraction,
      resource,
    } = this.props

    const relationshipKeys = Object.keys(relationships)

    if (relationshipKeys.length) {
      const relationshipsAreEmpty = relationshipKeys.reduce(
        (emptyFlag, relationshipKey) => {
          if (!emptyFlag) {
            return false
          }

          return isEmpty(relationships[relationshipKey].data)
        },
        true
      )

      if (!relationshipsAreEmpty) {
        this.setState({ relationships })

        return createNotification({
          componentProps: {
            /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            description: (
              <React.Fragment>
                {`It couldn't be deleted since it has related records. You can `}
                <a onClick={this.handleModalOpen}>inspect relations here</a>.
              </React.Fragment>
            ),
            /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            header: 'The record was not deleted',
          },
          type: 'ERROR',
        })
      }
    }

    // if there are no relationships, delete resource
    const { del } = crudActionCreators[resource]

    return dispatch(del({ id: itemId })).then(() => {
      createNotification({
        componentProps: {
          header: 'The record was deleted',
        },
        type: 'SUCCESS',
      })
      onInteraction(DEL_SUCCESS)
    })
  }

  handleModalClose() {
    this.setState({ open: false })
  }

  handleModalOpen() {
    this.setState({ open: true })
  }

  handleSubmit(event) {
    event.preventDefault()

    const {
      dispatch,
      fetchIncludeAfterUpdate,
      formName,
      itemId,
      resource,
      startSubmit,
      stopSubmit,
      transformOutput,
      values,
    } = this.props

    const update =
      crudActionCreators[resource] && crudActionCreators[resource].update

    startSubmit(formName)

    return dispatch(
      update({
        item: {
          id: itemId,
          ...(transformOutput ? transformOutput(values) : values),
        },
        nested: true,
      })
    ).then(() => {
      if (fetchIncludeAfterUpdate) {
        const getOne =
          crudActionCreators[resource] && crudActionCreators[resource].getOne

        dispatch(
          getOne({
            id: itemId,
            include: fetchIncludeAfterUpdate,
          })
        )
      }

      this.props.onInteraction(EDIT_SUCCESS)
      stopSubmit(formName)
    })
  }

  handleUndoChanges(event) {
    event.preventDefault()
    const { formName } = this.props
    this.props.reset(formName)
  }

  renderRow(key) {
    switch (key) {
      case 'itemEditForm': {
        const { availableHeight, itemId, renderEditForm } = this.props
        return renderEditForm({ availableHeight, itemId })
      }
      case 'bottomBar': {
        const { checkingRemovability } = this.state
        const { extractedProps } = extractProps({
          keys: ['formName'],
          props: this.props,
        })

        return (
          <RecordActionBar
            {...extractedProps}
            loadingDelete={checkingRemovability}
            onDelete={this.handleDelete}
            onSubmit={this.handleSubmit}
            onUndoChanges={this.handleUndoChanges}
          />
        )
      }
      default: {
        throw new Error(`Unknown row: ${key}`)
      }
    }
  }

  render() {
    const { availableHeight, formHeader, formSubHeader, itemId } = this.props
    const { open, relationships } = this.state

    return (
      <React.Fragment>
        <RowLayout
          availableHeight={availableHeight}
          itemId={itemId}
          renderRow={this.renderRow}
          rows={rows}
        />
        {open && (
          <InspectRelationsModal
            onClose={this.handleModalClose}
            recordHeader={`${formHeader}${
              formSubHeader ? ` (${formSubHeader.toLowerCase()})` : ''
            }`}
            relationships={relationships}
          />
        )}
      </React.Fragment>
    )
  }
}

EditItemColumn.defaultProps = defaultProps
EditItemColumn.propTypes = propTypes

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  connect(null) // needed to get dispatch
)(EditItemColumn)

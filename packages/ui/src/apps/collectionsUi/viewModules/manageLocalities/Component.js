import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import { LocalityManager } from 'domainModules/locality/components'
import {
  redirectToPrev,
  redirectToNext,
} from 'domainModules/locality/actionCreators'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose } from 'redux'

const mapDispatchToProps = {
  push,
  redirectToNext,
  redirectToPrev,
}

const propTypes = {
  match: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
}
const defaultProps = {}

const getAction = ({ localityId, url }) => {
  let action = 'explore'
  if (localityId && url.indexOf('edit') > -1) {
    action = 'edit'
  }
  if (localityId && url.indexOf('inspect') > -1) {
    action = 'inspect'
  }

  if (url.indexOf('create') > -1) {
    action = 'create'
  }

  return action
}

class ManageLocalities extends Component {
  render() {
    const { match: { params = {}, url = '' } = {} } = this.props
    const { localityId } = params
    const action = getAction({ localityId, url })

    return (
      <PageTemplate container={false}>
        <LocalityManager
          onItemInteraction={(type, data) => {
            switch (type) {
              case 'edit': {
                const { id } = data
                if (!id) {
                  throw new Error('Id is required for edit')
                }
                this.props.push(`/app/localities/${id}/edit`)
                break
              }
              case 'inspect': {
                const { id } = data
                if (!id) {
                  throw new Error('Id is required for inspect')
                }
                this.props.push(`/app/localities/${id}/inspect`)
                break
              }
              case 'close': {
                this.props.push(`/app/localities`)
                break
              }
              default: {
                throw new Error(`Unknown interaction of type ${type}`)
              }
            }
          }}
          // onBack={() => {
          //   this.props.push(`/app/localities`)
          // }}
          // pickPrev={() => {
          //   this.props.redirectToPrev(localityId)
          // }}
          // pickNext={() => {
          //   this.props.redirectToNext(localityId)
          // }}
          // onItemClick={(itemId, action) => {
          //   if (action === 'edit') {
          //     this.props.push(`/app/localities/${itemId}/edit`)
          //   }
          //   if (action === 'view') {
          //     this.props.push(`/app/localities/${itemId}/view`)
          //   }
          // }}
          action={action}
          localityId={localityId}
        />
      </PageTemplate>
    )
  }
}

ManageLocalities.propTypes = propTypes
ManageLocalities.defaultProps = defaultProps

export default compose(withRouter, connect(undefined, mapDispatchToProps))(
  ManageLocalities
)

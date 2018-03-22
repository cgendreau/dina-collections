import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import { LocalityManager, ViewPicker } from 'domainModules/locality/components'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose } from 'redux'

const mapDispatchToProps = {
  push,
}

const propTypes = {
  match: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
}
const defaultProps = {}

class ManageLocalities extends Component {
  render() {
    const { match: { params = {}, url = '' } = {} } = this.props
    const { localityId } = params
    let mode = 'list'
    if (localityId && url.indexOf('edit') > -1) {
      mode = 'edit'
    }
    if (localityId && url.indexOf('view') > -1) {
      mode = 'view'
    }

    if (url.indexOf('create') > -1) {
      mode = 'create'
    }

    return (
      <PageTemplate>
        <ViewPicker />
        <LocalityManager
          onBack={() => {
            this.props.push(`/app/localities`)
          }}
          onItemClick={(itemId, action) => {
            if (action === 'edit') {
              this.props.push(`/app/localities/${itemId}/edit`)
            }
            if (action === 'view') {
              this.props.push(`/app/localities/${itemId}/view`)
            }
          }}
          localityId={localityId}
          mode={mode}
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

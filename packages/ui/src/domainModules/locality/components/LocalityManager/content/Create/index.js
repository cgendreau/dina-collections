import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import createLog from 'utilities/log'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createCuratedLocality as createCuratedLocalityAc } from 'domainModules/localityService/actionCreators'

import CuratedLocalityForm from '../../../Form'

const log = createLog('modules:user:CreateForm')

const mapDispatchToProps = {
  createCuratedLocality: createCuratedLocalityAc,
}

const propTypes = {
  createCuratedLocality: PropTypes.func.isRequired,
}

export class Create extends Component {
  render() {
    log.render()
    return (
      <Segment size="tiny" stacked>
        <h1>Create</h1>

        <CuratedLocalityForm
          displayBackButton
          displayResetButton
          onBack={this.props.onBack}
          onSubmit={data => {
            this.props
              .createCuratedLocality({
                curatedLocality: data,
              })
              .then(() => {
                this.props.onBack()
              })
          }}
        />
      </Segment>
    )
  }
}

Create.propTypes = propTypes

export default compose(connect(null, mapDispatchToProps))(Create)

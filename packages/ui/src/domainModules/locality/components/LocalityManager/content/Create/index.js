import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment } from 'semantic-ui-react'
import createLog from 'utilities/log'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createCuratedLocality as createCuratedLocalityAc } from 'domainModules/localityService/actionCreators'
import CuratedLocalityForm from '../../../Form'
import TempNavigation from '../../../TempNavigation'

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
      <Grid.Row>
        <Grid.Column width={16}>
          <TempNavigation onBack={this.props.onBack} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Segment size="tiny" stacked style={{ minHeight: 505 }}>
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
        </Grid.Column>
      </Grid.Row>
    )
  }
}

Create.propTypes = propTypes

export default compose(connect(null, mapDispatchToProps))(Create)

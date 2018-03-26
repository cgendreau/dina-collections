import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createCuratedLocality as createCuratedLocalityAc } from 'domainModules/localityService/actionCreators'
import { Block } from 'coreModules/layout/components'
import CuratedLocalityForm from '../../../Form'
import Header from './Header'

const mapDispatchToProps = {
  createCuratedLocality: createCuratedLocalityAc,
}

const propTypes = {
  createCuratedLocality: PropTypes.func.isRequired,
  layoutMode: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
}

export class Create extends Component {
  render() {
    const { layoutMode, onInteraction } = this.props
    return (
      <Block>
        <Header
          layoutMode={layoutMode}
          onInteraction={onInteraction}
          title="Create"
        />
        <Block.Content>
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
        </Block.Content>
      </Block>
    )
  }
}

Create.propTypes = propTypes

export default compose(connect(null, mapDispatchToProps))(Create)

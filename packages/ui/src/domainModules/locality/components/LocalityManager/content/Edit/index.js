import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import createLog from 'utilities/log'
import { compose } from 'redux'
import { connect } from 'react-redux'
import localityServiceSelectors from 'domainModules/localityService/globalSelectors'
import { updateCuratedLocality as updateCuratedLocalityAc } from 'domainModules/localityService/actionCreators'
import CuratedLocalityForm from '../../../Form'

const log = createLog('modules:user:EditForm')

const mapStateToProps = (state, ownProps) => {
  const { localityId } = ownProps
  return {
    curatedLocality: localityServiceSelectors.getCuratedLocality(
      state,
      localityId
    ),
  }
}

const mapDispatchToProps = {
  updateCuratedLocality: updateCuratedLocalityAc,
}

const propTypes = {
  curatedLocality: PropTypes.object,
  localityId: PropTypes.string.isRequired,
  updateCuratedLocality: PropTypes.func.isRequired,
}

const defaultProps = {
  curatedLocality: undefined,
}

export class Edit extends Component {
  render() {
    const { curatedLocality, localityId } = this.props
    const initialValues = curatedLocality
      ? {
          group: curatedLocality.group,
          name: curatedLocality.name,
          parent: curatedLocality.parent
            ? {
                id: curatedLocality.parent.id,
              }
            : {},
        }
      : {}
    log.render()
    return (
      <Segment size="tiny" stacked>
        <h1>Edit</h1>

        {curatedLocality && (
          <CuratedLocalityForm
            displayBackButton
            displayResetButton
            onBack={this.props.onBack}
            initialValues={initialValues}
            onSubmit={data => {
              this.props
                .updateCuratedLocality({
                  curatedLocality: {
                    id: localityId,
                    ...data,
                  },
                })
                .then(() => {
                  this.props.onBack()
                })
            }}
          />
        )}
      </Segment>
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(Edit)

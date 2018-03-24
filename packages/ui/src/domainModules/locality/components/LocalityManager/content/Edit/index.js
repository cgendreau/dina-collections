import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment } from 'semantic-ui-react'
import createLog from 'utilities/log'
import { compose } from 'redux'
import { connect } from 'react-redux'
import localityServiceSelectors from 'domainModules/localityService/globalSelectors'
import { updateCuratedLocality as updateCuratedLocalityAc } from 'domainModules/localityService/actionCreators'
import CuratedLocalityForm from '../../../Form'
import TempNavigation from '../../../TempNavigation'

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
  onItemInteraction: PropTypes.func.isRequired,
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
      <Segment size="tiny" stacked style={{ minHeight: 505 }}>
        <Grid.Row>
          <Grid.Column width={16}>
            <Grid.Column width={16}>
              <TempNavigation
                onItemInteraction={this.props.onItemInteraction}
              />
            </Grid.Column>
            {curatedLocality && (
              <CuratedLocalityForm
                displayBackButton
                displayResetButton
                initialValues={initialValues}
                onItemInteraction={this.props.onItemInteraction}
                onSubmit={data => {
                  this.props
                    .updateCuratedLocality({
                      curatedLocality: {
                        id: localityId,
                        ...data,
                      },
                    })
                    .then(() => {
                      this.props.onItemInteraction('submit-success')
                    })
                }}
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Segment>
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(Edit)

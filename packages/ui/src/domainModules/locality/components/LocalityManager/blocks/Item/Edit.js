import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import localityServiceSelectors from 'domainModules/localityService/globalSelectors'
import { updateCuratedLocality as updateCuratedLocalityAc } from 'domainModules/localityService/actionCreators'
import { Block } from 'coreModules/layout/components'
import CuratedLocalityForm from '../../../Form'
import Header from './Header'

const mapStateToProps = (state, ownProps) => {
  const { itemId } = ownProps
  return {
    curatedLocality: localityServiceSelectors.getCuratedLocality(state, itemId),
  }
}

const mapDispatchToProps = {
  updateCuratedLocality: updateCuratedLocalityAc,
}

const propTypes = {
  curatedLocality: PropTypes.object,
  itemId: PropTypes.string.isRequired,
  layoutMode: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  updateCuratedLocality: PropTypes.func.isRequired,
}

const defaultProps = {
  curatedLocality: undefined,
}

export class Edit extends Component {
  render() {
    const { curatedLocality, layoutMode, onInteraction, itemId } = this.props
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

    return (
      <Block>
        <Header
          layoutMode={layoutMode}
          onInteraction={onInteraction}
          title="Edit"
        />
        <Block.Content>
          {curatedLocality && (
            <CuratedLocalityForm
              displayBackButton
              displayResetButton
              initialValues={initialValues}
              onInteraction={onInteraction}
              onSubmit={data => {
                this.props
                  .updateCuratedLocality({
                    curatedLocality: {
                      id: itemId,
                      ...data,
                    },
                  })
                  .then(() => {
                    onInteraction('edit-submit-success')
                  })
              }}
            />
          )}
        </Block.Content>
      </Block>
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(Edit)

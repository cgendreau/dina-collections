import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { Remarks } from 'coreModules/form/components'
import {
  reportFormFieldStatus,
  wrapInColumn,
} from 'coreModules/form/higherOrderComponents'

const propTypes = {
  name: PropTypes.string.isRequired,
}

class RemarksTogglable extends PureComponent {
  render() {
    const { name, ...rest } = this.props

    return <Remarks name={name} {...rest} />
  }
}

RemarksTogglable.propTypes = propTypes

export default compose(reportFormFieldStatus, wrapInColumn)(RemarksTogglable)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Table } from 'semantic-ui-react'

import TaxonNameDropdownSearch from '../TaxonNameDropdownSearch'
import { ADD_SYNONYM } from '../../constants'

const propTypes = {
  onInteraction: PropTypes.func.isRequired,
}

export class NewTaxonNameRow extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(itemId) {
    this.props.onInteraction(ADD_SYNONYM, {
      itemId,
    })
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          <TaxonNameDropdownSearch
            displayLabel={false}
            enableHelpNotification={false}
            input={{
              name: 'newTaxonName',
              onBlur: this.handleChange,
              onChange: this.handleChange,
            }}
            meta={{}}
            module="taxon"
            taxonNameType="neitherAcceptedNorSynonymToTaxon"
          />
        </Table.Cell>
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
      </Table.Row>
    )
  }
}

NewTaxonNameRow.propTypes = propTypes

export default compose()(NewTaxonNameRow)

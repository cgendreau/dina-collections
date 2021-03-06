import React, { Component } from 'react'
import PropTypes from 'prop-types'
import objectPath from 'object-path'

import config from 'config'
import extractProps from 'utilities/extractProps'
import { LATEST, OPEN_RANGE, RANGE, SINGLE } from 'coreModules/form/constants'
import { emToPixels } from 'coreModules/layout/utilities'
import FieldTemplate, { fieldTemplatePropKeys } from '../../../FieldTemplate'
import DatePart from '../DatePart'
import { getRangeValue, getRangeValueAfterDateTypeChange } from '../utilities'
import DateTypeRadios from './DateTypeRadios'

const SELECTABLE_DATE_TYPES = [SINGLE, RANGE, LATEST]

const onePartErrorFieldStyle = {
  marginBottom: emToPixels(3.75),
}
const onePartErrorLabelStyle = {
  left: -emToPixels(11.5),
  position: 'relative',
  top: emToPixels(3.75),
  width: emToPixels(11.5),
}
const twoPartErrorLabelStyle = {
  width: emToPixels(25),
}
const datePartStyle = {
  float: 'left',
  width: '11.5em',
}
const datePartSeparatorStyle = {
  float: 'left',
  marginTop: '1.75em',
  textAlign: 'center',
  width: '2em',
}

const propTypes = {
  componentErrors: PropTypes.object,
  displayDateTypeRadios: PropTypes.bool,
  displayEndDateLabel: PropTypes.bool,
  displayLabel: PropTypes.bool,
  displayStartDateLabel: PropTypes.bool,
  displaySubLabels: PropTypes.bool,
  endDateLabel: PropTypes.node,
  initialDateType: PropTypes.oneOf([LATEST, OPEN_RANGE, RANGE, SINGLE]),
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.shape({
        endDate: PropTypes.shape({
          day: PropTypes.number,
          interpretedTimeStamp: PropTypes.string,
          month: PropTypes.number,
          year: PropTypes.number,
        }),
        startDate: PropTypes.shape({
          day: PropTypes.number,
          interpretedTimeStamp: PropTypes.string,
          month: PropTypes.number,
          year: PropTypes.number,
        }),
      }),
      PropTypes.string,
    ]),
  }).isRequired,
  meta: PropTypes.object.isRequired,
  module: PropTypes.string,
  mountHidden: PropTypes.bool,
  stack: PropTypes.bool,
  startDateLabel: PropTypes.node,
}

const defaultProps = {
  componentErrors: {},
  displayDateTypeRadios: false,
  displayEndDateLabel: false,
  displayLabel: false,
  displayStartDateLabel: false,
  displaySubLabels: true,
  endDateLabel: undefined,
  initialDateType: 'single',
  module: 'form',
  mountHidden: config.isTest,
  stack: false,
  startDateLabel: undefined,
}

class DateRange extends Component {
  constructor(props) {
    super(props)
    this.getFieldInput = this.getFieldInput.bind(this)
    this.setStartYearInputRef = this.setStartYearInputRef.bind(this)
    this.setEndYearInputRef = this.setEndYearInputRef.bind(this)
    this.handleFocusEndYear = this.handleFocusEndYear.bind(this)
    this.handleFocusStartYear = this.handleFocusStartYear.bind(this)
    this.handleDateTypeChange = this.handleDateTypeChange.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)

    this.state = {
      dateType:
        objectPath.get(props, 'input.value.dateType') || props.initialDateType,
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextDateType = objectPath.get(nextProps, 'input.value.dateType')
    if (nextDateType && this.state.dateType !== nextDateType) {
      this.setState({ dateType: nextDateType })
    }
  }

  getFieldInput(datePartName) {
    const { input } = this.props
    const fieldName = `${input.name}.${datePartName}`

    const updatedInput = {
      name: fieldName,
      onBlur: value => {
        this.handleOnBlur({
          datePartName,
          value,
        })
      },
      onChange: value => {
        this.handleOnChange({
          datePartName,
          value,
        })
      },
      onFocus: value => {
        this.handleOnFocus({
          datePartName,
          value,
        })
      },
      value: input.value[datePartName] || {},
    }
    return updatedInput
  }

  setStartYearInputRef(element) {
    this.startYearInput = element
  }

  setEndYearInputRef(element) {
    this.endYearInput = element
  }

  handleFocusEndYear() {
    // wait for it to be mounted
    if (this.endYearInput) {
      this.endYearInput.focus()
    }
  }

  handleFocusStartYear() {
    // wait for it to be mounted
    if (this.startYearInput) {
      this.startYearInput.focus()
    }
  }

  handleDateTypeChange(event, { value: nextDateType }) {
    event.preventDefault()
    const { value: currentRangeValue } = this.props.input

    this.setState(({ dateType: previousDateType }) => {
      const updatedValue = getRangeValueAfterDateTypeChange({
        currentRangeValue,
        nextDateType,
        previousDateType,
      })

      this.props.input.onChange(updatedValue)

      // setTimeout needed to allow component to mount first, if necessary
      if (nextDateType === LATEST) {
        setTimeout(() => this.handleFocusEndYear())
      } else {
        setTimeout(() => this.handleFocusStartYear())
      }

      return { dateType: nextDateType }
    })
  }

  // DatePart is not updating value on blur
  handleOnBlur() {
    this.props.input.onBlur(this.props.input.value)
  }

  handleOnChange({
    datePartName: updatedDatePartName,
    value: updatedDatePartValue,
  }) {
    const { value: currentRangeValue } = this.props.input
    const { dateType } = this.state

    const updatedValue = getRangeValue({
      currentRangeValue,
      dateType,
      updatedDatePartName,
      updatedDatePartValue,
    })

    this.props.input.onChange(updatedValue)
  }

  // DatePart is not updating value on focus
  handleOnFocus() {
    this.props.input.onFocus(this.props.input.value)
  }

  render() {
    const {
      displayDateTypeRadios,
      displayEndDateLabel,
      displayStartDateLabel,
      displaySubLabels,
      endDateLabel,
      input,
      meta,
      mountHidden,
      stack,
      startDateLabel,
    } = this.props

    const { dateType } = this.state

    const hasError = meta.touched && !!meta.error

    const { extractedProps: fieldTemplateProps } = extractProps({
      keys: fieldTemplatePropKeys,
      props: this.props,
    })

    return (
      <FieldTemplate
        {...fieldTemplateProps}
        displayError={hasError}
        enableHelpNotifications={false}
        errorStyle={
          dateType === SINGLE ? onePartErrorLabelStyle : twoPartErrorLabelStyle
        }
        name={input.name}
        style={
          hasError && dateType === SINGLE ? onePartErrorFieldStyle : undefined
        }
      >
        {displayDateTypeRadios && (
          <DateTypeRadios
            dateType={dateType}
            dateTypes={SELECTABLE_DATE_TYPES}
            onDateTypeChange={this.handleDateTypeChange}
          />
        )}
        {!stack && (
          <React.Fragment>
            <div style={datePartStyle}>
              <DatePart
                disabled={dateType === LATEST}
                displayLabel={displayStartDateLabel}
                displaySubLabel={displaySubLabels}
                input={this.getFieldInput('startDate')}
                isStartDate
                label={startDateLabel}
                meta={{}}
                setYearInputRef={this.setStartYearInputRef}
              />
            </div>
            {dateType !== SINGLE && (
              <div style={datePartSeparatorStyle}> – </div>
            )}
            <div style={datePartStyle}>
              <DatePart
                displayLabel={displayEndDateLabel}
                displaySubLabel={displaySubLabels}
                hidden={dateType === SINGLE}
                input={this.getFieldInput('endDate')}
                isEndDate
                label={endDateLabel}
                meta={{}}
                setYearInputRef={this.setEndYearInputRef}
              />
            </div>
          </React.Fragment>
        )}

        {stack && (
          <React.Fragment>
            <div
              style={{ float: 'left', marginBottom: '0.8em', width: '100%' }}
            >
              <DatePart
                disabled={dateType === LATEST}
                displayLabel={displayStartDateLabel}
                displaySubLabel={displaySubLabels}
                input={this.getFieldInput('startDate')}
                isStartDate
                label={startDateLabel}
                meta={{}}
                setYearInputRef={this.setStartYearInputRef}
              />
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <DatePart
                displayLabel={displayEndDateLabel}
                displaySubLabel={displaySubLabels}
                hidden={dateType === SINGLE}
                input={this.getFieldInput('endDate')}
                isEndDate
                label={endDateLabel}
                meta={{}}
                setYearInputRef={this.setEndYearInputRef}
              />
            </div>
          </React.Fragment>
        )}

        {mountHidden && (
          <input
            className="hidden"
            {...input}
            name={`${input.name}.hidden`}
            onChange={this.props.input.onChange}
            type="hidden"
            value={input.value || ''}
          />
        )}
      </FieldTemplate>
    )
  }
}

DateRange.defaultProps = defaultProps
DateRange.propTypes = propTypes

export default DateRange

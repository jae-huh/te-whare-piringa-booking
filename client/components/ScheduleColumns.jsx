import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'

import ScheduleColumn from './ScheduleColumn'

function ScheduleColumns (props) {
  return (
    <div className='schedule-columns' >
      <ScheduleColumn dayClass='yesterday' date={new Date(moment(props.date).subtract(1, 'days'))} />
      <ScheduleColumn dayClass='today' date={new Date(moment(props.date))} />
      <ScheduleColumn dayClass='tomorrow' date={new Date(moment(props.date).add(1, 'days'))} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    date: state.display.date
  }
}

export default connect(mapStateToProps)(ScheduleColumns)

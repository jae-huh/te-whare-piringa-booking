import React from 'react'
import moment from 'moment'

export default function HoursColumn (props) {
  return (
    <div className='schedule-hours-container'>
      {getHours()}
    </div>
  )
}

function getHours () {
  const d = new Date()
  const hourArray = []
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 2; j++) {
      let selectedDate = d.setHours(i + 6, j * 3)
      let dateFormatted = moment(selectedDate).format('HH:mm')
      let divContents = ''
      let classNames = 'hour'
      if (j === 1) {
        classNames += ' half-hour'
      } else {
        classNames += ' full-hour'
        divContents = dateFormatted
      }
      hourArray.push(<div key={dateFormatted} className={classNames}>{divContents}</div>)
    }
  }
  return hourArray
}

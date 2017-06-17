export function switchDate (date) {
  console.log(date)
  return {
    type: 'SWITCH_DATE',
    date
  }
}

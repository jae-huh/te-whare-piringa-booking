const consts = require('../../server/constants')
const funcs = require('../../server/validation')

export const openingHour = consts.openingHour
export const closingHour = consts.closingHour
export const minimumLength = consts.minimumLength
export const increment = consts.increment
export const validateBookingDetails = funcs.validateBookingDetails
export const validateUserDetails = funcs.validateUserDetails
export const checkBookingForOverlap = funcs.checkBookingForOverlap
export const validateAgainstOpenHours = funcs.validateAgainstOpenHours

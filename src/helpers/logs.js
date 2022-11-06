import moment from 'moment'
const isDevelopment = NODE_ENV !== 'production'

export const debugLog = function (...opt) {
    if (!isDevelopment) return null
    const time = moment().format('LLL')
    console.log(time, ...opt)
}

export const logInfo = function (...opt) {
    const time = moment().format('LLL')
    console.log(`[${APP_NAME}:v${APP_VERSION}]`, time, ...opt)
}

export const logError = function (...opt) {
    const time = moment().format('LLL')
    console.log(`[${APP_NAME}:v${APP_VERSION}]`, time)
    console.error(opt)
}
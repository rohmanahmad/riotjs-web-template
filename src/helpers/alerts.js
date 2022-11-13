import Swal from 'sweetalert2'
import { isUndefined, isFunction, result } from 'lodash'

import { logError } from './logs'

export const showAlertSuccess = function (message) {
    Swal.fire({type: 'success', title: 'Success', text: message})
}

export const showAlertError = function (err) {
    if (!err) return null
    Swal.fire({type: 'error', title: 'Error', text: err.error || err.message})
    logError(err)
}

export const dialog = function (options, callback) {
    if (isUndefined(options.title)) options['title'] = 'Are You Sure?'
    if (isUndefined(options.showCancelButton)) options['showCancelButton'] = true
    if (isUndefined(options.confirmButtonText)) options['confirmButtonText'] = 'Confirm'
    if (!isFunction(callback)) callback = (result) => { console.log('result: ' + result.isConfirmed + '\nYou Need To Handle this Callback To Get our result.') }
    Swal.fire(options)
        .then(callback)
}
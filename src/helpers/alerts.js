import Swal from 'sweetalert2'

export const showAlertSuccess = function (message) {
    Swal.fire({type: 'success', title: 'Success', text: message})
}

export const showAlertError = function (err) {
    if (!err) return null
    Swal.fire({type: 'error', title: 'Error', text: err.error || err.message})
    console.error(err)
}
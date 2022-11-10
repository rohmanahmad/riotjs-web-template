export const getQueryParams = (name, defaultValue=null) => {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href)
    if (results == null) {
        return defaultValue
    } else {
        return results[1] || defaultValue
    }
}

export const formatNumber = function (n) {
    return n
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const copyTextInSelector = function (selectorId) {
    const sel = document.getElementById(selectorId)
    const text = sel.html()
    if (!navigator) alert('copy text doesn\'t supported')
    navigator.clipboard.writeText(text)
}

export const sendToClipboard = function (text) {
    if (!navigator) alert('copy text doesn\'t supported')
    navigator.clipboard.writeText(text)
}

export const parseRequestURL = function () {
    const url = location.hash.slice(1).toLowerCase() || ''
    const r = url.substring(0, url.indexOf('?') >= 0 ? url.indexOf('?') : url.length).split("/")
    const queryString = url.indexOf('?') >= 0 ? url.substring(url.indexOf('?')) : ''
    return {
        resource    : r[1],
        verb        : r[2] ? r[2] : '',
        id          : r[3] ? r[3] : '',
        queryString : queryString
    }
}

export const sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const randomString = function (size=3, opt={ onlyNums: false, onlyChars: false }) {
    let result           = ''
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (opt.onlyNums) characters = '0123456789'
    else if (!opt.onlyChars) characters += '0123456789'
    let charactersLength = characters.length
    for ( var i = 0; i < size; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
   }
   return result
}

export const randomNumber = function (min=1, max=99999) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const goTo = (pathname) => {
    location.pathname = pathname
}
import { logInfo } from './logs'
import { setMany, get, set, clear } from 'idb-keyval' // https://www.npmjs.com/package/idb-keyval

export const getStorage = (key, defaultValue='', {prefix=''}={}) => {
    if (prefix) prefix = `${prefix}_`
    const fullKey = `${prefix}${key}`
    const v = localStorage.getItem(fullKey)
    logInfo(`[STORAGE] getting ${fullKey}`)
    return v || defaultValue
}

export const deleteStorage = (item) => {
    localStorage.removeItem(item)
}

export const changeStorage = (data, prefix='') => {
    if (prefix) prefix = `${prefix}_`
    for (const key in data) {
        const value = data[key]
        const fullKey = `${prefix}${key}`
        localStorage.setItem(fullKey, value)
        logInfo(`[STORAGE] setting ${fullKey}`)
    }
}

export const setManyDB = setMany
export const getDB = get
export const setDB = set
export const clearDB = clear
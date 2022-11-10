import { Request } from './index'
import { showAlertError } from 'MyHelpers/alerts'
import { result } from 'lodash'
import { get } from 'idb-keyval' // https://www.npmjs.com/package/idb-keyval

const baseURL = R10_API_URL

export const checkAuth = async function (query) {
    try {
        const token = await get('app_token')
        let req = new Request()
        req.setBaseURL(baseURL)
        req.setBearerToken(token)
        req.init()
        const response = await req.get('/api/v2/auth/check', query)
        const data = result(response, 'data')
        return data
    } catch (err) {
        showAlertError(err)
        throw err
    }
}

export const myRestriction = async function (query) {
    try {
        let req = new Request()
        req.setBaseURL(baseURL)
        req.init()
        const response = await req.get('/auth/get-restriction', query)
        const data = result(response, '[0]')
        return data
    } catch (err) {
        showAlertError(err)
    }
}

export const login = async (query) => {
    try {
        let req = new Request()
        req.setBaseURL(baseURL)
        req.init()
        const response = await req.post('/api/v2/auth/login', query)
        const data = result(response, 'data')
        return data
    } catch (err) {
        showAlertError(err)
    }
}
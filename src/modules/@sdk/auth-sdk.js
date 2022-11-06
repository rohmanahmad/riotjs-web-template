import { Request } from './index'
import { showAlertError } from 'MyHelpers/alerts'

const baseURL = R10_API_URL

export const myRestriction = async (query) => {
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
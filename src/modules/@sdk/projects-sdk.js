import { Request } from './index'
import { showAlertError } from 'MyHelpers/alerts'

const baseURL = R10_API_URL

export const getClientProjects = async (query) => {
    try {
        let req = new Request().setBaseURL(baseURL)
        const response = await req('/projects', query)
        const data = result(response, '[0]')
        return data
    } catch (err) {
        showAlertError(err)
    }
}
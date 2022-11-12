import { randomString, goTo } from 'MyHelpers/utilities'
import { showAlertError } from 'MyHelpers/alerts'
import { login } from 'MySDK/auth-sdk'

import { set } from 'idb-keyval' // https://www.npmjs.com/package/idb-keyval

export default {
    state: {
        ids: {
            username: randomString(10, {onlyChars: true}),
            password: randomString(10, {onlyChars: true})
        }
    },
    onBeforeMount() {},
    onBeforeUnmount() {},
    onMounted() {},
    onUpdated() {},
    onUnmounted() {},
    doLogin(e) {
        if (e.preventDefault) e.preventDefault()
        const username = this.$('#' + this.state.ids.username).value
        const password = this.$('#' + this.state.ids.password).value
        login({username, password})
            .then(res => {
                this.saveResponseToStorage(res.data)
                    .then(() => goTo('/'))
            })
    },
    async saveResponseToStorage(data) {
        try {
            await set('app_token', data.token)
            await set('user_id', data.id)
            await set('user_name', data.name)
            await set('user_profile_avatar', data.avatar)
            await set('app_token_expires', data.expires_token)
            await set('my_projects', data.client_projects)
            await set('competitor_projects', data.project.filter(x => x.is_competitor))
            await set('client_id', data.clientid)
            await set('package_name', data.package.package)
            await set('package_menu', data.package.menu)
            await set('package_channels', data.package.channels)
            await set('package_commandcenter', data.package.command_center)
            await set('package_available_keywords', data.package.keyword_available)
            await set('current_project', data.project[0])
            await set('last_login', data.last_logged_in)
        } catch (err) {
            showAlertError()
        }
    }
}
import { randomString, goTo } from 'MyHelpers/utilities'
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
                goTo('/')
            })
    },
    saveResponseToStorage(data) {
        set('user_id', data.id)
        set('user_name', data.name)
        set('user_profile_avatar', data.avatar)
        set('app_token', data.token)
        set('app_token_expires', data.expires_token)
        set('my_projects', data.client_projects)
        set('competitor_projects', data.project.filter(x => x.is_competitor))
        set('client_id', data.clientid)
        set('package_name', data.package.package)
        set('package_menu', data.package.menu)
        set('package_channels', data.package.channels)
        set('package_commandcenter', data.package.command_center)
        set('package_available_keywords', data.package.keyword_available)
        set('current_project', data.project[0]['key_id'])
        set('last_login', data.last_logged_in)
    }
}
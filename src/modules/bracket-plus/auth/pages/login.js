import { randomString, goTo } from 'MyHelpers/utilities'
import { setupLoginInfo } from 'MyHelpers/bracket-plus'
import { login } from 'MySDK/auth-sdk'

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
                setupLoginInfo(res.data)
                    .then(() => goTo('/'))
            })
    },
}
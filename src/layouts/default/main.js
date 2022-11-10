import { route, toRegexp, match } from '@riotjs/route'

import components from '../../modules/modules'

import pages from '../../modules/routes'

import { goTo } from 'MyHelpers/utilities'
import { checkAuth } from 'MySDK/auth-sdk'


export default {
    components,
    state: {
        pages,
        showLogin: false,
        showHeader: false,
        showLeftMenu: false,
        showRestriction: false,
        showNotFound: false,
        activePage: null
    },
    onBeforeMount({ isServer }) {
        this.anyRouteStream = route('(.*)')
        this.anyRouteStream.on.value(this.onAnyRoute)
        this.anyRouteStream.on.error(this.onAnyRouteError)
        this.anyRouteStream.on.end(console.log)
    },
    onAnyRouteError(path) {
        console.log(path)
        debugger
    },
    onAnyRoute(path) {
        const activePage = pages.find(p => match(path.pathname, toRegexp(p.path)))
        console.log('activePage', activePage)
        checkAuth()
            .catch((err) => {
                if (err.response.status === 402) {
                    if (activePage.label !== 'Login') goTo('/auth/login')
                }
                return false
            })
            .then((res) => {
                if (res) {
                    this.update({ activePage, showLogin: false, showNotFound: !activePage })
                } else {
                    this.update({ activePage, showLogin: true, showNotFound: !activePage })
                }
            })
    },
    onBeforeUnmount() {
        this.anyRouteStream.end()
    },
}
import { Router, Route, route, toRegexp, match } from '@riotjs/route'

import lazy from '@riotjs/lazy'

import Loader from '../globals/util/loader.riot'

import NotFound from '../globals/util/not-found.riot'

import pages from '../modules/routes'

export default {
    components: {
        Router,
        Route,
        NotFound,
        Home: lazy(Loader, () => import('../modules/home/pages/home.riot')),
        Register: lazy(Loader, () => import('../modules/auth/pages/register.riot')),
        Login: lazy(Loader, () => import('../modules/auth/pages/login.riot')),
    },
    state: {
        pages,
        showNotFound: false,
        activePage: null
    },
    onBeforeMount({ isServer }) {
        this.anyRouteStream = route('(.*)')
        this.anyRouteStream.on.value(this.onAnyRoute)
    },
    onAnyRoute(path) {
        const activePage = pages.find(p => match(path.pathname, toRegexp(p.path)))
        console.log(activePage, !activePage)
        this.update({
            activePage,
            showNotFound: !activePage
        })
    },
    onBeforeUnmount() {
        this.anyRouteStream.end()
    }
}
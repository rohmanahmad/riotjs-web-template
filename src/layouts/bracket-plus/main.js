import { route, toRegexp, match } from '@riotjs/route'

import components from '../../modules/modules'

import pages from '../../modules/routes'

import 'MyThemeCss/bracket.css'
import 'MyThemeCss/ripple10-style.css'
import 'MyThemeCss/sweetalert.min.css'

export default {
    components,
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
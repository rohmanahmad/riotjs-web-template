import { route, toRegexp, match } from '@riotjs/route'

import components from '../../modules/modules'

import pages from '../../modules/routes'

import 'MyThemeCss/bracket.css'
import 'MyThemeCss/ripple10-style.css'
import 'MyThemeCss/sweetalert.min.css'

import { menu, menuleft, maxStreams, urlStream } from 'MyHelpers/bracket-plus'
import { jquery, p } from 'MyHelpers/utilities'

export default {
    components,
    state: {
        pages,
        showNotFound: false,
        activePage: null
    },
    onBeforeMount({ isServer }) {
        this.infographic = false
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
    },
    onMounted() {
        localStorage.setItem('token', p('token'))
        this.changeClass()
        this.changeLeft()
        if (localStorage.maxdate) {
            var maxStreams = localStorage.maxdate
        }
        if (maxStreams != null && maxStreams != '' && maxStreams != 'null') {
            this.lefside = "pd-t-60"
            this.rightside = "pd-t-60"
            this.validasimaxstream = true
        } else {
            this.lefside = "pd-t-60"
            this.rightside = "padding-top : 0px"
            this.validasimaxstream = false
        }
        this.update()
        this.listenMenu()
        this.listenMaxStream()
        this.listenUrlChanged()
    },
    listenMaxStream() {
        maxStreams.on('maxstreams', (data) => {
            if (JSON.parse(localStorage.getItem('package'))) {
                var totalStreams = JSON.parse(localStorage.getItem('package')).records['max_streams'];
            }
        })
    },
    listenMenu() {
        menu.on('togglecollapse', (isCollapsed) => {
            menu.menuText = jquery('.menu-item-label')
            if (isCollapsed) {
                // hide toggled sub menu
                jquery('.show-sub + .br-menu-sub').slideUp()
                menu.menuText.addClass('op-lg-0-force')
                jquery('.br-sideleft').one('transitionend', function(e) {
                    menu.menuText.addClass('d-lg-none')
                })
            } else {
                jquery('.show-sub + .br-menu-sub').slideDown()
                jquery('.br-sideleft').one('transitionend', function(e) {
                    menu.menuText.removeClass('op-lg-0-force')
                    menu.menuText.removeClass('d-lg-none')
                })
            }
        })
        menuleft.on('show-left', (e) => {
            this.changeLeft(e)
            this.update()
        })
        menu.on('sidebar', () => {
            this.sidebar = localStorage.sidebar + ' ' + localStorage.showLeft
            this.changeClass(this.sidebar)
            this.update()
        })
    },
    changeLeft(value) {
        if (value) {
            var datamenu = 'fixed-leftside pace-done fixed-header show-left' + ' ' + localStorage.sidebar
        } else {
            var datamenu = 'fixed-leftside pace-done fixed-header' + ' ' + localStorage.sidebar
        }
        setTimeout(function() {
            jquery('body').attr('class', datamenu)
        }, 100)
        this.update()
    },
    changeClass(value) {
        if (value === undefined || value === "") {
            value = localStorage.sidebar
            if (value === undefined) {
                value = ""
            }
        }
        let isCollapsed = value.indexOf('collapsed-menu') >= 0 ? true : false
        menu.trigger('togglecollapse', isCollapsed)
        jquery('body').attr('class', 'fixed-leftside pace-done fixed-header ' + value)
    },
    listenUrlChanged() {
        urlStream.on('changeUrl', (url) => {
            this.currentUrlStream = url
            if (this.currentUrlStream == 'buzzer-tracking') {
                this.buzzerTracking = true
                this.rightside = false
            }
            if (this.currentUrlStream == 'health-index') {
                this.healthindex = true
                this.rightside = false
            }
            if (this.currentUrlStream == 'domain/infographic') {
                this.healthindex = true
                this.rightside = false
            }
            if (this.currentUrlStream == 'domain/indosatreport') {
                this.healthindex = true
                this.rightside = false
            }
            if (this.currentUrlStream == 'infographic' || this.currentUrlStream == 'competition/infographic') {
                this.healthindex = true
                this.rightside = false
                this.infographic = true
            }
            this.update()
        })
    }
}
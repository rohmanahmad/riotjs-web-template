import { route, toRegexp, match } from '@riotjs/route'

import components from '../../modules/modules'

import pages from '../../modules/routes'
import { goTo, getQueryParams } from 'MyHelpers/utilities'

import 'MyThemeCss/bracket.css'
import 'MyThemeCss/ripple10-style.css'
import 'MyThemeCss/sweetalert.min.css'
import 'MyThemeVendors/font-awesome/css/font-awesome.css'

import { jquery } from 'MyHelpers/bracket-plus'

import { checkAuth } from 'MySDK/auth-sdk'
import { set } from 'idb-keyval' // https://www.npmjs.com/package/idb-keyval

const exceptMenuAndHeader = ['login', 'register', 'not-found'] // tambahkan disini jika perlu

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
    onBeforeMount() {
        this.initialRouteStream()
    },
    onBeforeUpdate() {
        this.initialRouteStream()
    },
    onAnyRouteError(path) {
        console.log(path)
        debugger
    },
    initialRouteStream() {
        if (this.anyRouteStream) this.anyRouteStream.end()
        this.anyRouteStream = route('(.*)')
        this.anyRouteStream.on.value(this.onAnyRoute)
        this.anyRouteStream.on.error(this.onAnyRouteError)
        this.anyRouteStream.on.end(console.log)
    },
    onAnyRoute(path) {
        const activePage = pages.find(p => match(path.pathname, toRegexp(p.path)))
        const newState = {
            activePage,
            showLogin: false,
            showNotFound: false,
            showHeader: false,
            showLeftMenu: false,
            showRestriction: false
        }
        if (!activePage) {
            newState['showNotFound'] = true
            this.update(newState)
            return null
        }
        console.log('active-page', activePage.label)
        if (activePage.label != 'Login') {
            this.checkAuth()
                .catch((err) => {
                    if (err.response.status === 402) {
                        if (!activePage) return null
                        if (activePage && activePage.label !== 'Login') goTo('/auth/login')
                    }
                    return false
                })
                .then((res) => {
                    if (res) {
                        if (exceptMenuAndHeader.indexOf(activePage.label) === -1) {
                            newState['showHeader'] = true
                            newState['showLeftMenu'] = true
                        }
                        newState['showLogin'] = false
                        newState['showNotFound'] = !activePage
                        this.update(newState)
                    } else {
                        newState['showLogin'] = true
                        newState['showNotFound'] = !activePage
                        this.update(newState)
                    }
                })
        }
    },
    onBeforeUnmount() {
        this.anyRouteStream.end()
    },
    onMounted() {
        const token = getQueryParams('token')
        if (token) set('app_token', token)
    },
    /* onMounted() {
        if (!this.state.showLogin) {
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
            this.listenUrlChanged()
        }
    }, */
    async checkAuth() {
        return await checkAuth()
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
import { result, find, each } from 'lodash'
import { p } from 'MyHelpers/utilities'

import logoRipple10 from 'MyThemeImages/components/logos/ripple10.svg'

import { getClientProjects } from 'MySDK/projects-sdk'

const APP = {}

export default {
    onBeforeMount() {
        this.logo = logoRipple10
        this.AuthToken = localStorage.AuthToken || ''
        this.clientid = localStorage.clientid || ''
        this.active = false
        this.active1 = false
        this.menuPermission
        this.profileImage = localStorage.images
        this.profileName = localStorage.name
        this.permission
        this.lefside = false
        this.subTrendings = false
        this.subInfographic = false
        
        this.PR = Number(localStorage.PR)
        this.DH = Number(localStorage.DH)
        this.BT = Number(localStorage.BT)
        this.CC = Number(localStorage.CC)
        this.showAA = this.DH + this.BT
        
        this.packageRest = {}
        this.packageRest['summary'] = false
        this.packageRest['trendings'] = false
        this.packageRest['mentions'] = false
        this.packageRest['streams'] = false
        this.packageRest['authors'] = false
        this.packageRest['analysis'] = false
        this.packageRest['comparison'] = false
        this.packageRest['infographic'] = false
        this.packageRest['correction'] = false
        this.packageRest['pr_dashboard'] = false
        this.packageRest['project_settings'] = false
        this.packageRest['command_center'] = false

        this.menuActive = {
            streams: '',
            analysis: '',
            mystream: '',
            advance_analysis: '',
            competitiveness: '',
            pr_dashboard: '',
            buzz_tracking: '',
            dhi: '',
            cc: '',
            project_settings: '',
            Correction: '',
            download: '',
            donwloadcharts : '',
            trendings : '',
            "subTrendings.twitter.global" : '',
            "subTrendings.twitter.indonesia" : '',
            "subTrendings.google.indonesia" : ''
        }
    },
    onMounted() {
        this.getavailablekeyword()
        this.UrlProject = p('project') ? p('project') : APP.getProject()
        
        if(localStorage.Project_devault){
            this.projectId = localStorage.Project_devault
        } else {
            this.projectId = this.UrlProject
        }
        localStorage.setItem('prj', this.UrlProject)
        localStorage.setItem('prjId', this.projectId)
        if (localStorage.maxdate) {
            var maxStreams = localStorage.maxdate
        }
        if (maxStreams != null && maxStreams != '' && maxStreams != 'null') {
            this.lefside = true
        } else {
            this.lefside = false
        }
    
        this.update({
            name: Auth.name,
        })
    
        this.infographicBrand()
        this.infographicCompetition()
        this.packageRestriction()
        this.listener()
    },
    onBeforeUnmount() {

    },
    listener() {
        this.listenUpdateLeftside()
        this.listenMenuActivated()
        this.listenUrlProject()
        this.listenUrlChanged()
        this.listenMenuImage()
    },
    listenUpdateLeftside(){
        Streams.on('update-leftside', data => {
            const UrlProject = p('project') ? p('project') : APP.getProject()
            this.activePermission = find(data, {
                'id': parseInt(UrlProject)
            })
            if (this.activePermission) {
                this.PR = Number(this.activePermission.pr)
                this.BT = Number(this.activePermission.bt)
                this.DH = Number(this.activePermission.hi)
                this.CC = Number(this.activePermission.cc)
                this.showAA = this.DH + this.BT
                localStorage.setItem('PR', this.PR)
                localStorage.setItem('BT', this.BT)
                localStorage.setItem('DH', this.DH)
                localStorage.setItem('CC', this.CC)
                this.update()
            }
            this.update()
        })
    },
    listenMenuActivated(){
        menuActive.on('activated', (keys) => {
            each(keys, (key) => {
                if (key === 'analysis' || key === 'advance_analysis') {
                    this.menuActive[key] = 'open'
                    if (key === 'analysis') {
                        this.active = true
                    }
                    if (key === 'advance_analysis') {
                        this.active1 = true
                    }
                } else if (key.indexOf("subTrendings") > -1) {
                    this.menuActive[key] = 'active'
                    this.menuActive["trendings"] = 'active'
                } else {
                    this.menuActive[key] = 'active'
                    if (this.menuActive.buzz_tracking == 'active') {
                        this.displayblock = 'block'
                    }
                    if (this.menuActive.dhi == 'active') {
                        this.displayblock = 'block'
                    }
                }
            })
        })
    },
    listenUrlProject(){
        urlStream.on('Urlproject', (url) => {
            this.UrlProject = url
            this.update()
        })
    },
    listenUrlChanged(){
        urlStream.on('changeUrl', (url) => {
            logInfo('leftside : changeUrl trigger')
            if (url == 'analysis/mystream') {
                this.active = true
                this.update({
                    active: true
                })
            }
        })
    },
    listenMenuImage() {
        menu.on('image', (data) => {
            this.profileImage = data
            localStorage.setItem('images', this.profileImage)
        
            menu.trigger('fotoupdate', data)
            this.update()
        })
    },
    listenNamePprofile() {
        NameProfile.on('nameprofile', (data) => {
            this.profileName = data.fullname
            localStorage.setItem('name', this.profileName)
            this.update()
        })
    },
    collapseMenu(e){
        if ($('body').hasClass('collapsed-menu') && $('#btnLeftMenu').is(':visible')) {
            $('body').removeClass('expand-menu')
            var menuText = $('.menu-item-label')
            menuText.addClass('op-lg-0-force')
            menuText.addClass('d-lg-none')
        }
    },
    toggleSubMenu(k) {
        this[k] = !this[k]
    },
    expandMenu(e) {
        if ($('body').hasClass('collapsed-menu') && $('#btnLeftMenu').is(':visible')) {
            $('body').addClass('expand-menu')
            // show current shown sub menu that was hidden from collapsed
            //$('.show-sub + .br-menu-sub').slideDown()
    
            let menuText = $('.menu-item-label')
            menuText.removeClass('d-lg-none')
            menuText.removeClass('op-lg-0-force')
        }
    },
    leftsidemenu(e) {
        var url = e.target.id
        if (url == "#analysis/my-stream?project=") {
            var projects = this.projectId
            if (!projects) {
                var projects = APP.getProject()
            }
        } else {
            var projects = this.UrlProject
            if (!projects) {
                var projects = APP.getProject()
            }
        }
        if (p('filter')) {
            var filteranalysis = '&filter=' + p('filter') + '&namefilter=' + p('namefilter')
            window.location = url + projects + filteranalysis
        } else {
            window.location = url + projects
        }
        this.update()
    },
    getavailablekeyword() {
        APP.apiGet({
            path: 'auth/get-restriction',
            data: {
                'type': 'menu'
            },
            success: function(maxmenu) {
                // this.packageRestriction(maxmenu)
                if (!localStorage.getItem('menu')) {
                    localStorage.setItem('menu', maxmenu)
                } else {
                    localStorage.menu = maxmenu
                }
                this.maxkeyword = maxmenu
                this.update()
            }.bind(this)
        })
    },
    packageRestriction() {
        //console.log('--',JSON.parse(localStorage.getItem('package')).menu)
        //var menuPackage = JSON.parse(localStorage.getItem('package')).menu
        //if(localStorage.menu){
        if (localStorage.menu) {
            var menuPackage = localStorage.menu.split(',')
    
        } else {
            if (JSON.parse(localStorage.getItem('package'))) {
                var menuPackage = JSON.parse(localStorage.getItem('package')).menu
            }
        }
        // console.log('menuPackage', menuPackage)
        if (menuPackage) {
            //console.log('menuPackage',menuPackage[0])
            if (menuPackage.length == 1) {
                this.packageRest['summary'] = true
                this.packageRest['trendings'] = true
                this.packageRest['mentions'] = true
                this.packageRest['streams'] = true
                this.packageRest['authors'] = true
                this.packageRest['analysis'] = true
                this.packageRest['comparison'] = true
                this.packageRest['infographic'] = true
                this.packageRest['pr_dashboard'] = true
                this.packageRest['project_settings'] = true
                this.packageRest['command_center'] = true
                this.packageRest['correction'] = true
            } else {
                each(menuPackage, (keymenu) => {
                    if (keymenu === 'summary') {
                        this.packageRest['summary'] = true
                    } else if (keymenu === 'trendings') {
                        this.packageRest['trendings'] = true
                    } else if (keymenu === 'project_settings') {
                        this.packageRest['project_settings'] = true
                    } else if (keymenu === 'mentions') {
                        this.packageRest['mentions'] = true
                    } else if (keymenu === 'authors') {
                        this.packageRest['authors'] = true
                    } else if (keymenu === 'infographic') {
                        this.packageRest['infographic'] = true
                    } else if (keymenu === 'analysis') {
                        this.packageRest['analysis'] = true
                    } else if (keymenu === 'pr_dashboard') {
                        this.packageRest['pr_dashboard'] = true
                    } else if (keymenu === 'comparison') {
                        this.packageRest['comparison'] = true
                    } else if (keymenu === 'command_center') {
                        this.packageRest['command_center'] = true
                    } else if (keymenu === 'correction') {
                        this.packageRest['correction'] = true
                    }
                    // this.update()
                })
            }
        }
        this.update()
    },
    async infographicBrand() {
        var prj = p('project') ? p('project') : APP.getProject()
        var sdate = localStorage.since
        var ndate = localStorage.until
        var userid = localStorage.userid
        var url = APP.appInfographicBrandUrl
        var data = {
            project: prj,
            selected_fields: 'key_id, temporary_token'
        }
        const response = await getClientProjects(data)
        let urlval = url.replace('<project>', prj)
            .replace('<sdate>', sdate)
            .replace('<ndate>', ndate)
            .replace('<userid>', userid)
            .replace('<tmp_token>', response.temporary_token)
        this.urlInfographic = (urlval + '&AuthToken=' + localStorage.AuthToken)
        // this.update()
    },
    infographicCompetition() {
        var prj = p('project') ? p('project') : APP.getProject()
        var sdate = localStorage.since
        var ndate = localStorage.until
        var userid = localStorage.userid
        var url = APP.appInfographicUrl
        var data = {
            project: prj,
            selected_fields: 'key_id, temporary_token'
        }
        APP.apiGet({
            path: 'projects',
            data: data,
            success: (res) => {
                res = result(res, '[0]', {})
                let urlval = url.replace('<project>', prj)
                    .replace('<sdate>', sdate)
                    .replace('<ndate>', ndate)
                    .replace('<userid>', userid)
                    .replace('<tmp_token>', res.temporary_token)
                this.urlInfographicCompetition = (urlval + '&AuthToken=' + localStorage.AuthToken)
                this.update()
    
                // window.open(url + '&AuthToken=' + localStorage.AuthToken)
            }
        })
    },
    commandCenter() {
        var prj = p('project') ? p('project') : APP.getProject()
        var data = {
            project: prj,
            selected_fields: 'key_id, temporary_token'
        }
        APP.apiGet({
            path: 'projects',
            data: data,
            success: function(res) {
                each(res, (x) => {
                    const url = APP.appCCUrl.replace('<prj>', x.key_id)
                        .replace('<no>', 1)
                        .replace('<tmp_token>', x.temporary_token)
                    window.open(url)
                })
            }.bind(this)
        })
    
    },
    commandCenter1() {
        var prj = p('project') ? p('project') : APP.getProject()
        var data = {
            project: prj,
            selected_fields: 'key_id, temporary_token'
        }
        APP.apiGet({
            path: 'projects',
            data: data,
            success: function(res) {
                each(res, (x) => {
                    const url = APP.appCCUrl.replace('<prj>', x.key_id)
                        .replace('<no>', 2)
                        .replace('<tmp_token>', x.temporary_token)
                    window.open(url)
                })
            }.bind(this)
        })
    
    },
    commandCenter2() {
        var prj = p('project') ? p('project') : APP.getProject()
        var data = {
            project: prj,
            selected_fields: 'key_id, temporary_token'
        }
        APP.apiGet({
            path: 'projects',
            data: data,
            success: function(res) {
                each(res, (x) => {
                    const url = APP.appCCUrl.replace('<prj>', x.key_id)
                        .replace('<no>', 3)
                        .replace('<tmp_token>', x.temporary_token)
                    window.open(url)
                })
            }.bind(this)
        })
    }
}

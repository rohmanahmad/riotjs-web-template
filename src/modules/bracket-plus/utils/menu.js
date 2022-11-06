import { result, find, each } from 'lodash'
import { p, jquery } from 'MyHelpers/utilities'
import { getClientProjects } from 'MySDK/projects-sdk'
import { myRestriction } from 'MySDK/auth-sdk'
import { getProject, Streams, MenuActive, urlStream, menu } from 'MyHelpers/bracket-plus'
import { getStorage, changeStorage } from 'MyHelpers/storage'
import { logInfo } from 'MyHelpers/logs'
import Auth from 'MyHelpers/auth'

import logoRipple10 from 'MyThemeImages/components/logos/ripple10.svg'

import summaryIcon from 'MyThemeImages/components/icons/summary-baru.png'
import trendIcon from 'MyThemeImages/components/icons/trends.ico'
import mentionsIcon from 'MyThemeImages/components/icons/chat-baru.png'
import authorsIcon from 'MyThemeImages/components/icons/group-baru.png'
import analysisIcon from 'MyThemeImages/components/icons/signal-baru.png'
import comparisonIcon from 'MyThemeImages/components/icons/comparison-baru.png'
import buzzerIcon from 'MyThemeImages/components/icons/bullhorn-baru.png'
import healthIcon from 'MyThemeImages/components/icons/flash-baru.png'
import infographicIcon from 'MyThemeImages/components/icons/pie-baru.png'
import reportIcon from 'MyThemeImages/components/icons/download-baru.png'
import correctionIcon from 'MyThemeImages/components/icons/edit-baru.png'
import httpsIcon from 'MyThemeImages/components/icons/monitor-baru.png'
import downloadIcon from 'MyThemeImages/components/icons/download-baru.png'
import settingIcon from 'MyThemeImages/components/icons/setting-baru.png'


export default {
    logos: {
        logoRipple10,
        // menu
        summaryIcon,
        trendIcon,
        mentionsIcon,
        authorsIcon,
        analysisIcon,
        comparisonIcon,
        buzzerIcon,
        healthIcon,
        infographicIcon,
        reportIcon,
        correctionIcon,
        httpsIcon,
        downloadIcon,
        settingIcon,
    },
    onBeforeMount() {
        this.AuthToken = getStorage('AuthToken' || '')
        this.clientid = getStorage('clientid' || '')
        this.active = false
        this.active1 = false
        this.menuPermission
        this.profileImage = getStorage('images')
        this.profileName = getStorage('name')
        this.permission
        this.lefside = false
        this.subTrendings = false
        this.subInfographic = false
        
        this.PR = Number(getStorage('PR'))
        this.DH = Number(getStorage('DH'))
        this.BT = Number(getStorage('BT'))
        this.CC = Number(getStorage('CC'))
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
        this.UrlProject = p('project') ? p('project') : getProject()
        
        if(getStorage('defaultProject')){
            this.projectId = getStorage('defaultProject')
        } else {
            this.projectId = this.UrlProject
        }
        changeStorage('prj', this.UrlProject)
        changeStorage('prjId', this.projectId)
        if (getStorage('maxdate')) {
            var maxStreams = getStorage('maxdate')
        }
        if (maxStreams != null && maxStreams != '' && maxStreams != 'null') {
            this.lefside = true
        } else {
            this.lefside = false
        }
    
        this.update({
            name: Auth.name,
        })
    
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
            const UrlProject = p('project') ? p('project') : getProject()
            this.activePermission = find(data, {
                'id': parseInt(UrlProject)
            })
            if (this.activePermission) {
                this.PR = Number(this.activePermission.pr)
                this.BT = Number(this.activePermission.bt)
                this.DH = Number(this.activePermission.hi)
                this.CC = Number(this.activePermission.cc)
                this.showAA = this.DH + this.BT
                changeStorage('PR', this.PR)
                changeStorage('BT', this.BT)
                changeStorage('DH', this.DH)
                changeStorage('CC', this.CC)
                this.update()
            }
            this.update()
        })
    },
    listenMenuActivated(){
        MenuActive.on('activated', (keys) => {
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
            changeStorage('images', this.profileImage)
        
            menu.trigger('fotoupdate', data)
            this.update()
        })
    },
    listenNamePprofile() {
        NameProfile.on('nameprofile', (data) => {
            this.profileName = data.fullname
            changeStorage('name', this.profileName)
            this.update()
        })
    },
    collapseMenu(e){
        if (jquery('body').hasClass('collapsed-menu') && jquery('#btnLeftMenu').is(':visible')) {
            jquery('body').removeClass('expand-menu')
            var menuText = jquery('.menu-item-label')
            menuText.addClass('op-lg-0-force')
            menuText.addClass('d-lg-none')
        }
    },
    toggleSubMenu(k) {
        this[k] = !this[k]
    },
    expandMenu(e) {
        if (jquery('body').hasClass('collapsed-menu') && jquery('#btnLeftMenu').is(':visible')) {
            jquery('body').addClass('expand-menu')
            // show current shown sub menu that was hidden from collapsed
            //jquery('.show-sub + .br-menu-sub').slideDown()
    
            let menuText = jquery('.menu-item-label')
            menuText.removeClass('d-lg-none')
            menuText.removeClass('op-lg-0-force')
        }
    },
    leftsidemenu(e) {
        var url = e.target.id
        if (url == "#analysis/my-stream?project=") {
            var projects = this.projectId
            if (!projects) {
                var projects = getProject()
            }
        } else {
            var projects = this.UrlProject
            if (!projects) {
                var projects = getProject()
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
        myRestriction({ 'type': 'menu' })
            .then((myMenu) => {
                if (!getStorage('menu')) {
                    changeStorage('menu', myMenu)
                }
                this.maxkeyword = myMenu
                this.update()
            })
    },
    packageRestriction() {
        //console.log('--',JSON.parse(getStorage('package')).menu)
        //var menuPackage = JSON.parse(getStorage('package')).menu
        //if(getStorage('menu')){
        if (getStorage('menu')) {
            var menuPackage = getStorage('menu').split(',')
    
        } else {
            if (JSON.parse(getStorage('package'))) {
                var menuPackage = JSON.parse(getStorage('package')).menu
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
    /* async infographicBrand() {
        var prj = p('project') ? p('project') : getProject()
        var sdate = getStorage('since')
        var ndate = getStorage('until')
        var userid = getStorage('userid')
        var url = INFOGRAPHIC_BRAND_URL
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
        this.urlInfographic = (urlval + '&AuthToken=' + getStorage('AuthToken'))
        // this.update()
    }, */
    /* infographicCompetition() {
        var prj = p('project') ? p('project') : getProject()
        var sdate = getStorage('since')
        var ndate = getStorage('until')
        var userid = getStorage('userid')
        var url = INFOGRAPHIC_COMPETITION_URL
        var data = {
            project: prj,
            selected_fields: 'key_id, temporary_token'
        }
        getClientProjects(data)
            .then(res => {
                res = result(res, '[0]', {})
                let urlval = url.replace('<project>', prj)
                    .replace('<sdate>', sdate)
                    .replace('<ndate>', ndate)
                    .replace('<userid>', userid)
                    .replace('<tmp_token>', res.temporary_token)
                this.urlInfographicCompetition = (urlval + '&AuthToken=' + getStorage('AuthToken'))
                this.update()
            })
    }, */
    commandCenter() {
        var prj = p('project') ? p('project') : getProject()
        var data = {
            project: prj,
            selected_fields: 'key_id, temporary_token'
        }
        getClientProjects(data)
            .then(res => {
                each(res, (x) => {
                    const url = COMMAND_CENTER_URL.replace('<prj>', x.key_id)
                        .replace('<no>', 1)
                        .replace('<tmp_token>', x.temporary_token)
                    window.open(url)
                })
            })
    },
    commandCenter1() {
        var prj = p('project') ? p('project') : getProject()
        var data = {
            project: prj,
            selected_fields: 'key_id, temporary_token'
        }
        getClientProjects(data)
            .then(res => {
                each(res, (x) => {
                    const url = COMMAND_CENTER_URL.replace('<prj>', x.key_id)
                        .replace('<no>', 2)
                        .replace('<tmp_token>', x.temporary_token)
                    window.open(url)
                })
            })
    },
    commandCenter2() {
        var prj = p('project') ? p('project') : getProject()
        var data = {
            project: prj,
            selected_fields: 'key_id, temporary_token'
        }
        getClientProjects(data)
            .then(res => {
                each(res, (x) => {
                    const url = COMMAND_CENTER_URL.replace('<prj>', x.key_id)
                        .replace('<no>', 3)
                        .replace('<tmp_token>', x.temporary_token)
                    window.open(url)
                })
            })
    }
}

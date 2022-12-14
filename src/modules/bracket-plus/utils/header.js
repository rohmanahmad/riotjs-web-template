// import {filter, map, orderBy, each, update} from 'lodash'

import { getStorage, clearDB } from 'MyHelpers/storage'
// import { jquery } from 'MyHelpers/bracket-plus'
import { getQueryParams, goTo } from 'MyHelpers/utilities'
import { logInfo, logError } from 'MyHelpers/logs'
import { dialog } from 'MyHelpers/alerts'
import { getUserProfile, myAllProjects, myCurrentProject } from 'MyHelpers/bracket-plus'
import noImage from 'MyThemeImages/components/icons/no-image.png'
import 'bootstrap/js/src/dropdown'

export default {
    state: {
        profileId: null,
        profileName: null,
        profileAvatar: null,
        lastLogin: null,
        currentProjects: [],
        multipleSelected: false,
        projects: [],
        recentProjects: [],
        checkAll: false,
        isShowMore: false
    },
    onBeforeMount() {
        getUserProfile()
            .then(res => this.update(res))
        myAllProjects()
            .then(projects => {
                let updatedState = { projects }
                if (projects.length > 10) updatedState['isShowMore'] = true
                if (this.state.recentProjects.length === 0) {
                    const recentProjects = JSON.parse(
                        getStorage('recent_projects', JSON.stringify(projects))
                    )
                    updatedState['recentProjects'] = recentProjects
                }
                this.update(updatedState)
            })
        myCurrentProject()
            .then(currentProjects => {
                let multipleSelected = false
                if (currentProjects.length > 1) {
                    multipleSelected = true
                }
                this.update({ currentProjects, multipleSelected })
            })
    },
    onMounted() {
        // this.project()
        // if (localStorage.maxdate) {
        //     var maxStreams = localStorage.maxdate
        // }
        // if (maxStreams != null && maxStreams != '' && maxStreams != 'null') {
        //     this.lefside = true
        // } else {
        //     this.lefside = false
        // }
        // this.getavailableChannel()
        // jquery(document).on('click', '.stay-open .dropdown-menu', function (e) {
        //     e.stopPropagation()
        // })
        // this.listenUrlStream()
    },
    onBeforeUpdate() {},
    onBeforeUnmount() {},
    /* listenUrlStream() {
        urlStream.on('changeUrl', (url) => {
            logInfo('header : changeUrl trigger')
            this.currentUrlStream = url
            this.update()
        })
    }, */
    getNoImage(e) {
        e.target.src = noImage
    },
    toggleCheckSelectedProject(e) {
        let target = e.target
        let isTarget = false
        while(!isTarget) {
            if (target.tagName === 'LI') isTarget = true
            else target = target.parentElement
        }
        const projectId = parseInt(target.dataset.projectId)
        if (!projectId) console.error('Invalid Project Id')
        let projects = []
        for (const project of this.state.projects) {
            if (project.key_id === projectId) {
                project.selected = !project.selected
            }
            projects.push(project)
        }
        const recentProjects = this.updateRecentProjects(projectId)
        this.update({projects, recentProjects})
    },
    updateRecentProjects(projectId) {
        let recentProjects = []
        for (const project of this.state.recentProjects) {
            if (project.key_id === projectId) {
                project.selected = !project.selected
            }
            recentProjects.push(project)
        }
        return recentProjects
    },
    submitSelectedProjects() {
        const selectedPrj = this.state.projects.filter(x => x.checked).map(x => x.id)
        debugger
        if (selectedPrj.length === 0) {
            logError('No Project Selected')
        } else {
            window.location = `#${ this.currentUrlStream }?project=${ selectedPrj.join(',') }`
        }
    },
    doLogout(e) {
        e.preventDefault()
        dialog({
            title: 'Logout?'
        }, result => {
            if (!result.isConfirmed) return logInfo('Canceled')
            clearDB()
                .then(() => goTo('/auth/login'))
        })
    },
    toggleSelectAllProjects(e) {
        e.preventDefault()
        if (this.state.checkAll) {

        }
        this.update({ checkAll: !this.state.checkAll })
    },
    // 
    /* getavailableChannel() {
        myRestriction({ 'type': 'max_date' })
            .then(dateRestriction => {
                setTimeout(() => {
                    localStorage.setItem('maxdate', dateRestriction)
                }, 1000)
                this.update()
            })
    },
    resetSearch() {
        let isDDShown = !jquery('.br-header-left > .dropdown > .dropdown-menu.dropdown-menu-header').hasClass('show')
        if (isDDShown) {
            jquery('input[name=search_project]').val('')
        }
        setTimeout(() => {
            jquery('input[name=search_project]').focus()
        }, 200)
        if (this.isSearcingProject) {
            this.isSearcingProject = false
            // this.recentProject = this.recentTemp
        }
    },
    reArrangeRecent(res, defaultChecked) {
        let firstRecentIndex = -1
        res.some(function(item, index) {
            if (defaultChecked.indexOf(item.key_id) >= 0 && firstRecentIndex < 0) {
                firstRecentIndex = index
                return index
            }
        })
        //jika di index 0 (atau urutan pertama), maka dibiarkan saja
        //jika di index 1 (atau urutan berikutnya), maka di taruh ke paling awal
        if (firstRecentIndex > 0) {
            let first = res[firstRecentIndex]
            delete res[firstRecentIndex]
            res.unshift(first)
            //memfilter yang telah dihapus
            res = res.filter((e) => {
                return !!e
            })
            localStorage.setItem('projects', JSON.stringify(res))
        }
        return res
    },
    norequestProject(res) {
        let projectData = getQueryParams('project', '')
        let selectedProjects = []
        if (projectData) {
            var prj = p('project') ? p('project') : getProject().toString()
            var defaultChecked = prj.split(",").map(Number)
            res = this.reArrangeRecent(res, defaultChecked)
            let xgropProject = filter(res, (val) => {
                return val.key_item_keyword == prj
            })
            var pro = map(res, function(item, index) {
                return {
                    id: item.key_id,
                    date: moment(item.key_start_date).format('DD MMMM YYYY'),
                    name: item.key_name,
                    color: item.key_color,
                    hi: item.key_is_health_index,
                    bt: item.key_is_buzzer_tracking,
                    pr: item.key_is_prdashboard,
                    cc: item.key_is_cc,
                    keyItemkeyWord: item.key_item_keyword
                }
            })
            var permissionTmp = map(res, function(item) {
                return {
                    id: item.key_id,
                    hi: item.key_is_health_index,
                    bt: item.key_is_buzzer_tracking,
                    pr: item.key_is_prdashboard,
                    cc: item.key_is_cc
                }
            })
            Streams.trigger('update-leftside', permissionTmp)
            this.selectedProject = false
            let dataGroupProject = []
            if(xgropProject.length > 0){
                let gropupRoject = [xgropProject[0].key_name]
                pro.forEach((i, key) => {
                    if (gropupRoject.indexOf(i.name) > -1) {
                        i.checked = true
                        selectedProjects.push(i)
                        if (!this.selectedProject) {
                            this.selectedProject = i
                            breadCrumb.project = i
                            // breadCrumb.trigger('updateProject',i)
                        }
                    } else {
                        i.checked = false
                    }
                    dataGroupProject.push(i)
                })
                let sorProject = orderBy(dataGroupProject, 'checked', 'desc') 
                this.projects = sorProject
                this.update()
            } else {
                pro.forEach((i, key) => {
                    if (defaultChecked.indexOf(i.id) > -1) {
                        i.checked = true
                        selectedProjects.push(i)
                        if (!this.selectedProject) {
                            this.selectedProject = i
                            breadCrumb.project = i
                            // breadCrumb.trigger('updateProject',i)
                        }
                    } else {
                        i.checked = false
                    }
                    dataGroupProject.push(i)
                })
                this.projects = dataGroupProject
                this.update()
            }
            this.allProjectIds = pro.map(x => x.id).join(',')
            // this.recentProject = this.projects
            if (defaultChecked && defaultChecked.length > 1) {
                this.activeProjects = {name: 'Combined Projects', id: 0}
            } else if (selectedProjects && selectedProjects.length > 1) {
                this.activeProjects = {name: 'Combined Projects', id: 0}
            } else {
                if (selectedProjects[0]) this.activeProjects = selectedProjects[0]
                else this.activeProjects = {name: this.projects[0]['name'], id: this.projects[0]['id']}
            }
            this.update()
        }
    },
    projectsetting() {
        window.location = "#project?project=" + localStorage.prjId
    },
    burgerClick(e) {
        e.preventDefault()
        let sidebarClass = undefined === localStorage.sidebar ? '' : localStorage.sidebar
        localStorage.sidebar = sidebarClass.length ? '' : 'collapsed-menu'
        menu.trigger('sidebar')
        setTimeout(() => {
            jquery(Highcharts.charts).each(function(i, chart) {
                if (chart) {
                    var height = chart.renderTo.clientHeight
                    var width = chart.renderTo.clientWidth
                    chart.setSize(width, height)
                }
            })
        }, 500)
        return false
    },
    project() {
        var data = {
            selected_fields: 'key_id, key_name,key_start_date, key_color , key_id, key_is_buzzer_tracking, key_is_health_index, key_is_prdashboard ,key_is_cc'
        }
        if (getStorage('projects') != null && getStorage('projects') != '') {
            this.norequestProject(JSON.parse(getStorage('projects')))
        } else {
            myProjects(data)
                .then(myProjects => {
                    localStorage.setItem('projects', JSON.stringify(myProjects))
                    this.norequestProject(myProjects)
                })
        }
    },
    searchProject(e) {
        this.searchResult = []
        let searchText = e.target.value
        each(this.projects, (i) => {
            if (i.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 && this.searchResult.length <= this.maxRecent) {
                this.searchResult.push(i)
            }
        })
        if (searchText.length > 0) {
            if (!this.isSearcingProject) {
                // this.recentTemp = this.recentProject
            }
            this.isSearcingProject = true
            // this.recentProject = this.searchResult
        } else {
            this.isSearcingProject = false
            // this.recentProject = this.recentTemp
        }
    },
    showLeft(e) {
        debugger
        e.preventDefault()
        this.ontotal = this.ontotal + 1
        if (this.ontotal == 1) {
            this.onshow = 'show-left'
            menuleft.trigger('show-left', this.onshow)
            return false
        } else {
            menuleft.trigger('show-left', '')
            this.ontotal = 0
        }
    } */
}
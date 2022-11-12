import { head } from 'lodash'
import Auth from './auth'
import $ from 'jquery'
import { get } from 'idb-keyval' // https://www.npmjs.com/package/idb-keyval

export const jquery = $

export const initiateMenu = () => {
    $(document).ready(function() {
        var parentHeight = parseInt($(".leftside").css("height"))
        $(".sidebar .col-xs-12.nopadding").css("height", parentHeight - 200 + "px")
    })
}

export const getProject = () => {
    if (!Auth.projects) return null
    if (Auth.projects.length != 0) {
        return currentProject ? currentProject : head(Auth.projects).id
    }
}

// export const MenuActive = observable()
// export const Streams = observable()
// export const urlStream = observable()
// export const menu = observable()
// export const menuleft = observable()
// export const NameProfile = observable()
// export const maxStreams = observable()
// export const menuActive = observable()
// export const breadCrumb = observable()
// export const renderchart = observable()
// export const renderchartpie = observable()
// export const rendercharttoptime = observable()
// export const error = observable()

const myMenuFn = async () => {
    const menu = await get('package_menu')
    return menu
}
export const myMenu = myMenuFn

export const myAllProjects = async () => {
    const projectOwn = await get('my_projects')
    const projectCompetitor = await get('competitor_projects')
    return [...(projectOwn || []), ...(projectCompetitor || [])]
}

export const myCurrentProject = async () => {
    const currentProject = await get('current_project')
    return currentProject
}

import summaryIcon from 'MyThemeImages/components/icons/summary-baru.png'
import trendIcon from 'MyThemeImages/components/icons/trends.ico'
import mentionsIcon from 'MyThemeImages/components/icons/chat-baru.png'
import authorsIcon from 'MyThemeImages/components/icons/group-baru.png'
import analysisIcon from 'MyThemeImages/components/icons/signal-baru.png'
import comparisonIcon from 'MyThemeImages/components/icons/comparison-baru.png'
import buzzerIcon from 'MyThemeImages/components/icons/bullhorn-baru.png'
import healthIcon from 'MyThemeImages/components/icons/flash-baru.png'
import profileAnalysisIcon from 'MyThemeImages/components/icons/social-people.png'
import oceanIcon from 'MyThemeImages/components/icons/ocean_analysis_alt.png'
import infographicIcon from 'MyThemeImages/components/icons/pie-baru.png'
import generatorIcon from 'MyThemeImages/components/icons/download-baru.png'
import correctionIcon from 'MyThemeImages/components/icons/edit-baru.png'
import commandCenterIcon from 'MyThemeImages/components/icons/monitor-baru.png'
import downloadIcon from 'MyThemeImages/components/icons/download-baru.png'
import settingIcon from 'MyThemeImages/components/icons/setting-baru.png'

const trendingChilds = [
    {title: 'Twitter Indonesia', name: 'trendings-twitter-id', link: '/dashboard/trendings/twitter-id'},
    {title: 'Twitter Global', name: 'trendings-twitter-glob', link: '/dashboard/trendings/twitter-glob'},
    {title: 'Google Indonesia', name: 'trendings-google-id', link: '/dashboard/trendings/google-id'}
]
const infographicChilds = [
    {target: '_blank', title: 'My Brand', name: 'infographic-brand', link: '/dashboard/infographic/brand'},
    {target: '_blank', title: 'Competitor', name: 'infographic-competitor', link: '/dashboard/infographic/competitor'}
]
const allMappingMenu = {
    'summary': {hasChild: false, title: 'Summary', logo: summaryIcon, link: '/dashboard/summaries'},
    'trendings': {hasChild: true, title: 'Trendings', logo: trendIcon, childs: trendingChilds},
    'mentions': {hasChild: false, title: 'Mentions', logo: mentionsIcon, link: '/dashboard/mentions'},
    'authors': {hasChild: false, title: 'Authors', logo: authorsIcon, link: '/dashboard/authors'},
    'analysis': {hasChild: false, title: 'Analysis', logo: analysisIcon, link: '/dashboard/analysis'},
    'comparison': {hasChild: false, title: 'Comparison', logo: comparisonIcon, link: '/dashboard/comparison'},
    'profile_analysis': {hasChild: false, title: 'Profile Analysis', logo: profileAnalysisIcon, link: '/dashboard/profile-analysis'},
    'ocean': {hasChild: false, title: 'O-C-E-A-N', logo: oceanIcon, link: '/dashboard/ocean'},
    'buzzer_tracking': {hasChild: false, title: 'Buzzer Tracking', logo: buzzerIcon, link: '/dashboard/buzzer-tracking'},
    'dhi': {hasChild: false, title: 'Digital Health Index', logo: healthIcon, link: '/dashboard/dhi'},
    // 'pr_dashboard': {hasChild: false, title: 'PR Dashboard', logo: '', link: '/dashboard/pr-dashboard'},
    'infographic': {hasChild: true, title: 'Infographics', logo: infographicIcon, childs: infographicChilds},
    'generator': {hasChild: false, title: 'Generate Charts', logo: generatorIcon, link: '/dashboard/generator'},
    'correction': {hasChild: false, title: 'Correction', logo: correctionIcon, link: '/dashboard/correction'},
    'command-center': {hasChild: false, title: 'Command Center', logo: commandCenterIcon, link: '/dashboard/command-center'},
    'downloads': {hasChild: false, title: 'Download', logo: downloadIcon, link: '/dashboard/downloads'},
    'project_settings': {hasChild: false, title: 'Project Settings', logo: settingIcon, link: '/dashboard/project-settings'}
}
export const myMenuRoutes = async () => {
    const myMenu = await myMenuFn()
    let finalMenu = []
    for (const name in allMappingMenu) {
        const currentMenu = allMappingMenu[name]
        if (myMenu.indexOf(name) > -1) finalMenu.push({...currentMenu, name, class: currentMenu.hasChild ? 'trigger-child' : ''})
    }
    return finalMenu
}

export const getUserProfile = async () => {
    const profileId = await get('user_id')
    const profileName = await get('user_name')
    const profileAvatar = await get('user_profile_avatar')
    const lastLogin = await get('last_login')
    return {
        profileId,
        profileName,
        profileAvatar,
        lastLogin
    }
}

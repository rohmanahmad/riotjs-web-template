// import observable from '@riotjs/observable'
import { head } from 'lodash'
import { getStorage } from './storage'
import Auth from './auth'
import $ from 'MyThemeVendors/jquery/jquery'
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
    return [...(projectOwn || []), ...(projectCompetitor || [])].map(x => x.key_id)
}

export const myCurrentProject = async () => {
    return await get('current_project')
}

const mappingMenu = {
    
}
export const myMenuRoutes = async () => {
    const myMenu = await myMenuFn()

}
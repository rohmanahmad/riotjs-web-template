import observable from '@riotjs/observable'
import { head } from 'lodash'
import { getStorage } from './storage'
import Auth from './auth'

export const initiateMenu = () => {
    $(document).ready(function() {
        var parentHeight = parseInt($(".leftside").css("height"))
        $(".sidebar .col-xs-12.nopadding").css("height", parentHeight - 200 + "px")
    })
}

export const currentProject = () => {
    return getStorage('CURRENT_PROJECT')
}

export const getProject = () => {
    if (!Auth.projects) return null
    if (Auth.projects.length != 0) {
        return currentProject ? currentProject : head(Auth.projects).id
    }
}

export const MenuActive = observable()
export const Streams = observable()
export const urlStream = observable()
export const menu = observable()
export const menuleft = observable()
export const NameProfile = observable()
export const maxStreams = observable()
export const menuActive = observable()
export const breadCrumb = observable()
export const renderchart = observable()
export const renderchartpie = observable()
export const rendercharttoptime = observable()
export const error = observable()

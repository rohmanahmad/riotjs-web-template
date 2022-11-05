import observable from '@riotjs/observable'
import $ from 'MyThemeVendors/jquery/jquery'

export const jquery = $

export const initiateMenu = () => {
    $(document).ready(function() {
        var parentHeight = parseInt($(".leftside").css("height"))
        $(".sidebar .col-xs-12.nopadding").css("height", parentHeight - 200 + "px")
    })
}

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

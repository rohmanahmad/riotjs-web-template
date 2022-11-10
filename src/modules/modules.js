import { Router, Route } from '@riotjs/route'

import lazy from '@riotjs/lazy'

import Loader from 'MyModule/utils/loader.riot'

import NotFound from 'MyModule/utils/not-found.riot'

import MenuApp from 'MyModule/utils/menu.riot'

import HeaderApp from 'MyModule/utils/header.riot'

import RestrictionNotif from 'MyModule/utils/restriction-notif.riot'

export default {
    Router,
    Route,
    NotFound,
    MenuApp,
    HeaderApp,
    RestrictionNotif,
    Home: lazy(Loader, () => {
        return import('MyModule/home/pages/home.riot')
    }),
    Register: lazy(Loader, () => {
        return import('MyModule/auth/pages/register.riot')
    }),
    Login: lazy(Loader, () => {
        return import('MyModule/auth/pages/login.riot')
    }),
    // dashboard
    DashboardSummary: lazy(Loader, () => {
        return import('MyModule/dashboard/pages/summary.riot')
    }),
}
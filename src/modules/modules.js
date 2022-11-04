import { Router, Route } from '@riotjs/route'

import lazy from '@riotjs/lazy'

import Loader from 'MyModule/utils/loader.riot'

import NotFound from 'MyModule/utils/not-found.riot'

export default {
    Router,
    Route,
    NotFound,
    Home: lazy(Loader, () => import('MyModule/home/pages/home.riot')),
    Register: lazy(Loader, () => import('MyModule/auth/pages/register.riot')),
    Login: lazy(Loader, () => import('MyModule/auth/pages/login.riot')),
}
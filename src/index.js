import '@riotjs/hot-reload'

import { component } from 'riot'

import MainLayout from './layouts/main-layout.riot'

import registerAllGlobalComponents from './register'

registerAllGlobalComponents()


component(MainLayout)(document.getElementById('app'))
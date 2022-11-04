import '@riotjs/hot-reload'

import { component } from 'riot'

import mainLayout from 'MyLayout/main.riot'

import registerAllGlobalComponents from './register'

registerAllGlobalComponents()

component(mainLayout)(document.getElementById('app'))
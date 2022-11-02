import { component, register, mount } from 'riot'
// import { route, router, setBase } from '@riotjs/route'

import routes from './modules/routes'
import modules from './modules/modules'

import mainLayout from './globals/layouts/main-layout.riot'

// const $app = document.getElementById('app')

// setBase('/')

// register all pages
alert
routes.forEach(item => {
    const { path, page } = item
    console.log('path', path)
    register(path, modules[page])
})

const appModule = component(mainLayout)($app)

// const router = (e) => {
//     console.log(e)
// }

// window.addEventListener('load', router)

mount('#app', {}, '/')
alert()

// router.on.value(path => {
//     console.log(path)
// })
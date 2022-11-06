'use strict'

import { changeStorage, getStorage } from "./storage"

class Auth {
    constructor () {
        this.name = null
        this.level = null
        this.projects = null
    }
    check() {
        return this.getToken()
    }

    login(cfg) {
        // console.log('login')
        this.name = null
        this.level = null
        this.projects = null

        if (cfg.token) {
            this.setToken(cfg.token)
        }

        if (cfg.name) {
            this.name = cfg.name
        }

        if (cfg.projects) {
            this.projects = cfg.projects
        }

        if (cfg.level) {
            this.level = cfg.level
        }

        changeStorage('AuthData', JSON.stringify(cfg))
    }

    releaseFromStorage() {
        if (!getStorage('AuthData')) {
            return false
        }

        const cfg = JSON.parse(getStorage('AuthData'))
        this.login(cfg)
    }

    user(key) {
        const keys = ['name', 'level', 'projects']

        if (this[key] && keys.indexOf(keys)) {
            return this[key]
        }

        if (!key) {
            return {
                name: this.name,
                level: this.level,
                projects: this.projects
            }
        }
    }

    logout() {
        localStorage.removeItem('AuthToken')
    }

    setToken(token) {
        changeStorage('AuthToken', token)
    }

    getToken() {
        var results = new RegExp('[\?&]token=([^&#]*)').exec(window.location.href)
        if (results != null) {
            localStorage.clear()
            return results[1] || 0

        }
        return getStorage('AuthToken')
    }
}

export default new Auth()
import { getStorage, changeStorage, getDB } from "MyHelpers/storage"
import { randomString, isCallbackFunction } from 'MyHelpers/utilities'
import moment from 'moment'

export default {
    state: {
        id: randomString(10, {onlyChars: true}),
        useCollector: false,
        dateOptions: {},
        // filters
        since: getStorage('filter_since'),
        until: getStorage('filter_since')
    },
    onBeforeMount() {
    },
    async onMounted() {
        const limitDate = await getDB('package_max_date')
        if (limitDate && limitDate !== 'null' && limitDate !== 'undefined') {
            const dateOptions = { maxDate: moment(limitDate) }
            this.update({ dateOptions })
        }
        if (this.props.collectorObject) {
            this.collector = this.props.collectorObject
            this.update({ useCollector: true })
        }
    },
    onBeforeUnmount() {},
    onUnmounted() {},
    callback() {
        const {since, until} = this.state
        this.props.callback({ since, until })
    },
    updateDate({ since, until }) {
        changeStorage({ filter_since: since.format('YYYY-MM-DD HH:mm') })
        changeStorage({ filter_since: until.format('YYYY-MM-DD HH:mm') })
        this.collectData({ since, until })
        this.callback()
    },
    collectData(data) {
        if (this.state.useCollector) {
            this.collector.collect(data)
        }
    }
}
import { randomString, isCallbackFunction } from 'MyHelpers/utilities'
import { jquery } from 'MyHelpers/bracket-plus'
import { showAlertError } from 'MyHelpers/alerts'
import moment from 'moment'

// date range picker assets
// CSS
import 'MyThemeVendors/date-range-picker/css/daterangepicker-3.1.0.min.css'
// JS 
import 'MyThemeVendors/date-range-picker/js/daterangepicker-3.14.1.min'

export default {
    state: {
        useCollector: false,
        id: randomString(10, { onlyChars: true }),
        since: moment().subtract(1, 'd').format('YYYY-MM-DD'),
        until: moment().format('YYYY-MM-DD'),
    },
    onBeforeMount() {
        isCallbackFunction(this.name, this.props.callback)
        if (this.props.collectorObject) this.update({ useCollector: true })
        if (this.props.since) moment(this.props.since)
        if (this.props.until) moment(this.props.until)
    },
    onMounted() {
        const id = '#' + this.state.id
        jquery('document')
            .ready(() => {
                setTimeout(() => {
                    this.setupDatePicker(id).catch(showAlertError)
                }, 3 * 1000)
            })
    },
    onBeforeUnmount() {},
    onUnmounted() {},
    callback(id, {since, until}) {
        this.props.callback({
            since,
            until
        })
        this.setDateValueOnBoard(id, {since, until})
    },
    setDateValueOnBoard(id, {since, until}) {
        const el = jquery(id)
        el
            .find('span')
            .html(since.format('MMMM D, YYYY') + ' - ' + until.format('MMMM D, YYYY'))
    },
    async setupDatePicker(id) {
        try {
            let options = {
                startDate: moment(this.state.since),
                endDate: moment(this.state.until),
                minYear: parseInt(moment().subtract(2, 'y').format('YYYY')),
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterdays': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                },
                ...(this.props.dateOptions || {})
            }
            jquery(id)
                .daterangepicker(options, (startDate, endDate) => this.callback(id, { since: startDate, until: endDate }))
            this.setDateValueOnBoard(id, { since: options.startDate, until: options.endDate })
        } catch (err) {
            throw err
        }
    }
}
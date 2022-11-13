import Collector from 'MyHelpers/collector'

// components
import FilterTop from 'MyModule/dashboard/components/filter-top.riot'

const title = 'SUMMARY'

export default {
    components: { FilterTop },
    state: { title, criteria: {} },
    onBeforeMount() {
        this.collector = new Collector()
    },
    onMounted() {},
    onUpdated() {},
    onBeforeUnmount() {},
    onUnmounted() {},
}
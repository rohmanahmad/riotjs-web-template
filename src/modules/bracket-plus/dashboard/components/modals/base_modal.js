import { randomString, isCallbackFunction } from 'MyHelpers/utilities'

export default {
    state: {
        id: randomString(10, { onlyChars: true })
    },
    onBeforeMount() {
        isCallbackFunction(this.name, this.props.callback)
        if (this.props.elId) {
            this.update({ id: this.props.elId })
        }
    },
    onMounted() {},
    onBeforeUnmount() {},
    onUnmounted() {},
    callback() {
        this.props.callback({ id: this.state.id })
    }
}
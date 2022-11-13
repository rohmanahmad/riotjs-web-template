import { isPlainObject } from 'lodash'

class Collector {
    constructor () {
        this.collection = {}
    }
    collect(items={}) {
        if (!isPlainObject(items)) console.error('[Collect Data] Items should be an object{key: value}')
        for (const itemName in items) {
            const item = items[itemName]
            this.collection[itemName] = item
        }
    }
}

export default Collector
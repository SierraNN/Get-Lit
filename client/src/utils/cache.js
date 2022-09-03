export class Cache {
  constructor(cacheName, defaultValue, json = true) {
    this.cacheName = cacheName
    this.defaultValue = defaultValue
    this.json = json
    this.store = window.localStorage
  }
  get() {
    let cache = this.store.getItem(this.cacheName)
    if (cache && this.json) cache = JSON.parse(cache)
    return cache ? cache : this.defaultValue
  }
  set(value) {
    if (typeof value !== 'string') value = JSON.stringify(value)
    this.store.setItem(this.cacheName, value)
  }
  // Object cache functions
  getById(id) {
    let cache = this.get()
    return cache[id]
  }
  updateById(id, value) {
    let cache = this.get()
    cache[id] = value
    this.set(cache)
  }
  // Array cache functions
  push(value) {
    let cache = this.get()
    cache.push(value)
    this.set(cache)
  }
  unshift(value) {
    let cache = this.get()
    cache.unshift(value)
    this.set(cache)
  }
}
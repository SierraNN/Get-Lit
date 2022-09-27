import { Cache } from "../utils/cache"

export class FetchService {
  constructor(name, lazyQuery) {
    this.name = name
    const [query, { loading, data, error, previousData, stopPolling }] = lazyQuery
    this.query = query
    this.data = data
    this.error = error
    this.loading = loading
    this.previousData = previousData
    this.stopPolling = stopPolling
    this.cache = new Cache(`${name}Query`, {})
  }
  async fetch(id) {
    return this.query({ variables: { id } }).then(response => {
      console.log(`FETCH ${this.name} : ${id}`, response)
      this.cacheResponse(id, response)
      return response
    })
  }
  cacheResponse(id, { data }) {
    if (data && data[this.name]) this.cache.updateById(id, data[this.name])
  }
  async getById(id) {
    if (!this.cache.getById(id)) {
      await this.fetch(id)
    }
    return this.cache.getById(id)
  }
  updateCacheById(id, data) {
    this.cache.updateById(id, data)
  }
  // subscribe(id) {
  //   this.subscription = setInterval()
  //   this.query({ variables: { id }, pollInterval: 1000 })
  //   return this.data
  // }
  // unsubscribe() {
  //   this.stopPolling()
  // }
}
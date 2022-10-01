import { Cache } from "../utils/cache"
import { Subject } from 'rxjs'

export class FetchService {
  constructor(name, lazyQuery) {
    this.name = name
    const [query, { loading, data, error, previousData, stopPolling }] = lazyQuery
    // console.log(lazyQuery)
    this.query = query
    this.data = data
    this.error = error
    this.loading = loading
    this.previousData = previousData
    this.stopPolling = stopPolling
    this.cache = new Cache(`${name}Query`, {})
    this.observable = new Subject()
  }

  setId(id) {
    this.currentId = id
    if (this.cache.getById(id)) this.observable.next(this.cache.getById(id))
    return this.fetch(id)
  }

  async fetch(id) {
    return this.query({ variables: { id } }).then(response => {
      console.log(`FETCH ${this.name} : ${id}`, response)
      this.handleResponse(id, response)
      return response
    })
  }

  handleResponse(id, { data }) {
    let validResponse = data && data[this.name]
    if (validResponse) {
      this.cache.updateById(id, validResponse)
      this.observable.next(validResponse)
    }
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
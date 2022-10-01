import { Cache } from "../utils/cache"
import { Subject } from 'rxjs'

export class SearchService {
  constructor(name, lazyQuery) {
    this.name = name
    const [query, { loading, data, error, previousData }] = lazyQuery
    this.query = query
    this.data = data
    this.error = error
    this.loading = loading
    this.previousData = previousData
    this.cache = new Cache(`${name}Query`, [])
    this.observable = new Subject()
  }
  clear = () => {
    this.cache.clear()
  }

  setParams(params = {}) {
    this.currentParams = params
    this.observable.next(this.getDocs())
    this.refetch(params)
  }

  async refetch(params = {}) {
    this.params = params
    return this.query({ variables: { params } }).then(response => {
      this.cacheResponse(response)
      return response
    })
  }
  handleResponse({ data }) {
    let validResponse = data && data[this.name]
    if (validResponse) {
      this.cache.set(validResponse)
      this.observable.next(validResponse)
    }
  }
  cacheResponse({ data }) {
    if (data) this.cache.set(data[this.name])
  }
  getCachedParam(key) {
    return this.cache.get()[key]
  }
  getCachedParams() {
    let { term, type, page, pageSize } = this.cache.get()
    return { term, type, page, pageSize }
  }
  getCachedDocs() {
    let { docs } = this.cache.get()
    return docs
  }
  getDocs() {
    return this.getQueryData()?.docs || this.getCachedDocs() || []
  }
  getPage() {
    return this.getQueryData()?.page || this.getCachedParam('page') || 1
  }
  getTotalPages() {
    return this.getQueryData()?.totalPages || this.getCachedParam('totalPages') || 1
  }
  getQueryData() {
    return this.data && this.data[this.name]
  }
}
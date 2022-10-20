import { Cache } from "../utils/cache"
import { Subject } from 'rxjs'

export class SearchService {
  constructor(name, lazyQuery) {
    this.name = name
    const [query, { loading, data, error, stopPolling }] = lazyQuery
    this.query = query
    this.data = data
    this.error = error
    this.loading = loading
    this.stopPolling = stopPolling
    this.cache = new Cache(`${name}Query`, [])
  }
  clear = () => {
    this.cache.clear()
  }

  setParams(params = {}) {
    this.refetch(params)
  }

  async fetch(params = {}) {
    return this.query({
      variables: { params },
      fetchPolicy: 'cache-and-network'
    }).then(response => {
      this.cacheResponse(response)
      return response
    })
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
  getTotalDocs() {
    return this.getQueryData()?.totalDocs || this.getCachedParam('totalDocs') || 0
  }
  getQueryData() {
    return this.data && this.data[this.name]
  }
}
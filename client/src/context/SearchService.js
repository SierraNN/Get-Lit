import { Cache } from "../utils/cache"

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
  }
  async refetch(params = {}) {
    this.params = params
    return this.query({ variables: { params } }).then(response => {
      // console.log(`REFETCH ${this.name}`, response)
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
  getQueryData() {
    return this.data && this.data[this.name]
  }
}
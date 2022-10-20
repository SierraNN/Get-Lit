import { FormProvider } from "@codewizard-dt/use-form-hook"
import { useEffect, useState } from "react"
import AppHeader from "../lists/AppHeader"
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"

const SearchComponent = ({ modelName, context, searchOptions, extraButtons, ListComponent }) => {
  if (!context) throw Error("Search context not provided")
  if (!modelName) throw Error('modelName not given')
  const [params, setParams] = useState(context.getCachedParams())
  const [pageSize] = useState(20)

  useEffect(() => {
    // if (params) context.fetch(params)
    // else if (!context.getCachedDocs()) context.fetch(params)
    context.fetch(params)
  }, [context.fetch, params])

  const onSubmit = async ({ params: { term, type } }) => {
    if (term === '') {
      setParams({ page: 1, pageSize })
    } else {
      setParams({ term, type, page: 1, pageSize })
    }
  }

  const reset = () => setParams({})

  const typeLabel = () => searchOptions.find(({ value }) => value === params.type).text.toLowerCase()
  const listHeaderText = params.term ? `Results ${typeLabel()} (${context.getTotalDocs()})` : `Browsing`

  return (
    <FormProvider>
      <AppHeader as='h1' content={`Search ${modelName}`} />
      <SearchBar params={params} onSubmit={onSubmit} searchOptions={searchOptions} extraButtons={extraButtons} />
      <SearchResults header={listHeaderText} params={params} context={context} ListComponent={ListComponent} reset={reset} />
    </FormProvider>
  )
}

export default SearchComponent
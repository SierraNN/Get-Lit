import { useEffect, useState } from "react"
import { Button, Header } from "semantic-ui-react"

const SearchResults = ({ ListComponent, context, itemClass, header, list, params, reset }) => {
  if (!ListComponent) throw new Error('ListComponent not given')

  const nextPage = async () => context.setParams({ ...params, page: context.getPage() + 1 })
  const prevPage = async () => context.setParams({ ...params, page: context.getPage() - 1 })

  const ListNav = () => {
    return context.getTotalPages() > 1 && <Button.Group className="list-nav-btns">
      <Button icon="angle left" disabled={context.getPage() === 1} onClick={prevPage} />
      <Button className="page" content={`pg ${context.getPage()}`} onClick={null} />
      <Button className="total-pages" content={`/ ${context.getTotalPages()}`} onClick={null} />
      <Button icon="angle right" disabled={context.getPage() === context.getTotalPages()} onClick={nextPage} />
    </Button.Group>
  }

  return (
    <div className={`search-results ${itemClass}`}>
      <Header as='h2'>
        {header}
        {params.term && <Button className="clear-results" negative content={params.term} icon="x" compact onClick={reset} />}
        <ListNav />
      </Header>
      <ListComponent list={context.getDocs()} />
    </div>
  )
}

export default SearchResults
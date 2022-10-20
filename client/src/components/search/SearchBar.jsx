import { useForm } from "@codewizard-dt/use-form-hook"
import { useEffect } from "react"
import { Dropdown, Header } from "semantic-ui-react"

const SearchBar = ({ params, searchOptions, onSubmit, extraButtons }) => {
  const { Form, setData } = useForm()

  useEffect(() => {
    setData('params.term', params.term || '')
    if (params.type) setData('params.type', params.type)
  }, [params])
  return (
    <Form submit={onSubmit} submitBtnText="Search" fields={[{
      name: 'params',
      fields: [
        { name: 'term', useLabel: false, width: '12' },
        {
          name: 'type',
          useLabel: false,
          control: Dropdown,
          options: searchOptions,
          width: '4'
        }
      ]
    }]} buttons={extraButtons} />
  )
}

export default SearchBar
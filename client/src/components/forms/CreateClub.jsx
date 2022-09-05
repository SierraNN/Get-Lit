
import { FormProvider, useForm } from '@codewizard-dt/use-form-hook';

const CreateClub = (props) => {
  const { Form } = useForm()
  return (
    <FormProvider>
      <Form fields={[
        { name: 'name' },
        { name: 'description' },
        { name: 'tags', control: 'textarea', label: 'Tags (comma separated)' }
      ]} />
    </FormProvider>
  )
}

export default CreateClub
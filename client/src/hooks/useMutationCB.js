import { useMutation } from "@apollo/client"

export const useMutationCB = (name, mutation, callback) => {
  const [mutate] = useMutation(mutation)
  return async function (...args) {
    const { data, errors } = await mutate(...args)
    if (data && data[name] !== undefined) {
      return callback(data[name])
    } else if (errors) {
      console.log(errors)
    }
    return { data, errors }
  }
}
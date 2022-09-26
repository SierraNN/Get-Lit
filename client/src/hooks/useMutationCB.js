import { useMutation } from "@apollo/client"

export const useMutationCB = (name, mutation, callback) => {
  const [mutate] = useMutation(mutation)
  return async function (...args) {
    const { data } = await mutate(...args)
    if (data && data[name]) {
      callback(data[name])
    }
    return { data }
  }
}
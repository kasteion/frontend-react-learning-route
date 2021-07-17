import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const REGISTER = gql`
  mutation signup($input: UserCredentials!) {
    signup (input: $input)
  } 
`

export const RegisterMutation = ({ children }) => {
  const [mutation, { data, loading, error }] = useMutation(REGISTER)
  return children(mutation, { data, loading, error })
}

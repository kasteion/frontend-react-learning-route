import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const LOGIN = gql`
  mutation login($input: UserCredentials!){
    login(input: $input)
  }
`

export const LoginMutation = ({ children }) => {
  const [mutation, { data, loading, error }] = useMutation(LOGIN)
  return children(mutation, { data, loading, error })
}

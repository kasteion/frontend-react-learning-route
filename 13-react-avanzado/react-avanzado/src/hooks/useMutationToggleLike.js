import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const LIKE_PHOTO = gql`
  mutation likePhoto($input: LikePhoto!) {
    likePhoto(input: $input) {
      id,
      liked,
      likes
    }
  }
`

export const useMutationToggleLike = () => {
  const [toggleLike, { data, loading, error }] = useMutation(LIKE_PHOTO)
  return { toggleLike, data, loading, error }
}

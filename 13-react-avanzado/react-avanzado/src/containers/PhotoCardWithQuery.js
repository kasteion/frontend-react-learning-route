import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { PhotoCard } from '../components/PhotoCard'

const GET_SINGLE_PHOTO = gql`
  query getSinglePhoto($id:ID!) {
    photo(id:$id) {
      id
      categoryId
      src
      likes
      userId
      liked
    }
  }
`

export const PhotoCardWithQuery = ({ id }) => {
  const { loading, error, data = {} } = useQuery(GET_SINGLE_PHOTO, { variables: { id } })
  const { photo = {} } = data
  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error!</h1>
  return <PhotoCard {...photo} />
}

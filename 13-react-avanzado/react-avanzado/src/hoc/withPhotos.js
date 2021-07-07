import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_PHOTOS = gql`
  query getPhotos($categoryId:ID) {
    photos(categoryId: $categoryId) {
      id
      categoryId
      src
      likes
      userId
      liked
    }
  }`

export const withPhotos = (Component, categoryId) => {
  const { loading, error, data } = useQuery(GET_PHOTOS, { variables: { categoryId } })
  return <Component loading={loading} error={error} data={data} />
}

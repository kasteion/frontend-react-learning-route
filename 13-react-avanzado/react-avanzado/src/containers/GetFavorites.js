import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { ListOfFavs } from '../components/ListOfFavs'

const GET_FAVS = gql`
  query getFavs {
    favs {
      id
      categoryId
      src
      likes
      userId
    }
  }
`

const renderProp = ({ loading, error, data }) => {
  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error!</h1>
  const { favs } = data
  return <ListOfFavs favs={favs} />
}

export const FavsWithQuery = () => {
  const { loading, error, data } = useQuery(GET_FAVS, { fetchPolicy: 'network-only' })
  return renderProp({ loading, error, data })
}

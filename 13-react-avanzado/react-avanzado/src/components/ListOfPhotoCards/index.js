import React from 'react'
import { PhotoCard } from '../PhotoCard'

export const ListOfPhotoCardsComponent = ({ data = { photos: [] }, loading, error } = {}) => {
  if (loading) return <h1>Cargando...</h1>
  if (error) return <h1>Error!</h1>
  const { photos } = data
  return (
    <ul>
      {
        photos.map(photo => <PhotoCard key={photo.id} {...photo} />)
      }
    </ul>
  )
}

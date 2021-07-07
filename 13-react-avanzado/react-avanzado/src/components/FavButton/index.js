import React from 'react'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { Button } from './styles'

export const FavButton = ({ liked, likes, onClick }) => {
  const Icon = () => {
    return (
      <>
        {
          liked
            ? <MdFavorite size='32px' />
            : <MdFavoriteBorder size='32px' />
        }
      </>
    )
  }
  return (
    <Button onClick={onClick}>
      <Icon />{likes} likes!
    </Button>
  )
}

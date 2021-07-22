import React from 'react'
import PropTypes from 'prop-types'
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

FavButton.PropTypes = {
  liked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

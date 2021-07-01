import React from 'react'
import { useNearScreen } from '../../hooks/useNearScreen'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { ImgWrapper, Img, Button, Article } from './styles'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

export const PhotoCard = ({ id, likes = 0, src = DEFAULT_IMAGE }) => {
  const [show, element] = useNearScreen()
  const key = `like-${id}`
  const [liked, setLiked] = useLocalStorage(key, false)
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
    <Article ref={element}>
      {
        show &&
          <>
            <ImgWrapper>
              <a href={`/detail/${id}`}>
                <div>
                  <Img src={src} />
                </div>
              </a>
            </ImgWrapper>
            <Button onClick={() => setLiked(!liked)}>
              <Icon />{likes} likes!
            </Button>
          </>
      }
    </Article>
  )
}

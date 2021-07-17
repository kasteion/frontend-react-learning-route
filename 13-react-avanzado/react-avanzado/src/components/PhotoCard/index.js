import React from 'react'
import { useNearScreen } from '../../hooks/useNearScreen'
import { useMutationToggleLike } from '../../hooks/useMutationToggleLike'
import { ImgWrapper, Img, Article, Link } from './styles'
import { FavButton } from '../FavButton'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

export const PhotoCard = ({ id, liked, likes = 0, src = DEFAULT_IMAGE }) => {
  const [show, element] = useNearScreen()
  const { toggleLike } = useMutationToggleLike()
  const handleFavClick = () => {
    toggleLike({ variables: { input: { id } } })
  }
  return (
    <Article ref={element}>
      {
        show &&
          <>
            <ImgWrapper>
              <Link to={`/detail/${id}`}>
                <div>
                  <Img src={src} />
                </div>
              </Link>
            </ImgWrapper>
            <FavButton liked={liked} likes={likes} onClick={handleFavClick} />
          </>
      }
    </Article>
  )
}

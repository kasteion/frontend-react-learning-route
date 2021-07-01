import React, { useState, useEffect } from 'react'
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs'
import ScrollMenu from 'react-horizontal-scrolling-menu'
import { useCategoriesData } from '../../hooks/useCategoriesData'
import { Category } from '../Category'
import { Button, ItemContainer, ListContainer } from './styles'

export const ListOfCategories = () => {
  const [showFixed, setShowFixed] = useState(false)
  const { categories, loading } = useCategoriesData()

  useEffect(() => {
    const onScroll = e => {
      const newShowFixed = window.scrollY >= 200
      showFixed !== newShowFixed && setShowFixed(newShowFixed)
    }
    document.addEventListener('scroll', onScroll)
    return () => document.removeEventListener('scroll', onScroll)
  }, [showFixed])

  const renderList = (fixed) => (
    <ListContainer fixed={fixed}>
      <ScrollMenu
        data={
          categories.map(category =>
            <ItemContainer key={category.id}>
              <Category {...category} />
            </ItemContainer>
          )
        }
        arrowLeft={
          <Button>
            <BsCaretLeftFill />
          </Button>
        }
        arrowRight={
          <Button>
            <BsCaretRightFill />
          </Button>
        }
      />
    </ListContainer>
  )

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      {
        renderList()
      }
      {
        showFixed && renderList(true)
      }
    </>
  )
}

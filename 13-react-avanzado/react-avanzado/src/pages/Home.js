import React from 'react'
import { ListOfCategories } from '../components/ListOfCategories'
import { ListOfPhotoCards } from '../containers/ListOfPhotoCards'
import { Helmet } from 'react-helmet'

const HomePage = ({ categoryId }) => {
  return (
    <>
      <Helmet>
        <title>Petgram | Tu app de fotos de mascotas 🐶</title>
        <meta name='description' content='Con Petgram puedes encontrar fotos de animales domésticos muy bonitos' />
      </Helmet>
      <ListOfCategories />
      <ListOfPhotoCards categoryId={categoryId} />
    </>
  )
}

export const Home = React.memo(HomePage, (prevProps, props) => {
  return prevProps.categoryId === props.categoryId
})

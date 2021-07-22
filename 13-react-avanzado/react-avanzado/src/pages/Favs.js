import React from 'react'
import { FavsWithQuery } from '../containers/GetFavorites'
import { Layout } from '../components/Layout'

const Favs = () => {
  return (
    <Layout title='Tus favoritos 🐶' content='Aquí puedes encontrar tus favoritos'>
      <FavsWithQuery />
    </Layout>
  )
}

export default Favs

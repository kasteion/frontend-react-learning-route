import db from '../adapter.js'

export function find ({ id, favs = [] }) {
  const { photos } = db.data
  const photo = photos.find(p => p.id === parseInt(id))
  return {
    ...photo,
    liked: favs.includes(id.toString())
  }
}

export function addLike ({ id }) {
  db.data.photos = db.data.photos.map((photo) => {
    if (photo.id === parseInt(id, 10)) {
      return { ...photo, likes: photo.likes + 1 }
    }
    return photo
  })
  db.write()
  return db.data.photos.filter((photo) => photo.id === parseInt(id, 10))
}

export function removeLike ({ id }) {
  db.data.photos = db.data.photos.map((photo) => {
    if (photo.id === parseInt(id, 10)) {
      return { ...photo, likes: photo.likes - 1 }
    }
    return photo
  })
  db.write()
  return db.data.photos.filter((photo) => photo.id === parseInt(id, 10))
}

export function list ({ categoryId, ids, favs = [] }) {
  let photos
  if (categoryId && categoryId !== 'all') {
    photos = db.data.photos
      .filter((photo) => {
        return photo.categoryId === parseInt(categoryId, 10)
      })
  } else if (ids) {
    photos = db.data.photos
      .filter((photo) => ids.includes(photo.id.toString()))
  } else {
    photos = db.data.photos
  }

  return photos.map((photo) => ({
    ...photo,
    liked: favs.includes(photo.id.toString())
  }))
}

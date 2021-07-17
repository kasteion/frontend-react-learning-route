import db from '../adapter.js'
import crypto from 'crypto'
import { v1 as uuidv1 } from 'uuid'
import bcrypt from 'bcrypt'

export function addFav ({ id, photoId }) {
  db.data.users = db.data.users.map(user => {
    if (user.id === id) {
      user.favs.push(photoId)
      return user
    } else {
      return user
    }
  })
  db.write()
}

export function removeFav ({ id, photoId }) {
  db.data.users = db.data.users.map(user => {
    if (user.id === id) {
      user.favs = user.favs.filter((fav) => fav !== photoId)
      return user
    } else {
      return user
    }
  })
  db.write()
}

export function hasFav ({ id, photoId }) {
  const user = db.data.users.find(u => u.id === id)
  const hasFav = user.favs.includes(photoId)
  return hasFav
}

export async function create ({ email, password }) {
  const avatarHash = crypto.createHash('md5').update(email).digest('hex')
  const avatar = `https://gravatar.com/avatar/${avatarHash}`

  // Create a user
  const user = {
    id: uuidv1(), // with a unique user id
    password: await bcrypt.hash(password, 10), // with the encrypted password
    favs: [],
    avatar,
    email
  }
  // Write in db.json
  db.data.users.push(user)
  db.write()
  console.log(db.data.users)
  return user
}

export function find ({ email }) {
  return db.data.users.find(user => user.email === email)
}

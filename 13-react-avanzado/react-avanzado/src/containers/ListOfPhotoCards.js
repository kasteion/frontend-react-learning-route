import { withPhotos } from '../hoc/withPhotos'
import { ListOfPhotoCardsComponent } from '../components/ListOfPhotoCards'

export const ListOfPhotoCards = ({ categoryId }) => withPhotos(ListOfPhotoCardsComponent, categoryId)

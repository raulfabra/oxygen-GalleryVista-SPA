import { useLocation } from 'react-router-dom'
import { Header } from '../components/_header'
import { Title } from '../components/_title'
import { SearchBarFavourites } from '../components/searchBarFavourites'
import { useDispatch, useSelector } from 'react-redux'
import { getPhotosLikedData, removeImage } from '../endpoints/favourites/photosLikedSlice'
import { useEffect, useState } from 'react'

function MyFavorites () {
  const location = useLocation()
  const dispatch = useDispatch()
  const savedPhotos = useSelector(getPhotosLikedData)

  const [removeItem, setRemoveItem] = useState([])

  useEffect(() => {
    setRemoveItem(savedPhotos)
  }, [removeItem])

  const handleDelete = (event) => {
    const removeId = event.target.getAttribute('datatype')
    const removeItemFavoritePhoto = savedPhotos.filter((photo) => photo.id === removeId)
    dispatch(removeImage(removeItemFavoritePhoto[0]))
  }
  return (
    <>
      <Header location={location.pathname} />
      <Title location={location.pathname} />
      <SearchBarFavourites />
      <section className='photos--gallery'>
        {savedPhotos.map((photo) => (
          <div key={photo.id} className='photos--container'>
            <img src={photo.url} className='photos--img' alt={photo.description} />
            <img src='src\assets\iconEdit.svg' alt='icon__like' className='icon icon--edit' />
            <img src='src\assets\iconDelete.svg' alt='icon__like' className='icon icon--remove' datatype={photo.id} onClick={handleDelete} />
          </div>
        ))}
      </section>
    </>
  )
}

export default MyFavorites

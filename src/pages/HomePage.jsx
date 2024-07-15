import debounce from 'just-debounce-it'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPhotosListThunk } from '../endpoints/photos/photosThunk'
import { getPhotosListData, getPhotosListError, getPhotosListStatus } from '../endpoints/photos/photosSlice'
import { addImage, getPhotosLikedData } from '../endpoints/favourites/photosLikedSlice'
import { Header } from '../components/_header'
import { Title } from '../components/_title'
import { SearchBar } from '../components/searchBar'
import { Spinner } from '../components/spinner'
import { useLocation } from 'react-router-dom'

function HomePage () {
  const dispatch = useDispatch()
  const location = useLocation()

  const [photoListShow, setPhotoListShow] = useState([])

  const photosListData = useSelector(getPhotosListData)
  const photosListStatus = useSelector(getPhotosListStatus)
  const photosListError = useSelector(getPhotosListError)

  const photosLikedData = useSelector(getPhotosLikedData)

  const debouncedGetPhotos = useCallback(
    debounce(query => {
      dispatch(getPhotosListThunk(query))
    }, 1000)
  )

  useEffect(() => {
    if (photosListStatus === 'idle') debouncedGetPhotos()
    else if (photosListStatus === 'rejected') console.log(photosListError)
    else if (photosListStatus === 'fulfilled') {
      setPhotoListShow(photosListData)
    }
  }, [photosListStatus])

  const handleImageClick = (photo) => {
    const picture = {
      id: photo.id,
      description: photo.description,
      url: photo.urls.regular,
      width: photo.width,
      height: photo.height,
      likes: photo.likes,
      date: photo.created_at
    }

    if (!photosLikedData.some(fav => fav.id === picture.id)) {
      dispatch(addImage(picture))
    }
  }

  return (
    <>
      <Header />
      <Title location={location.pathname} />
      <SearchBar />
      {photosListStatus === 'pending' && <Spinner />}
      <section className='photos--gallery'>
        {photosListStatus !== 'pending' && photoListShow.map((photo) => (
          <div key={photo.id} className='photos--container' onClick={() => handleImageClick(photo)}>
            <img src={photo.urls.regular} className='photos--img' alt={photo.alt_description} datatype={photo.id} />
            <img src='src\assets\icon.svg' alt='icon__like' className='photos--like' />
          </div>
        ))}
      </section>
    </>
  )
}

export default HomePage

// Tiene otra página ‘My photos’ donde puede ver las imágenes que ha importado y sus datos (width, height, likes, date added)

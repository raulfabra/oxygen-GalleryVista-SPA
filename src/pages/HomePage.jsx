import debounce from 'just-debounce-it'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPhotosListThunk } from '../endpoints/photos/photosThunk'
import { getPhotosListData, getPhotosListError, getPhotosListStatus } from '../endpoints/photos/photosSlice'
import { addImage, getPhotosLikedData, removeImage } from '../endpoints/favourites/photosLikedSlice'
import { Header } from '../components/_header'
import { Title } from '../components/_title'
import { SearchBar } from '../components/searchBar'
import { Spinner } from '../components/spinner'
import { useLocation } from 'react-router-dom'
import iconLike from '../assets/iconLike.svg'

function HomePage () {
  const dispatch = useDispatch()
  const location = useLocation()

  const [photoListShow, setPhotoListShow] = useState([])

  const photosListData = useSelector(getPhotosListData)
  const photosListStatus = useSelector(getPhotosListStatus)
  const photosListError = useSelector(getPhotosListError)

  const [active, setActive] = useState(() => {
    const photosLikedActive = window.localStorage.getItem('photosLikedActive')
    if (photosLikedActive) return JSON.parse(photosLikedActive)
    else return []
  })
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
      description: photo.alt_description,
      urls: photo.urls,
      width: photo.width,
      height: photo.height,
      likes: photo.likes,
      date: photo.created_at
    }

    if (!photosLikedData.some(fav => fav.id === picture.id)) {
      dispatch(addImage(picture))
    } else dispatch(removeImage(picture))

    // Iluminamos el boton liked
    let prevLiked = [...active]

    if (prevLiked.includes(picture.id)) {
      prevLiked = prevLiked.filter(imagenId => imagenId !== picture.id)
    } else prevLiked.push(picture.id)

    setActive(prevLiked)
    window.localStorage.setItem('photosLikedActive', JSON.stringify(prevLiked))
  }

  return (
    <>
      <Header />
      <Title location={location.pathname} />
      <SearchBar />
      {photosListStatus === 'pending' && <Spinner />}
      <section className='photos--gallery'>
        {photosListStatus !== 'pending' && photoListShow.map((photo) => (
          <div key={photo.id} className='photos--container' onClick={(e) => handleImageClick(photo)}>
            <img src={photo.urls.regular} className='photos--img' alt={photo.alt_description} datatype={photo.id} />
            <img src={iconLike} alt='icon__like' className={active.includes(photo.id) ? 'icon icon--like icon--Liked ' : 'icon icon--like'} />
          </div>
        ))}
      </section>
    </>
  )
}

export default HomePage

import { useLocation } from 'react-router-dom'
import { Header } from '../components/_header'
import { Title } from '../components/_title'
import { SearchBarFavourites } from '../components/searchBarFavourites'
import { useDispatch, useSelector } from 'react-redux'
import { getPhotosLikedData, removeImage, orderByWidth, getPhotosLikedStatus, orderByHeight, orderByLike } from '../endpoints/favourites/photosLikedSlice'
import { useEffect, useState } from 'react'

function MyFavorites () {
  const location = useLocation()
  const dispatch = useDispatch()

  const photosLikedData = useSelector(getPhotosLikedData)
  const photosLikedStatus = useSelector(getPhotosLikedStatus)

  const [yellowLikes, setYellowLikes] = useState(() => {
    const yellowLikesStorage = window.localStorage.getItem('photosLikedActive')
    if (yellowLikesStorage) return JSON.parse(yellowLikesStorage)
    else return []
  })

  const [width, setWidth] = useState(1000)
  const [height, setHeight] = useState(1000)
  const [likes, setLikes] = useState(0)

  const handleDelete = (event) => {
    const removeId = event.target.getAttribute('datatype')
    const removeItemFavoritePhoto = photosLikedData.filter((photo) => photo.id === removeId)
    dispatch(removeImage(removeItemFavoritePhoto[0]))

    // Quitamos el like Amarillo
    const newLikesActive = yellowLikes.filter((likesId) => likesId !== removeId)
    window.localStorage.setItem('photosLikedActive', JSON.stringify(newLikesActive))
    setYellowLikes(newLikesActive)
  }

  const handleWidth = (e) => {
    setWidth(parseInt(e.target.value))
    console.log(width)
    dispatch(orderByWidth(parseInt(e.target.value)))
  }
  const handleheight = (e) => {
    setHeight(parseInt(e.target.value))

    dispatch(orderByHeight(parseInt(e.target.value)))
  }
  const handleLike = (e) => {
    setLikes(parseInt(e.target.value))

    dispatch(orderByLike(parseInt(e.target.value)))
  }

  useEffect(() => {
    console.log('Se vuelve a renderizar el componente')
  }, [photosLikedStatus])

  return (
    <>
      <Header location={location.pathname} />
      <Title location={location.pathname} />
      <SearchBarFavourites />
      <section className='sectionFilter'>
        <form className='filter filter--container'>
          <div className='filter--group'>
            <label htmlFor='widthRange' className='filter__title'> WIDTH </label>
            <input type='range' id='widthRange' min={1000} max={9000} step={200} className='filter__range' onChange={handleWidth} />
            <span className='filter__value'>{width} px</span>
          </div>
          <div className='filter--group'>
            <label htmlFor='heightRange' className='filter__title'> HEIGHT </label>
            <input type='range' id='heightRange' min={1000} max={9000} step={200} className='filter__range' onChange={handleheight} />
            <span className='filter__value'>{height} px</span>
          </div>
          <div className='filter--group'>
            <label htmlFor='likesRange' className='filter__title'> LIKES </label>
            <input type='range' id='likesRange' className='filter__range' step={50} onChange={handleLike} />
            <span className='filter__value'>{likes}</span>
          </div>
        </form>
      </section>
      <section className='photos--gallery'>
        {photosLikedData.map((photo) => (
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

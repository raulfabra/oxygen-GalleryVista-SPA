import { useLocation } from 'react-router-dom'
import { Header } from '../components/_header'
import { Title } from '../components/_title'
import { SearchBarFavourites } from '../components/searchBarFavourites'
import { useDispatch, useSelector } from 'react-redux'
import { getPhotosLikedData, removeImage } from '../endpoints/favourites/photosLikedSlice'
import { useEffect, useState } from 'react'
import iconDelete from '../assets/iconDelete.svg'
import iconEdit from '../assets/iconEdit.svg'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

function MyFavorites () {
  const location = useLocation()
  const dispatch = useDispatch()

  const photosLikedData = useSelector(getPhotosLikedData)

  const [yellowLikes, setYellowLikes] = useState(() => {
    const yellowLikesStorage = window.localStorage.getItem('photosLikedActive')
    if (yellowLikesStorage) return JSON.parse(yellowLikesStorage)
    else return []
  })
  const [displayPhotos, setDisplayPhotos] = useState(photosLikedData)
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

  const handleFilter = (e, typeOfFilter) => {
    if (typeOfFilter === 'width') setWidth(parseInt(e.target.value))
    if (typeOfFilter === 'height') setHeight(parseInt(e.target.value))
    if (typeOfFilter === 'likes') setLikes(parseInt(e.target.value))

    const newArray = photosLikedData.filter((image) => image[typeOfFilter] >= parseInt(e.target.value))
    newArray.sort((a, b) => b[typeOfFilter] - a[typeOfFilter])
    setDisplayPhotos(newArray)
  }

  const handleCheckbox = (e) => {
    if (e.target.checked && displayPhotos !== photosLikedData) {
      setWidth(1000)
      setHeight(1000)
      setLikes(0)
      setDisplayPhotos(photosLikedData)
    }
  }

  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState('')
  const handleOpen = (e) => {
    const photoDescription = e.target.getAttribute('alt')
    setOpen(true)
    setDescription(photoDescription)
  }
  const handleClose = () => setOpen(false)

  useEffect(() => {
    setDisplayPhotos(photosLikedData)
  }, [photosLikedData])

  return (
    <>
      <Header location={location.pathname} />
      <Title location={location.pathname} />
      <SearchBarFavourites />
      <section className='sectionFilter'>
        <form className='filter filter--container'>
          <div className='filter--group filter--group--checkbox'>
            <input type='checkbox' id='allImage' className='filter__checkbox' onClick={handleCheckbox} />
            <label htmlFor='allImage' className='filter__title'> View All images</label>
          </div>
          <div className='filter--group'>
            <label htmlFor='widthRange' className='filter__title'> WIDTH </label>
            <input type='range' id='widthRange' min={1000} max={9000} value={width} step={200} className='filter__range' onChange={(e) => handleFilter(e, 'width')} />
            <span className='filter__value'>{width} px</span>
          </div>
          <div className='filter--group'>
            <label htmlFor='heightRange' className='filter__title'> HEIGHT </label>
            <input type='range' id='heightRange' min={1000} max={9000} step={200} value={height} className='filter__range' onChange={(e) => handleFilter(e, 'height')} />
            <span className='filter__value'>{height} px</span>
          </div>
          <div className='filter--group'>
            <label htmlFor='likesRange' className='filter__title'> LIKES </label>
            <input type='range' id='likesRange' className='filter__range' step={50} value={likes} onChange={(e) => handleFilter(e, 'likes')} />
            <span className='filter__value'>{likes}</span>
          </div>
        </form>
      </section>
      <section className='photos--gallery'>
        {displayPhotos.map((photo) => (
          <div key={photo.id} className='photos--container'>
            <img src={photo.url} className='photos--img' alt={photo.description} onClick={handleOpen} />
            <img src={iconEdit} alt='icon__like' className='icon icon--edit' />
            <img src={iconDelete} alt='icon__like' className='icon icon--remove' datatype={photo.id} onClick={handleDelete} />
          </div>
        ))}
      </section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Description
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {description}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default MyFavorites

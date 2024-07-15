import { useState } from 'react'

export const SearchBarFavourites = () => {
  const [keyword, setKeyword] = useState()

  const handleSubmit = (event) => {
    event.preventdefault()
  }

  const handleChange = (event) => {
    setKeyword(event.target.value)
  }
  return (
    <section className='searchBar'>
      <form onSubmit={handleSubmit} className='searchBar__container'>
        <input type='text' name='myphotos' id='myphotos' className='searchBar__container--input' placeholder='Search photos' onChange={handleChange} value={keyword} />
        <img src='public\magnifying-glass.png' alt='search__icon' className='searchBar__container--iconGlass' width={25} height={25} />
      </form>
    </section>
  )
}

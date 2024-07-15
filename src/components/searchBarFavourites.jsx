export const SearchBarFavourites = () => {
  const handleSubmit = () => {}
  const handleChange = () => {}
  return (
    <section className='searchBar'>
      <form onSubmit={handleSubmit} className='searchBar__container'>
        <input type='text' name='booking' id='booking' className='searchBar__container--input' placeholder='Search photos' onChange={handleChange} />
        <img src='public\magnifying-glass.png' alt='search__icon' className='searchBar__container--iconGlass' width={25} height={25} />
      </form>
    </section>
  )
}

import { useEffect } from 'react'

function App () {
  useEffect(() => {

  }, [])
  return (
    <>
      <header className='navBar'>
        <div>
          <img src='public\Group 1.png' alt='icon__title' className='navBar--title' />
        </div>
        <img src='public\menu.png' alt='icon_menu' width={40} height={40} className='navBar--menu' />
        <img src='public\Group 2.png' alt='icon_favourite' className='navBar--favorites' />
      </header>
      <article className='title__homePage'>
        <div>
          <img src='public\Group 1_desktop.png' alt='title__homepage' />
        </div>
      </article>
      <section className='searchBar'>
        <div className='searchBar__container'>
          <input type='text' name='booking' id='booking' className='searchBar__container--input' placeholder='Search photos' />
          <img src='public\magnifying-glass.png' alt='search__icon' className='searchBar__container--iconGlass' width={25} height={25} />
        </div>
      </section>
      <section className='photographies' />
    </>
  )
}

export default App

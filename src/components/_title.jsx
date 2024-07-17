export const Title = ({ location }) => {
  return (
    <article className='title__homePage'>
      <div>
        {(location === '/home') && <img src='./Group 1_desktop.png' alt='title__homepage' />}
        {(location === '/favorites') && <img src='./MyGalleryTitle.png' alt='title__favorites' />}
      </div>
    </article>
  )
}

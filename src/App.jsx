function App() {
  return (
    <>
      <section className='container'>
        <article className=''>
          <h1 className='text-heading'>Heading</h1>
          <h2 className='text-title'>Title</h2>
          <h3 className='text-subtitle font-'>Subtitle</h3>
          <h4 className='text-paragraph'>Paragraph</h4>
          <h5 className='text-caption font-'>Caption</h5>
          <h6 className='bg-secondary text-base'>uwu</h6>
          <form className='form-control'>
            <input
              type='text'
              placeholder='Type here'
              className='input w-full'
            />
            <button className='btn btn-primary'>Button</button>
          </form>
        </article>
      </section>
    </>
  )
}

export default App

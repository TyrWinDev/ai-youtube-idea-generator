import { logoYT } from '../assets'
 
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between items-center w-full mb-10 pt-3">
          <div className='flex flex-row items-center font-inter  font-bold'>
          <img src={logoYT} alt="sumz_logo" className='w-12 object-contain' />
            <h2 className='ml-2'>VideoIdeas</h2>
          </div>


            <button type='button' onClick={() => window.open('https/github.com/tyrwindev')} className='black_btn'>
                Github
            </button>
        </nav>

        <h1 className='head_text'>
             Discover Your Next <span className='red_gradient'>YouTube</span> Video  <br className='max-md:hidden'/>
             with <span className='red_gradient'>OpenAI GPT 3.5</span>
        </h1>

        <h2 className="desc">The app does the research - so you can focus on creating.</h2>
    </header>
  )
}

export default Hero
import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import { useAppContext } from '../context/AppContext'  // import context

const Home = () => {
  const { user } = useAppContext()  // assuming you have user object or login flag
  const isLoggedIn = !!user;  // true if user exists, else false

  return (
    <div className='mt-10'>
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner/>
      <NewsLetter isLoggedIn={isLoggedIn} />  {/* pass login status here */}
    </div>
  )
}

export default Home

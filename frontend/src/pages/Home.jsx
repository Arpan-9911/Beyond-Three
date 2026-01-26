import React from 'react'
import Header from '../components/layout/Header'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Footer from '../components/layout/Footer'
import Resolution from '../components/home/Resolution'
import Youth from '../components/home/Youth'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Resolution />
      <Youth />
      <Footer />
    </div>
  )
}

export default Home
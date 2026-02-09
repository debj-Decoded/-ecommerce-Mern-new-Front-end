import React from 'react'
import Navbar from '../features/navbar/Navbar'
import { Product } from '../features/product/components/Product'
import { Footer } from '../features/common/Footer'
import AutoImageSlider from './AutoImageSlider'

 
const Home = () => {
  return (

    <div>
        <Navbar>
          <AutoImageSlider></AutoImageSlider>
            <Product></Product>
        </Navbar> 
        <Footer></Footer>
    </div>
  )
}

export default Home
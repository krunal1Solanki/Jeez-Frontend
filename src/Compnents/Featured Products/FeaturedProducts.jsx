import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import ProductCart from '../ProductCart/ProductCart'
import './feature.css'


const FeaturedProducts = () => {
    const products = useSelector(state => state.products)
    const featured = products.slice(0, 3);
    return (
        <>
            <div className='feature-cart'>
                {

                    featured.map((item) => {
                        return <div className='feature' key={item._id}>
                            <ProductCart id={item._id} description={item.description} title={item.name} image={item.image.data} price={item.unitPrice} />
                        </div>
                    })
                }
            </div>

        </>
    )
}

export default FeaturedProducts
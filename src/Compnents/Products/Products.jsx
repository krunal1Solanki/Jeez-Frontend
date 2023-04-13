import React from 'react'
import './product.css'
import { useSelector } from 'react-redux'
import ProductCart from '../ProductCart/ProductCart'
import { Button } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { client } from '../../Client'
import { useState } from 'react'
import { FETCH_PRODUCTS } from '../../Store/Actions'
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { useEffect } from 'react'


const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)  
    const [load, setLoad] = useState('Load More');
    const [skip, setSkip] = useState(products.length);
    useEffect(()=> {
        setLoad('Load More');
    }, [])
    const loadMore = () => {
        setSkip(skip + 4);
        client.get(`/product/get-products?skip=${skip}`).then((resp)=> {
            try {
                if(resp.data.data.length === 0){ 
                    setLoad('No more Products !')
                    setSkip(products.length);
                } else {
                    dispatch({
                        type : FETCH_PRODUCTS,
                        data : resp.data.data
                    })
                }
        
            } catch (error) {
                console.log(error)
            }
        });      
    }
    return (
    <>
        <div className='carts'>
            {

                products.map((item) => {
                    return <div key ={item._id}>
                            <ProductCart id = {item._id} description={item.description} title={item.name} image={item.image.data}  price={item.unitPrice}/>
                    </div>
                })
            }
        </div>    
            
        <div className = "extra">
            <Button colorScheme='blue' size='lg' gap={6} onClick={()=>loadMore()}>{load} <ArrowForwardIcon/> </Button>
        </div>
    </>
    )
}

export default Products
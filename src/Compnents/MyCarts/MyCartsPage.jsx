import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MyCart from '../MyCart/MyCart';
import './mycart.css'
import { Text } from '@chakra-ui/react';

const MyCartsPage = () => {
    const cartInfo = useSelector(state => state.myCart);
    const [price, setPrice] = useState(0);
    const rupee = '\u20B9';
    useEffect(() => {
        let price = 0;
        cartInfo.forEach((item) => {
            price += item.product.unitPrice * item.quantity;
        });
        setPrice(price);

    }, []);

    return (
        <div className = 'main-page-products'>
            <div className='products-page'>
                {
                    cartInfo.filter((item) => item.quantity !==  0).map((item) => {
                        return <MyCart key={item.product._id} unitPrice={item.product.unitPrice} id={item.product._id} image={item.product.image.data.data} quantity={item.quantity} title={item.product.name} price={price} setPrice={setPrice} />
                    })
                }
            </div>
            <div className='price'>
                <Text color='blue.600' fontSize='2xl'>
                    Total Price : {rupee}{price}
                </Text>
            </div>
        </div>
    )
}

export default MyCartsPage
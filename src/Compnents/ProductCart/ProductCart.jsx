import React from 'react';
import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';
import './productcart.css';
import { client } from '../../Client';
import { useState } from 'react';
import { useEffect } from 'react';
import { FETCH_MYCART } from '../../Store/Actions';
import {useDispatch} from 'react-redux'
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ProductCart = ({ image, description, title, price, id }) => {
    const toast = useToast();
    const [imageUrl, setImageUrl] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (image) {
            const imageUrl = `data:image/png;base64,${image}`;
            setImageUrl(imageUrl);
        }
        fetchMyCartData()
    }, [image]);
    const navigate = useNavigate();
    const rupee = '\u20B9';

    const addToCart = () => {
        client.post(`cart/add-to-cart?productId=${id}`)
            .then((resp) => {
                toast({
                    title: 'Added to cart.',
                    description: "You are ready to rock !",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                fetchMyCartData();
            })
            .catch((err) => {
                console.log(err.message);
                if(err.message == 'Request failed with status code 401') {
                    navigate('/login');
                    toast({
                        title: 'Please Login First.',
                        description: "One step Away to shine!",
                        status: 'warning',
                        duration: 2000,
                        isClosable: true,
                    })
                }
                else {
                    toast({
                        title: 'Out Of Stock.',
                        description: "We got you, product will be loaded soon!",
                        status: 'warning',
                        duration: 2000,
                        isClosable: true,
                    })
                }
        })
    };

    const fetchMyCartData = () => {
        try {
            client.get('cart/get-my-cart')
                .then(resp => {
                    dispatch({
                        type: FETCH_MYCART,
                        data: resp.data.data,
                    })
                }
                );
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Card maxW='sm' >
            <CardBody>
                <Image
                    // src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    src={imageUrl}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                    w='500px'
                    h='300px'
                    objectFit="contain"
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{title}</Heading>
                    <Text>
                        {description}
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        {rupee}{price}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter >
                <ButtonGroup  spacing='7'>
                    <Button variant='ghost' onClick={() => addToCart()} colorScheme='blue'>
                        Add to cart
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default ProductCart;

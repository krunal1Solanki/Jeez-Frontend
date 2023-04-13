import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {
    Card,
    Image,
    Stack,
    CardBody,
    Heading,
    Flex,
    Text,
    Button,
} from '@chakra-ui/react';
import './mycart.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { client } from '../../Client';
import { useToast } from '@chakra-ui/react';



const MyCart = ({ id, title, image, quantity, unitPrice, setPrice, price}) => {
    console.log(quantity, unitPrice);
    console.log(document.cookie.indexOf('connect.sid'));
    const [myQuantity, setMyQuantity] = useState(quantity);
    const [processedImage, setImageUrl] = useState('');
    const [letLoad, setLoad] = useState(false);
    const toast = useToast();   


    useEffect(() => {
        if (image) {
            const blob = new Blob([new Uint8Array(image)], { type: 'image/png' });
            setImageUrl(URL.createObjectURL(blob));
        }
    }, []);

    const addToCart = () => {
        setLoad(true);
        client.post(`cart/add-to-cart?productId=${id}`)
            .then((resp) => {
                setPrice(price + parseInt(unitPrice));
                setMyQuantity(myQuantity + 1);
                toast({
                    title: 'Added to cart.',
                    description: "Jeez, You are ready to rock !",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            })
            .catch((err) => {
                toast({
                    title: 'Out Of Stock.',
                    description: "We got you, product will be loaded soon!",
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                })
            })
            .finally(() => {
                setLoad(false);
            });
    };



    const removeFromCart = () => {
        setLoad(true);
        client.get(`/cart/remove-from-cart?productId=${id}`)
            .then((resp) => {
                setPrice(price - parseInt(unitPrice));
                setMyQuantity(myQuantity - 1);
                toast({
                    title: 'Removed from cart.',
                    description: "No worries...!",
                    status: 'info',
                    duration: 2400,
                    isClosable: true,
                });
            })
            .catch(()=> {
                toast({
                    title: 'Error Ouccured!',
                    description: "Whoops, devils work!",
                    status: 'warning',
                    duration: 2400,
                    isClosable: true,
                })
            }) 
            .finally(() => {
                setLoad(false);
            });
    };
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            maxW={700}
            maxH={200}
            mb={3}
            className="parent"
        >
            <Image
                objectFit='contain'
                w='300px'
                h='200px'

                src={processedImage}
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody className="container">
                    <Heading size='md'>{title}</Heading>
                    <Flex className="flex">
                        <Button variant='solid' isLoading={letLoad === true} onClick={() => { myQuantity != 0 && removeFromCart() }} colorScheme='gray'>
                            -
                        </Button>
                        <Heading size='md'>{myQuantity}</Heading>
                        <Button variant='solid' isLoading={letLoad === true} onClick={() => addToCart()} colorScheme='gray'>
                            +
                        </Button>
                        <Button variant='solid' colorScheme='blue'>
                            <Flex className='inner-buttons'>
                                <FontAwesomeIcon icon={faCartShopping} />
                                <Text ml={2}>Buy Now </Text>
                            </Flex>
                        </Button>
                    </Flex>
                </CardBody>

            </Stack>
        </Card>

    )
}

export default MyCart
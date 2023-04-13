import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, Heading, CardFooter } from '@chakra-ui/react'
import { Input, HStack, Stack, Text, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
import { useState } from 'react'
import { client } from '../../Client'
import './addProduct.css'
import { useToast } from '@chakra-ui/react';

const AddProduct = () => {
    const toast = useToast();
  const [formData, setFormData] = useState({
    quantity: null,
    unitPrice: null,
    description: "",
    productName: "",
    imageFile: null,
  });

  const changeHandler = (event) => {
    const { value, name } = event.target;
    if (name === 'quantity') setFormData({ ...formData, quantity: Number(value) });
    else if (name === 'unitPrice') setFormData({ ...formData, unitPrice: Number(value) });
    else if (name === 'description') setFormData({ ...formData, description: value });
    else if (name === 'productName') setFormData({ ...formData, productName: value });
    else if (name === 'imageFile') setFormData({ ...formData, imageFile: event.target.files[0] });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const body = new FormData();
    body.append('name', formData.productName);
    body.append('unitPrice', formData.unitPrice);
    body.append('description', formData.description);
    body.append('quantity', formData.quantity);
    body.append('image', formData.imageFile);

    client
      .post('/product/add-product', body,
      )
      .then((resp) => {
        toast({
            title: 'Added to cart.',
            description: "Jeez, You are ready to rock !",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
    })
      .catch((error) => {
        toast({
            title: 'Error Ouccured!',
            description: "Whoops, devils work!",
            status: 'warning',
            duration: 2400,
            isClosable: true,
        })
      });
  };
      


  return (
    <div className='add-product-page'>
      <form className="add-product-container" onSubmit={submitHandler}>
        <Card variant="filled" maxW="md" width="100%">
          <CardHeader>
            <Heading size="md">Add Product</Heading>
          </CardHeader>

          <CardBody>
            <Stack spacing={3}>
              <Input placeholder="Enter name " size="md" name="productName" type="text" value={formData.productName} onChange={changeHandler} />
              <Input placeholder="Enter decription" size="md" name="description" type="text" value={formData.description} onChange={changeHandler} />
              <Input placeholder="Enter unit price" size="md" name="unitPrice" type="number" value={formData.unitPrice} onChange={changeHandler} />
              <Input placeholder="Enter quantity" size="md" name="quantity" type="number" value={formData.quantity} onChange={changeHandler} />
              <Input placeholder="Enter Image" size="md" name="imageFile" type="file" accept="image/*" onChange={changeHandler} />
            </Stack>
          </CardBody>
          <CardFooter>
            <Button colorScheme="blue" type="submit">
              Add Product
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AddProduct;

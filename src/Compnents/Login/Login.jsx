    import React from 'react'
    import { Navigate, useNavigate } from 'react-router-dom'
    import { Card, CardHeader, CardBody, Heading, ModalBody } from '@chakra-ui/react'
    import { Input, HStack, Stack, Text, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
    import { useState } from 'react'
    import { useDispatch } from 'react-redux/es/exports'
    import './login.css'
    import { client } from '../../Client'
    import { FETCH_MYCART, FETCH_PRODUCTS } from '../../Store/Actions'


    const Login = () => {
        const navigate = useNavigate();
        const [show, setShow] = useState(false)
        const handleClick = () => setShow(!show)
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [errorMsg, setErrorMsg] = useState(false);
        const dispatch = useDispatch();

        const changeHandler = (event) => {
            const { value, name } = event.target;
            name === "password" ? setPassword(value) : setEmail(value);
        }

        const fetchMyCartData = () => {
            try {
                client.get('cart/get-my-cart')
                    .then(resp => {
                        dispatch({
                            type: FETCH_MYCART,
                            data: resp.data.data,
                        })
                        console.log(resp.data.data)                    
                    }
                    );
            } catch (error) {
                console.log(error);
            }
        }
        const submitHandeler = () => {
            const body = {
                name: email,
                password
            }

            client
                .post("/user/login", body)
                .then((resp) => {
                    fetchMyCartData();
                    navigate('/');
                })
                .catch((error) => { console.log('error', error); setErrorMsg(true) })
        }

        return (
            <div>
                {window.localStorage.getItem("token") ? (
                    <Navigate to="/" replace />
                ) : (
                    <div className='form'>
                        <Card variant="filled" maxW="md" width="100%">
                            <CardHeader>
                                <Heading size='md'>Login</Heading>
                            </CardHeader>

                            <CardBody>
                                <Stack spacing={3}>
                                    <Input placeholder='Enter Email' size='md' name="email" value={email} onChange={changeHandler} />
                                </Stack><InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        type={show ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        name="password"
                                        value={password}
                                        onChange={changeHandler}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <HStack>
                                    <Button mt={2} backgroundColor={"black"} onClick={() => submitHandeler()} colorScheme='twitter' >
                                        Submit
                                    </Button>
                                    {errorMsg &&
                                        <Text>Don't have an account? <a href="/register">Register here</a></Text>
                                    }
                                </HStack>
                            </CardBody>
                        </Card>
                    </div>


                )}
            </div>
        )
    }

    export default Login

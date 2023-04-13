import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, Heading } from '@chakra-ui/react'
import { Input, HStack, Stack, Text, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
import { useState } from 'react'
import './register.css'
import { client } from '../../Client'


const Register = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [username, setName] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const changeHandler = (event) => {
        const { value, name } = event.target;
        if (name == 'password') setPassword(value);
        else if (name == 'username') setName(value);
        else if (name == 'mobile') setMobile(value);
        else setEmail(value);
    }

    const submitHandeler = () => {
        const body = {
            email,
            password,
            username,
            mobile
        }

        client.post("/user/register", body)
            .then((resp) => {
                navigate('/login');
            })
            .catch((error) => {
                const obj = error.response.data.error.errors;
                const err = Object.values(obj)[0];
                setErrorMsg(err)
             })
    }
    return (
        <div>
            <div className='form'>
                <Card variant="filled" maxW="md" width="100%">
                    <CardHeader>
                        <Heading size='md'>Register</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack spacing={3}>
                            <Input placeholder='Enter Username' size='md' name="username" value={username} onChange={changeHandler} />
                            <Input placeholder='Enter Email' size='md' name="email" value={email} onChange={changeHandler} />
                            <Input placeholder='Enter Mobile' size='md' name="mobile" value={mobile} onChange={changeHandler} />
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
                            <Button mt={4} backgroundColor={"black"} onClick={() => submitHandeler()} colorScheme='twitter' >
                                Submit
                                </Button>
                                {errorMsg.length > 0 && <div className='error'>{errorMsg}</div>}       
                        </HStack>
                        
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Register

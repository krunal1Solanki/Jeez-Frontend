import React from 'react'
import { NavLink } from 'react-router-dom'
import { Flex, Stack, Switch, Text } from '@chakra-ui/react'
import './header.css'
import { useNavigate } from 'react-router-dom'
import { client } from '../../Client'
import { useEffect } from 'react'

const Header = ({setAuth, auth}) => {
    const navigate = useNavigate();
    const logout = () => {
        client.get('/user/logout').then((resp) => {navigate('/login'); setAuth(false)});
        navigate('/login');
    }

    useEffect(()=> {
        client.get('/user/check-auth')
        .then(()=> setAuth(true))
        .catch((error) =>setAuth(false));
    }, [])

    return (
        <div className='header'>
            <div className="heading" onClick={() => navigate('/')}><h2>Jeez</h2>
            </div>
            <div className="links">
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/my-carts">My Cart</NavLink>
                <NavLink to="/add-product">Add Product</NavLink>

                {
                    auth 
                        &&  
                    <Stack direction='row'>
                        <Flex className='switch' justifyContent='center' alignItems='center' gap='10px' onChange={() => logout()}>
                            <Text>Logout</Text>
                            <Switch colorScheme='green' isChecked={auth} />
                        </Flex>
                    </Stack>
                }
                {
                    !auth 
                        &&
                        <Stack direction='row'>
                        <Flex className='switch' justifyContent='center' alignItems='center' gap='10px' onChange={() => navigate('/login')}>
                            <Text>Login</Text>
                            <Switch colorScheme='green' isChecked={auth} />
                        </Flex>
                    </Stack>
                }
                
            </div>
        </div>
    )
}

export default Header
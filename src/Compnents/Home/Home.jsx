import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux/es/exports';
import { FETCH_PRODUCTS } from '../../Store/Actions';
import { client } from '../../Client';
import './home.css'
import img1 from '../../Images/brand1.jpg';
import img2 from '../../Images/brand2.jpg';
import FeaturedProducts from '../Featured Products/FeaturedProducts';
import Footer from '../Footer/Footer';

const Home = () => {
    const dispatch = useDispatch();
    const [featureLoading, setFeatureLoading] = useState(false);
    useEffect(() => {
        fetchAllData();
    }, []);
    const fetchAllData = () => {
        console.log('ok')
        client.get('/product/get-products').then((resp) => {
            try {
                dispatch({
                    type: FETCH_PRODUCTS,
                    data: resp.data.data,
                });
                setFeatureLoading(true);
            } catch (error) {
                console.log(error);
            }
        });
    };

    const images = [
        img1, img2
    ];

    return (
    <>
        <div className='home-container'>
            <div className='branding'>
                <div className='main-brand'>
                    <span>J</span>
                    <span>E</span>
                    <span>E</span>
                    <span>Z</span>
                </div>
                <div>Get ready to turn heads with Jeez fashion</div>
            </div>
            
            <div className='branding-images'>
                <img src={images[0]} alt="" />
                <img src={images[1]} alt="" />
            </div>
        </div>
        <div className='feature-heading'>
                Featured Products
        </div>
        {featureLoading && <FeaturedProducts/>}
    </>
    );
};

export default Home;

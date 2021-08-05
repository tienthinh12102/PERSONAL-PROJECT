import React from 'react';
import "./style.scss"
import Headers from '../../Header/Headers';
import BannerProducts from '../Products/BannerProducts/BannerProducts';
import Instagram from '../Products/Instagram/Instagram';
import Footer from '../../Footer/Footer';
import ContentOrderDetails from './ContentOrderDetails';


const orderDetails = () => {
    return (
        <>
            <Headers></Headers>
            <BannerProducts></BannerProducts>
            <ContentOrderDetails />
            <Instagram></Instagram>
            <Footer></Footer>
        </>
    );
};

export default orderDetails;
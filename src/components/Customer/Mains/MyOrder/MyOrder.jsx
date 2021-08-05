import React, { useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import { getOrder } from '../../../../redux/actions/orderAction';
import Footer from '../../Footer/Footer';
import Headers from '../../Header/Headers';
import BannerProducts from '../Products/BannerProducts/BannerProducts';
import Instagram from '../Products/Instagram/Instagram';
import ContentMyOrders from './ContentMyOrder';
import './style.scss';

const MyOrders = ({ auth, orders }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const { accessToken } = auth || {};
    if (accessToken) {
      dispatch(getOrder());
    }
  }, [])
  console.log(`orders`, orders)
  return (
    <>
      <Headers />
      <BannerProducts />
      <ContentMyOrders orders={orders} />
      <Instagram />
      <Footer />
    </>
  );
};

function mapStateToProps(state) {
  const {
    auth: { data: authData },
    order: { data: orderData }
  } = state;
  return { auth: authData, orders: orderData };
}

export default connect(mapStateToProps)(MyOrders);

import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import MyOrderItem from './MyOrderItem';

const ContentMyOrder = ({ auth, orders }) => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const { accessToken } = auth || {};
    if (accessToken) {
      const userInfo = jwt_decode(accessToken);
      const { id } = userInfo;
      setUserId(id)
    }
  }, [auth])

  const dataOrder = (orders && orders.length && orders.filter(order => order.userId === userId)) || [];

  const orderItem = dataOrder.map((item, index) => { return <MyOrderItem key={index} index={index} data={item} /> })

  return (
    <div>
      <div className="container">
        <div className="row orderDetails ">
          <div className="col-lg-12 center" >
            <h1 className="orderDetails__title"> Bill List !</h1>
            {orderItem}
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {

  const {
    auth: { data }
  } = state;

  return { auth: data };
}

export default connect(mapStateToProps)(ContentMyOrder);

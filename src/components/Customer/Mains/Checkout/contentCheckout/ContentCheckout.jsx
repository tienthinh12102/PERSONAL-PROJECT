import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { addOrder } from "../../../../../redux/actions/orderAction";
import FormInformation from "./FormInfomation";


const ContentCheckout = ({ auth, cart }) => {

  const [userState, setUserState] = useState(null);

  useEffect(() => {
    const { accessToken } = auth || {};
    if (accessToken) {
      const userInfo = jwt_decode(accessToken);
      console.log(userInfo)
      setUserState(userInfo)
    }
  }, [auth])


  const dispatch = useDispatch()

  const formatDataProducts = cart && cart.length && cart.map((item) => {
    const { name, sale, price, quantity } = item;
    return {
      name,
      quantity,
      price: price - price * sale,
      unitPrice: (price - price * sale) * quantity,
    }
  })


  const order = cart.map((product, index) => {

    const { name, sale, price, quantity } = product;

    const unitPrice = (price - price * sale) * quantity;

    return <div className="Order__item" key={index}>
      <p>
        {name}  x <strong>{quantity}</strong>
      </p>
      <p>${unitPrice}</p>
    </div>
  });


  const calcualteTotalPrice = (cart) => {
    const total = cart.reduce((sum, currentProduct) => {
      const { price, sale, quantity } = currentProduct || {};
      return sum + (price - price * sale) * quantity;
    }, 0);
    return total;
  }

  const submitDataUser = (dataUser) => {
    const { fullname, phoneNumber, orderNotes, deleveryAddress, userId } = dataUser;
    const dataOrder = {
      userId,
      fullname,
      phoneNumber,
      orderNotes,
      deleveryAddress,
      cart: {
        product: formatDataProducts,
        totalPrice: calcualteTotalPrice(cart)
      }
    };
    dispatch(addOrder(dataOrder))
  }

  const formatAdress = (userState) => {
    const { address= "", district= "", city= ""} = userState || {};
    const deliveryAddress = `${address} / ${district} / ${city}`;
    if (userState) {
      userState.deliveryAddress = deliveryAddress;
    }
    return userState;
  }

  return (
    <div className="container-fluid">
      <div className="row checkout">
        <div style={{ padding: '0px' }} className="col-sm-12 col-md-5 order2">
          <FormInformation dataUser={formatAdress(userState)} submitDataUser={submitDataUser}></FormInformation>
        </div>
        <div style={{ padding: '0px' }} className="col-sm-12 col-md-7">
          <div className="Order">
            <h1>Your Order</h1>
            <div className="Order__title">
              <p>Products</p>
              <p>Unit total</p>
            </div>
            {order}
            <div className="deliverycharges">
              <p>Delivery charges</p>
              <p>$0</p>
            </div>
            <div className="totalprice">
              <p>Total Price</p>
              <p>${calcualteTotalPrice(cart)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


function mapStateToProps(state) {
  const {
    auth: { data: authData },
    cart: { data: cartdata }
  } = state;
  return { auth: authData, cart: cartdata };
}

export default connect(mapStateToProps)(ContentCheckout);

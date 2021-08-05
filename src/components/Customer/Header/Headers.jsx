import React, { useState, useEffect } from "react";
import logo from "../../../assests/images/logo-header.jpeg";
import ModalCart from "./Modal/Cart/Cart";
import LoginRegister from "./Modal/register/LoginRegister";
import ModalMenu from "./Modal/Menu/Menu";
import NavMenu from "./NavMenu/NavMenu";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import "./style.scss";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { connect, useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/authAction";
import SearchForm from "./SearchForm";

function Header({ auth, cart, shouldOpenLoginModal, authError }) {

  const dispatch = useDispatch();
  const quantityProductInCart = cart.data.length;
  const history = useHistory();

  // const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if ((!auth || !auth.length) && authError) {
      dispatch(logout())
    }
  }, [auth])

  useEffect(() => {
    const { accessToken } = auth || {};
    if (accessToken) {
      const userInfo = jwt_decode(accessToken);
      const userName = userInfo.lastName;
      setName(userName)
      setIsLogin(true)
      setShowSignIn(false)
    }
  }, [auth])

  useEffect(() => {
    if (shouldOpenLoginModal) {
      history.push('/ShoppingCart');
      onToggleSignIn();
    }
  }, [shouldOpenLoginModal])

  // function onToggleCart() {
  //   setShowCart(!showCart);
  // }

  function onToggleMenu() {
    if (onHandleToggleMenu) {
      onHandleToggleMenu();
    }
  }

  function onToggleSignIn() {
    setShowSignIn(!showSignIn);
  }

  function onHandleToggleMenu() {
    setShowMenu(!showMenu);
  }

  function onHandleLogout() {
    dispatch(logout())
    setName('')
    history.push("/");
    setIsLogin(false)
  }

  return (
    <div className="header ">
      {/* <div
        className={showCart ? "header__overlay" : ""}
        onClick={onToggleCart}
      ></div> */}
      <div
        className={showMenu ? "menu__overlay" : ""}
        onClick={onToggleMenu}
      ></div>
      <div
        className={showSignIn ? "signin__overlay" : ""}
        onClick={onToggleSignIn}
      ></div>
      <img src={logo} alt="Logo Header" className="header__logo" />
      <NavMenu/>
      <div className="header-group">
        <span>
          <SearchForm />
        </span>
        <div className="header-group__cart">
          <Link to='/ShoppingCart'>
            <i className="fa fa-shopping-basket" aria-hidden="true" />
          </Link>
          <div className="header-group__cart--count">{quantityProductInCart}</div>
        </div>
        {/* <div className="header-group__cart  header-group__cart-mobile" onClick={onToggleCart}>
          <i className="fa fa-shopping-basket" aria-hidden="true" />
          <div className="header-group__cart--count">2</div>
        </div> */}
        <div className="header-group__collap header-group__collap-mobile " onClick={onToggleMenu}>
          <i className="fa fa-bars" aria-hidden="true" />
        </div>
        {isLogin && <ProfileMenu name={name} handleLogout={onHandleLogout} />}
        {!isLogin && <div className="header-group__collap" onClick={onToggleSignIn}>
          <i className="fa fa-sign-in" aria-hidden="true"></i>
        </div>}
      </div>
      <LoginRegister
        showSignIn={showSignIn}
        onToggleSignIn={onToggleSignIn}
      ></LoginRegister>
      {/* <ModalCart showCart={showCart} onToggleCart={onToggleCart} /> */}
      <ModalMenu showMenu={showMenu} onHandleToggleMenu={onHandleToggleMenu} />
    </div>
  );
}

function mapStateToProps(state) {
  const {
    cart,
    auth: { data, error: authError },
  } = state;
  return { cart, auth: data, authError };
}

export default connect(mapStateToProps)(Header);

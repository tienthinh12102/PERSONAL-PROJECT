import jwt_decode from "jwt-decode";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loginStart } from '../../../../../redux/actions/authAction'
import { connect } from "react-redux";


const FormLogin = ({ onCloseModal, auth, error }) => {

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const history = useHistory();

  const showMessage = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const checkNavigate = (role) => {
    if (role === "admin") {
      history.push("/admin");
    }
  };

  useEffect(() => {
    const { accessToken } = auth || {};
    if (accessToken) {
      const userInfo = jwt_decode(accessToken);
      const { role = "user" } = userInfo;
      checkNavigate(role);
      onCloseModal();
    }
  }, [auth])

  useEffect(() => {
    if (error) {
      showMessage(error);
    }
  }, [error])

 

  function onSubmitLogin(data) {
    dispatch(loginStart(data))
    reset({ example: "", exampleRequired: "" });
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <form  className="form form__login" onSubmit={handleSubmit(onSubmitLogin)}>
        <input
          className="form-control"
          aria-describedby="inputGroup-sizing-default"
          type="text"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
        />
        {errors.email && <span>*Please enter valid data !</span>}
      
        <input
          className="form-control"
          aria-describedby="inputGroup-sizing-default"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>*Please enter valid data !</span>}

        <button type="submit" className="button__submit">
          Login
        </button>
      </form>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  const {
    auth: { data, error },
  } = state;
  return { auth: data, error };
}

export default connect(mapStateToProps)(FormLogin);

// import React from "react";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import { useForm } from "react-hook-form";
// import {
//   Link,
//   Redirect,
//   Route,
//   useHistory,
//   useRouteMatch,
// } from "react-router-dom";

// const FormLogin = ({ onCloseModal }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();
//   const history = useHistory();

//   const checkNavigate = (role) => {
//     if (role === "admin") {
//       history.push("/admin");
//     } else {
//       history.push("/");
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       const {
//         data: { accessToken },
//       } = await axios.post("http://localhost:5000/api/login", data);
//       console.log(data);
//       const userInfo = jwt_decode(accessToken);
//       const { sub } = userInfo || {};
//       const res = await axios.get(`http://localhost:5000/api/users/${sub}`);
//       const user = res.data;
//       const { role, email } = user || {};
//       checkNavigate(role);
//       localStorage.setItem("statusLogin", "true");
//       onCloseModal();
//       reset({ example: "", exampleRequired: "" });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <form className="form form__login" onSubmit={handleSubmit(onSubmit)}>
//       <input
//         autoComplete="on"
//         type="text"
//         placeholder="Email"
//         {...register("email", {
//           required: true,
//           pattern: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g,
//         })}
//       />
//       {errors.email && <span>Please enter valid data !</span>}
//       <br />

//       <input
//         autoComplete="on"
//         type="password"
//         placeholder="Password"
//         {...register("password", { required: true })}
//       />
//       {errors.password && <span>Please enter valid data !</span>}
//       <br />

//       <button type="submit" className="button__submit">
//         Login
//       </button>
//       <br />
//     </form>
//   );
// };

// export default FormLogin;

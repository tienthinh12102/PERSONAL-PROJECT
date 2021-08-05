import React, {useState} from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import urlApi from '../../../../../urlApi';
import { toast, ToastContainer } from "react-toastify";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components'

const TextFieldStyled = styled(TextField)`
    width: 100%;
    padding:0;
    margin: .5rem 0 0;
    float: right;
`

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function DatePickers({onSelectBrithDay}) {
  const classes = useStyles();

  return (
      <TextFieldStyled
        id="date"
        label="Birthday:"
        type="date" 
        defaultValue="2021-07-31"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => onSelectBrithDay(e.target.value)}
      />
  );
}

const FormRegister = ({ onRegisterSuccess }) => {
  const [birthDay, setBithday] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const handlerSelectBrithDay = (value) => {
    setBithday(value)
  }

  const password = watch("password", "");

  function onSubmit(data) {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      retypePassword,
      sex,
      address,
      district,
      city,
    } = data;
    axios
      .post(`${urlApi}users`, {
        firstName,
        lastName,
        email,
        phone,
        password,
        retypePassword,
        birthDay,
        sex,
        address,
        district,
        city,
        role: "user",
      })
      .then(function ({ data }) {
        console.log(data)
        if (data) {
          onRegisterSuccess();
          showMessage('Register Success !')
        }
      })
      .catch(function (error) {});
    reset({ example: "", exampleRequired: "" });
  }

  const showMessage = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <form className="form form__register" onSubmit={(e) => e.preventDefault()}>
      <input
      className="form-control"
      aria-describedby="inputGroup-sizing-default"
        autoComplete="on"
        type="text"
        placeholder="First Name"
        {...register("firstName", { required: true, maxLength: 40 })}
      />
      {errors.firstName && <span>*Please enter valid data !</span>}

      <input
      className="form-control"
      aria-describedby="inputGroup-sizing-default"
        autoComplete="on"
        type="text"
        placeholder="Last Name"
        {...register("lastName", { required: true, maxLength: 10 })}
      />
      {errors.lastName && <span>*Please enter valid data !</span>}

      <input
      className="form-control"
      aria-describedby="inputGroup-sizing-default"
        autoComplete="on"
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
        autoComplete="on"
        type="text"
        placeholder="Phone"
        {...register("phone", {
          required: true,
          pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        })}
      />
      {errors.phone && <span>*Please enter valid data !</span>}

      <input
      className="form-control"
      aria-describedby="inputGroup-sizing-default"
        autoComplete="on"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: true,
          pattern:
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g,
        })}
      />
      {errors.password?.type === "required" && (
        <span>*Please enter valid data !</span>
      )}
      {errors.password?.type === "pattern" && (
        <span>*8 least characters: letter, number, special characters!</span>
      )}

      <input
      className="form-control"
      aria-describedby="inputGroup-sizing-default"
        autoComplete="on"
        type="password"
        placeholder="Retype password"
        {...register("retypePassword", {
          required: true,
          validate: (value) =>
            value === password || "The passwords do not match",
        })}
      />
      {errors.retypePassword?.type === "required" && (
        <span>*Please enter valid data !</span>
      )}
      {errors.retypePassword?.type === "validate" && (
        <span>*The passwords do not match! </span>
      )}

      <DatePickers onSelectBrithDay={handlerSelectBrithDay}/>

      <select {...register("sex")}>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>

      <input
      className="form-control"
      aria-describedby="inputGroup-sizing-default"
        autoComplete="on"
        type="text"
        placeholder="Address"
        {...register("address", { required: true })}
      />
      {errors.address && <span>*Please enter valid data !</span>}

      <input
      className="form-control"
      aria-describedby="inputGroup-sizing-default"
        autoComplete="on"
        type="text"
        placeholder="District"
        {...register("district", { required: true })}
      />
      {errors.district && <span>*Please enter valid data !</span>}

      <input
      className="form-control"
          aria-describedby="inputGroup-sizing-default"
        autoComplete="on"
        type="text"
        placeholder="City"
        {...register("city", { required: true })}
      />
      {errors.city && <span>**Please enter valid data !</span>}

      <button
        type="submit"
        className="button__submit"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </button>
    </form>
  );
};

export default FormRegister;

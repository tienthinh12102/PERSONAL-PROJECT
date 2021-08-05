
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

const FormInformation = ({ dataUser ,submitDataUser }) => {

  const { fullName = '' , phone = '', id = '', deliveryAddress} = dataUser || {};
  const [stateId, setStateId] = useState(id);

  useEffect(() => {
    setStateId(id)
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const history = useHistory();

  function onSubmit(data) {
    const { fullname, phoneNumber, orderNotes, deleveryAddress } = data;
    const dataUser = { fullname, phoneNumber, orderNotes, deleveryAddress, userId: stateId }
    submitDataUser(dataUser)
    reset({ example: "", exampleRequired: "" });
    history.push('/OrderDetails')
  }


  return (
    <form className="userform" onSubmit={(e) => e.preventDefault()}>
      <h1>Billing Information</h1>
      <input
        autoComplete="on"
        type="text"
        className="form-control"
        placeholder="Full Name"
        defaultValue={fullName}
        {...register("fullname", { required: true, maxLength: 25 })} />
      {errors.fullname && <span>* Please enter Full Name !</span>}


      <input
        autoComplete="on"
        type="text"
        className="form-control"
        placeholder="Phone number"
        defaultValue={phone}
        {...register("phoneNumber", { required: true, pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g, })} />
      {errors.phoneNumber && <span>* Please enter Phone number !</span>}
      <input
        autoComplete="on"
        type="text"
        className="form-control"  
        placeholder="Delivery address"
        defaultValue={deliveryAddress}
        {...register("deleveryAddress", { required: true, maxLength: 50 })} />
      {errors.deleveryAddress && <span>* Please enter Delivery address !</span>}
      <textarea
        className="form-control"
        rows="5"
        placeholder="Order notes"
        {...register("orderNotes")} />


      <button type="button" className="btn btn-light" onClick={handleSubmit(onSubmit)}>
        Order
      </button>
    </form>
  );
};

export default FormInformation;

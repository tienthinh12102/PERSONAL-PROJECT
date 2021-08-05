import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import url from "../../../../../urlApi";

const FormCategories = ({ onChangeTab }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    axios
      .post(`${url}/categories`, {
        name: data.CategoriesName,
      })
      .then(function (response) {
        onChangeTab('1')
      })
      .catch(function (error) {});

    reset({ example: "", exampleRequired: "" });
  }

  return (
    <form className="form__category--add" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Categories Name"
        {...register("CategoriesName", { required: true })}
      />
      {errors.CategoriesName && <span> * Please enter valid data !</span>}
      <br />
      <button
        type="submit"
        className="btn btn-primary"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </button>
    </form>
  );
};

export default FormCategories;

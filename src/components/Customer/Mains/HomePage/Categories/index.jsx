import axios from "axios";
import React, { useEffect, useState } from "react";
import Item from "./Item/Item";
import "./style.scss";

function Category(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/api/categories")
        .then(res => {
          setCategories(res.data);
        })
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="category">
      <Item categories={categories} />
    </div>
  )
}

export default Category;

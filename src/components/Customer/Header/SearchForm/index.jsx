import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductsSearch from "../ProductsSearch";
import "./style.scss";

function SearchForm(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([])
  const getProductsStore = useSelector(state => state.products.data);

  const filterProducts = () => {
    const products = getProductsStore.filter(product => {
      return product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
    });

    setProducts(products);
  }

  useEffect(() => {
    filterProducts();
  }, [searchTerm]);

  return (
    <div className="search-form">
      <form className="search-form__form">
        <input
          type="text"
          className="header-group__search"
          placeholder="&nbsp;&nbsp;&nbsp;&nbsp;Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <ProductsSearch searchTerm={searchTerm} products={products} />
    </div>
  )
}

export default SearchForm;

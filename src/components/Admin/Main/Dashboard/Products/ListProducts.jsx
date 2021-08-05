import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProductsStart, getItemProduct } from "../../../../../redux/actions/productAction";
import ConfirmationDialog from "../../../../common/ConfirmationDialog/ConfirmationDialog";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import urlApi from '../../../../../urlApi';
import EditForm from "./EditForm";

function Image(image) {
  let style = {
    width: "50px",
    height: "70px",
  };

  return <img style={style} alt={image.src} src={image.src}></img>;
}

function ButtonGroup({ params, openConfirmModal, getDataProduct }) {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => getDataProduct(params)}>
        Edit
      </button>
      <button type="button" className="btn btn-danger" onClick={() => openConfirmModal(params)}>
        Delete
      </button>
    </div>
  );
}

function ListProducts() {

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [sortModel, setSortModel] = React.useState([
    {
      field: 'createdAt',
      sort: 'desc',
    },
  ]); 
  const columns = [
    { field: "categoryId", headerName: "CategoryName", width: 180 },
    {
      field: "bigPicture",
      headerName: "Image",
      width: 150,
      renderCell: (params) => {
        return <Image src={params.row.bigPicture}></Image>;
      },
    },
    { field: "name", headerName: "Name", width: 180 },
    { field: "id", headerName: "Id", width: 110 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "sale", headerName: "Sale", width: 120 },
    { field: "createdAt", headerName: "CreatedAt", width: 150 },
    {
      field: "action",
      headerName: "Action",
      disableClickEventBubbling: true,
      width: 150,
      renderCell: (params) => {
        return <ButtonGroup getDataProduct={getDataProduct} openConfirmModal={openConfirmModal} params={params}  ></ButtonGroup>;
      },
    },
  ];


  const dispatch = useDispatch();
  const dataProducts = useSelector((state) => state.products.data);
  const isLoading = useSelector((state) => state.products.isLoading);


  //-------------------------- get categoryName---------------------------

  const [category, setCategory] = useState(null);

  
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect( () => {
    axios.get(`${urlApi}categories`)
          .then(function (response) {
            setCategory(response.data)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
  }, []);

  const getCategoryName = categoryId => {
    // get list categories => categories
    const categories = category || [];
    const cate = categories.find(item => item.id === categoryId);
    return (cate && cate.name) || '';
  }

  const formatData = dataProducts.map((item) => {

      const { categoryId, name, bigPicture, price, id, createdAt, sale } = item;
      const categoryName = getCategoryName(categoryId)
      return {
        id,
        categoryId: categoryName,
        bigPicture,
        name,
        price,
        sale,
        createdAt: new Date(createdAt).toISOString()
      };
    });
  
  // ----------------- delete Products-------------------

  const openConfirmModal = (params) => {
    setOpenConfirm(true);
    setSelectedProductId(params.id);
  }

  const closeConfirm = () => {
    setOpenConfirm(false);
  }

  const handleDelete = () => {
    dispatch(deleteProductsStart(selectedProductId));
    closeConfirm();
  }

  // ---------------- get data product----------------------

  const getDataProduct = (params) => {
      dispatch(getItemProduct(params))
  }


  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <DataGrid
        rows={formatData}
        columns={columns}
        pageSize={10}
        sortModel={sortModel}
      />
      <ConfirmationDialog open={openConfirm} onClose={closeConfirm} onOk={handleDelete} title={'product'}/>
      <EditForm/>
    </div>
  );
}

export default ListProducts;


import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import urlApi from '../../../../../urlApi';
import ConfirmationDialog from "../../../../common/ConfirmationDialog/ConfirmationDialog";

function ButtonGroup({ params, openConfirmModal }) {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button type="button" className="btn btn-primary">
        Edit
      </button>
      <button type="button" className="btn btn-danger" onClick={() => openConfirmModal(params)}>
        Delete
      </button>
    </div>
  );
}

function ListCategories() {

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
 
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "createdAt", headerName: "CreatedAt", width: 250 },
    { field: "updatedAt", headerName: "UpdatedAt", width: 250 },
    {
      field: "action",
      headerName: "Action",
      disableClickEventBubbling: true,
      width: 200,
      renderCell: (params) => {
        console.log(params)
        return <ButtonGroup openConfirmModal={openConfirmModal} params={params}></ButtonGroup>;
      },
    },
  ];
  // ----------------------get category----------------------
  useEffect(() => {
    axios
      .get(`${urlApi}categories`)
      .then(function (response) {
        const { data } = response;
        const formatCategories = formatData(data);
        setStateCategories(formatCategories);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const [stateCategories, setStateCategories] = useState([]);
  const [sortModel, setSortModel] = React.useState([
    {
      field: 'createdAt',
      sort: 'desc',
    },
  ]); 

  const formatData = (categories) => {
    return categories.map((item) => {
      const { name, id, createdAt, updatedAt } = item;
      return {
        id,
        name,
        createdAt: new Date(createdAt).toISOString(),
        updatedAt: new Date(createdAt).toISOString(),
      };
    });
  };
  // ----------------------delete category----------------------

  const removeCategory = (category) => {
    return stateCategories.filter(cate => cate.id !== category);
  }

  const openConfirmModal = (params) => {
        setOpenConfirm(true);
        setSelectedCategory(params.id)
  }

  const closeConfirm = () => {
        setOpenConfirm(false);
  }

  const handleDelete = () => {
        axios.delete(`${urlApi}categories/${selectedCategory}`)
        .then(function (response) {
          const newCategories = removeCategory(selectedCategory);
          setStateCategories(newCategories)
        })
        .catch(function (error) {
          console.log(error);
        }); 
        closeConfirm();
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={stateCategories}
        columns={columns}
        pageSize={5}
        sortModel={sortModel}
      />
       <ConfirmationDialog open={openConfirm} onClose={closeConfirm} onOk={handleDelete} title={'Category'}/>
    </div>
  );
}

export default ListCategories;

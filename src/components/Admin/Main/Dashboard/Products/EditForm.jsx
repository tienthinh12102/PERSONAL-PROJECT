import React, {useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import url from "../../../../../urlApi";
import { useDispatch, useSelector } from "react-redux";
import { editItemProduct } from '../../../../../redux/actions/productAction';

const EditForm = () => {

    const dataProduct = useSelector((state) => state.products.dataItem);
    const {id , bigPicture, description, name, price, sale, thumbnailUrl = []} = dataProduct || {};

    const [category, setCategory] = useState(null);
    const datacategory = category || [];
    const dispatch = useDispatch();

    useEffect( () => {
        axios.get(`${url}categories`)
              .then(function (response) {
                setCategory(response.data)
              })
              .catch(function (error) {
                console.log(error);
              })
      }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
    
    const patternUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    
      function onSubmit(data) {
        console.log(data)
        const {
            CategoriesId,
            ProductsName,
            ProductsPrice,
            ProductsSale,
            BigPicture,
            ThumbnailUrl1,
            ThumbnailUrl2,
            ThumbnailUrl3,
            ThumbnailUrl4,
            Description,
          } = data;

          const formatData = {
            id: id,
            categoryId: CategoriesId,
            ProductsName,
            ProductsPrice,
            ProductsSale,
            BigPicture,
            ThumbnailUrl1,
            ThumbnailUrl2,
            ThumbnailUrl3,
            ThumbnailUrl4,
            Description,
          }

        dispatch(editItemProduct(formatData))
        reset({ example: "", exampleRequired: "" });
      }
    
      const dataOption = datacategory.map((item, index) =>  <option key={index} value={item.id}>{item.name}</option> )

    return (
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content1">
                    <div className="modal-header">
                        <h1 className="modal-title" id="exampleModalLongTitle">Edit Products</h1>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <form className="form__products--add" onSubmit={(e) => e.preventDefault()}>

                            <select {...register("CategoriesId", { required: true })}>
                                <option value="">Category name</option>
                                {dataOption}  
                            </select>
                            {errors.CategoriesId && <span> * Please choose a category !</span>}
                            <br />

                            <input
                                type="text"
                                placeholder="Products Name"
                                defaultValue={name}
                                {...register("ProductsName", { required: true })}
                            />
                            {errors.ProductsName && <span> * Please enter valid data !</span>}
                            <br />

                            <input
                                type="text"
                                placeholder="Products Price"
                                defaultValue={price}
                                {...register("ProductsPrice", { required: true, pattern: /[0-9]+(\\.[0-9][0-9]?)?/g })}
                            />
                            {errors.ProductsPrice && <span> * Please enter valid data !</span>}
                            <br />

                            <input
                                type="number"
                                max="1"
                                min="0"
                                step="0.05"
                                defaultValue={sale}
                                placeholder="Products Sale(value to 0 from 1)"
                                {...register("ProductsSale", { required: true })}
                            />
                            {errors.ProductsSale && <span> * Please enter valid data !</span>}
                            <br />

                            <input
                                type="text"
                                placeholder="Big picture"
                                defaultValue={bigPicture}
                                {...register("BigPicture", { required: true, pattern: patternUrl  })}
                            />
                            {errors.BigPicture && <span> * Please enter valid data !</span>}
                            <br />

                            <input
                                type="text"
                                defaultValue={thumbnailUrl[0]}
                                placeholder="thumbnail Url(1) "
                                {...register("ThumbnailUrl1", { required: true, pattern: patternUrl })}
                            />
                            {errors.ThumbnailUrl1 && <span> * Please enter valid data !</span>}
                            <br />

                            <input
                                type="text"
                                defaultValue={thumbnailUrl[1]}
                                placeholder="thumbnail Url(2) "
                                {...register("ThumbnailUrl2", { required: true, pattern: patternUrl })}
                            />
                            {errors.ThumbnailUrl2 && <span> * Please enter valid data !</span>}
                            <br />

                            <input
                                type="text"
                                defaultValue={thumbnailUrl[2]}
                                placeholder="thumbnail Url(3) "
                                {...register("ThumbnailUrl3", { required: true, pattern: patternUrl })}
                            />
                            {errors.ThumbnailUrl3 && <span> * Please enter valid data !</span>}
                            <br />

                            <input
                                type="text"
                                defaultValue={thumbnailUrl[3]}
                                placeholder="thumbnail Url(4) "
                                {...register("ThumbnailUrl4", { required: true, pattern: patternUrl })}
                            />
                            {errors.ThumbnailUrl4 && <span> * Please enter valid data !</span>}
                            <br />

                            <textarea
                                rows="5"
                                placeholder="description"
                                defaultValue={description}
                                {...register("Description", { required: true })}
                            />
                            {errors.Description && <span> * Please enter valid data !</span>}
                            <br />
                        </form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary"  onClick={handleSubmit(onSubmit)}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EditForm;
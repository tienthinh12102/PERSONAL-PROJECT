import React from 'react';
import './style.scss';
import ProductSlideShow from '../../../Mains/Products/ProductDetails/ProductSlideShow/ProductSlideShow'
import ProductContent from '../../../Mains/Products/ProductDetails/ProductContent/ProductContent';

const ModalProductDetails = ({ product, onResetSelectItem }) => {
  console.log(product)
  const { thumbnailUrl } = product || {};

  return (
    <div className="modal fade show" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button onClick={() => onResetSelectItem()} style={{ fontSize: '4rem', padding: '0 10px 0 0' }} type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <section className="productDetails__container container">
              <div className="row">
                <div className="col-lg-6">
                  {product && <ProductSlideShow thumbnailUrl={thumbnailUrl} />}
                </div>
                <div className="col-lg-6">
                  {product && <ProductContent product={product} />}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ModalProductDetails;

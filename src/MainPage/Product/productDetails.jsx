/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { adminApiInstance } from "../../api/axios";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  console.log(product);

  useEffect(() => {
    // Fetch the product details based on the loadId
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await adminApiInstance.get(`/getLoadDetailsById/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (!product) {
    // Handle the case where product details are not available
    return <p>Loading...</p>;
  }

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Product Details</h4>
            <h6>Full details of a product</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="bar-code-view">
                  <img src={product.barcodeImage} alt="barcode" />
                </div>
                <div className="productdetails">
                  <ul className="product-bar">
                    <li>
                      <h4>Category</h4>
                      <h6>{product.category}</h6>
                    </li>
                    <li>
                      <h4>Load Cost</h4>
                      <h6>{product.loadCost}</h6>
                    </li>
                    <li>
                      <h4>Load Date</h4>
                      <h6>{product.loadDate}</h6>
                    </li>
                    <li>
                      <h4>Load Number</h4>
                      <h6>{product.loadNumber}</h6>
                    </li>
                    <li>
                      <h4>Pallets Count</h4>
                      <h6>{product.palletsCount}</h6>
                    </li>
                    <li>
                      <h4>Per Pallet Price</h4>
                      <h6>{product.perPalletPrice}</h6>
                    </li>
                    <li>
                      <h4>SKU Number</h4>
                      <h6>{product.skuNumber}</h6>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="slider-product-details">
                  {/* Add OwlCarousel here based on your product.images */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { adminApiInstance } from "../../api/axios";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import BrandDetails from "./BrandDetails";
import { TfiPrinter } from "react-icons/tfi";
import { useReactToPrint } from "react-to-print";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [barcodeOnly, setBarcodeOnly] = useState(false);
  const loadDetailsRef = React.useRef();
  const loadBarcodeRef = React.useRef();

  const handlePrintBrand = useReactToPrint({
    content: () =>
      barcodeOnly ? loadBarcodeRef.current : loadDetailsRef.current,
  });
  useEffect(() => {
    // Fetch the product details based on the loadId
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await adminApiInstance.get(`/getLoadDetailsById/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
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
              <div
                className="card-body print_single"
                ref={loadDetailsRef}
                style={{ listStyle: "none", padding: 0 }}
              >
                {product.barcodeImage && (
                  <div
                    className="bar-code-view print_single_barcode"
                    ref={loadBarcodeRef}
                  >
                    <img src={product.barcodeImage} alt="barcode" />
                  </div>
                )} 

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
                      <h6>{product.perPalletCost}</h6>
                    </li>
                    <li>
                      <h4>SKU Number</h4>
                      <h6>{product.skuNumber}</h6>
                    </li>
                    {/* Add other product details here */}
                  </ul>
                </div>
              </div>
              {product.barcodeImage && (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    padding: "0 10px",
                    alignItems: "center",
                  }}
                >
                  <input
                    checked={barcodeOnly}
                    onChange={() => setBarcodeOnly(!barcodeOnly)}
                    type="checkbox"
                  />
                  <label style={{ marginLeft: "5px" }}>
                    Print Barcode Only
                  </label>
                  <div style={{ marginLeft: "auto" }}>
                    <button
                      onClick={handlePrintBrand}
                      style={{
                        border: "1px solid #3498db", // Add border with color
                        borderRadius: "5px", // Add border-radius for rounded corners
                        background: "#3498db", // Set background color
                        color: "#fff", // Set text color
                        cursor: "pointer", // Set cursor to pointer
                        display: "flex",
                        alignItems: "center", // Align the icon vertically
                        padding: "5px 10px",
                        marginBottom: "5px",
                      }}
                    >
                      <TfiPrinter style={{ marginRight: "5px" }} />
                      Print
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-4 col-sm-12">
            {product.brands && (
              <div className="card">
                <div className="card-body">
                  <div className="slider-product-details">
                    {product.brands.map((item, key) => (
                      <div key={key} id={`brand-details-${item.skuCode}`}>
                        <BrandDetails item={item} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

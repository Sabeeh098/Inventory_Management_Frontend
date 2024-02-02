/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useReactToPrint } from "react-to-print";
import PropTypes from "prop-types";
import { TfiPrinter } from "react-icons/tfi";

// eslint-disable-next-line react/prop-types
const BrandDetails = ({ item }) => {
  const [barcodeOnly, setBarcodeOnly] = useState(false);
  const brandDetailsRef = React.useRef();
  const brandBarcodeRef = React.useRef();

  const handlePrintBrand = useReactToPrint({
    content: () =>
      barcodeOnly ? brandBarcodeRef.current : brandDetailsRef.current,
  });

  return (
    <>
      <div className="productdetails print_single" ref={brandDetailsRef}>
        <ul className="product-bar">
          <li>
            <h4>Brand Name</h4>
            <h6>{item.brandName}</h6>
          </li>
          <li>
            <h4>Pallet Number</h4>
            <h6>{item.palletNumbers}</h6>
          </li>
          <li>
            <h4>Total Pallet</h4>
            <h6>{item.totalPallet}</h6>
          </li>
          <li>
            <h4>Total Price</h4>
            <h6>{item.totalPrice}</h6>
          </li>
          <li>
            <h4>SKU Number</h4>
            <h6>{item.skuCode}</h6>
          </li>
        </ul>
        <div
          className="bar-code-view print_single_barcode"
          ref={brandBarcodeRef}
        >
          <img src={item.barcodeImage} alt="barcode" />
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
          padding: "0 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          checked={barcodeOnly}
          onChange={() => setBarcodeOnly(!barcodeOnly)}
          type="checkbox"
        />
        <label style={{ marginLeft: "5px" }}>Print Barcode Only</label>
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
    </>
  );
};

BrandDetails.propTypes = {
  item: PropTypes.shape({
    brandName: PropTypes.string.isRequired,
    palletNumbers: PropTypes.string.isRequired,
    totalPallet: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    skuCode: PropTypes.string.isRequired,
    barcodeImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default BrandDetails;

/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useReactToPrint } from "react-to-print";
import PropTypes from "prop-types";

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
    <div className="productdetails">
      <ul className="product-bar" ref={brandDetailsRef}>
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
        <li>
          <div className="bar-code-view" ref={brandBarcodeRef}>
            <img src={item.barcodeImage} alt="barcode" />
          </div>
        </li>
      </ul>
      <div>
        <input
          checked={barcodeOnly}
          onChange={() => setBarcodeOnly(!barcodeOnly)}
          type="checkbox"
        />
        Print Barcode Only
      </div>
      <button onClick={handlePrintBrand}>Print</button>
    </div>
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

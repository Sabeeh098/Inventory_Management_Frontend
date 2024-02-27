import React, { useState } from "react";
import PropTypes from "prop-types";
import { useReactToPrint } from "react-to-print";
import { TfiPrinter } from "react-icons/tfi";
import BulkBarcode from "./BulkBarocde"; 
import "./printStyles.css"; 

const BrandDetails = ({ item }) => {
  console.log(item,"item")
  const [barcodeOnly, setBarcodeOnly] = useState(false);
  const [bulkBarcodeModalVisible, setBulkBarcodeModalVisible] = useState(false);
  const brandDetailsRef = React.useRef();

  const handlePrintBrand = useReactToPrint({
    content: () => (barcodeOnly ? null : brandDetailsRef.current),
  });

  const handlePrintBarcodeOnly = () => {
    setBulkBarcodeModalVisible(true);
  };

  return (
    <>
      <div className="productdetails print_single" ref={brandDetailsRef} style={{ width: "100%"}}>
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
        <div className="barcode_view" ref={brandDetailsRef} style={{display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid #dfdfdf"}}>
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
            onClick={barcodeOnly ? handlePrintBarcodeOnly : handlePrintBrand}
            style={{
              border: "1px solid #3498db",
              borderRadius: "5px",
              background: "#3498db",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "5px 10px",
              marginBottom: "5px",
            }}
          >
            <TfiPrinter style={{ marginRight: "5px" }} />
            Print
          </button>
        </div>
      </div>
      {/* Render the BulkBarcode directly without Modal */}
      {bulkBarcodeModalVisible && (
        <BulkBarcode 
          barcodeImage={item.barcodeImage} 
          onClose={() => setBulkBarcodeModalVisible(false)} 
        />
      )}
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
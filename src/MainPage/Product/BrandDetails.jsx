import React, { useState } from "react";
import PropTypes from "prop-types";
import { useReactToPrint } from "react-to-print";
import { TfiPrinter } from "react-icons/tfi";
import BulkBarcode from "./BulkBarocde";
import "./printStyles.css";

const BrandDetails = ({ item, loadNumber }) => {
  const [barcodeOnly, setBarcodeOnly] = useState(false);
  const [bulkBarcodeModalVisible, setBulkBarcodeModalVisible] = useState(false);
  const [numCopies, setNumCopies] = useState(1); // State to track number of copies
  const brandRef = React.useRef();
  const brandDetailsRef = React.useRef();

  const handlePrintBrand = useReactToPrint({
    content: () => {
      if (barcodeOnly) {
        const tableStat = brandRef.current.cloneNode(true)
        const PrintElem = document.createElement('div');
        PrintElem.className = 'multi_print_only';
        for (let i = 0; i < numCopies; i++) {
          PrintElem.appendChild(tableStat.cloneNode(true));
        }
        return PrintElem;
      }
      const tableStat = brandDetailsRef.current.cloneNode(true);
      const PrintElem = document.createElement('div');
      PrintElem.className = 'multi_print';
      for (let i = 0; i < numCopies; i++) {
        PrintElem.appendChild(tableStat.cloneNode(true));
      }
      return PrintElem;

    }
  });


  // const handlePrintBarcodeOnly = () => {
  //   setBulkBarcodeModalVisible(true);
  // };

  return (
    <>
      <div
        className="productdetails print_single"
        ref={brandDetailsRef}
        style={{ width: "100%" }}
      >
        <ul className="product-bar">
          <li>
            <h4>Load Number</h4>
            <h6>{loadNumber}</h6>
          </li>
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
          ref={brandRef}
          className="barcode_view"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #dfdfdf",
          }}
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
        <label style={{ marginLeft: "5px" }}>Barcode Only</label>
        <input
          type="number"
          min="1"
          value={numCopies}
          onChange={(e) => setNumCopies(parseInt(e.target.value))}
          style={{ marginLeft: "10px", width: "50px" }}
        />
        <label style={{ marginLeft: "5px" }}>Copies</label>
        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={handlePrintBrand}
            // onClick={barcodeOnly ? handlePrintBarcodeOnly : handlePrintBrand}
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
  loadNumber: PropTypes.string.isRequired,
};

export default BrandDetails;

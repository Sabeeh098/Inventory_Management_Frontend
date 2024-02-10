import React, { useState } from "react";
import { Button, Modal } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import PropTypes from "prop-types";

const GenerateBarcodePopUp = ({ load, onClose }) => {
  const [count, setCount] = useState(1);
  const [size, setSize] = useState(150);
  const [brand, setBrand] = useState(
    load.brands && load.brands.length > 0 ? load.brands[0] : null
  ); // Set the first brand as default if brands are available

  const handleChangeCount = (e) => setCount(parseInt(e.target.value, 10) || 1);
  const handleChangeSize = (e) => setSize(e.target.value);
  const handleChangeBrand = (e) => {
    const selectedBrand = load.brands.find(
      (brand) => brand.brandName === e.target.value
    );
    setBrand(selectedBrand);
  };

  const handlePrint = async () => {
    try {
      const pdf = new jsPDF();

      // Generate a canvas for the current barcode
      const barcodeElement = document.getElementById("barcode");
      const canvas = await html2canvas(barcodeElement);
      const imgData = canvas.toDataURL("image/png");

      // Loop through each barcode and add it to the PDF
      for (let i = 0; i < count; i++) {
        // Calculate the position of the current barcode
        const x = (i % 2) * (pdf.internal.pageSize.getWidth() / 2);
        const y = Math.floor(i / 2) * (pdf.internal.pageSize.getHeight() / 2);

        // Add the barcode image to the PDF
        pdf.addImage(
          imgData,
          "PNG",
          x,
          y,
          pdf.internal.pageSize.getWidth() / 4,
          pdf.internal.pageSize.getHeight() / 4
        );
      }

      // Save PDF
      const filename = `${moment().format("L")}_Barcodes.pdf`;
      pdf.save(filename);

      onClose();
    } catch (error) {
      console.error("Error printing barcodes:", error);
    }
  };

  return (
    <Modal
      visible={true}
      title={`Print Barcode for Load ${load.loadNumber}`}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="print" type="primary" onClick={handlePrint}>
          Print
        </Button>,
      ]}
    >
      <form>
        <div className="mb-3">
          <label htmlFor="count" className="form-label me-3">
            Number of Barcodes:
          </label>
          <input
            type="number"
            min={1}
            className="form-control"
            id="count"
            value={count}
            onChange={handleChangeCount}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="size" className="form-label me-3">
            Barcode Size:
          </label>
          <select
            className="form-control"
            id="size"
            value={size}
            onChange={handleChangeSize}
          >
            <option value="150">Default</option>
            <option value="50">Small</option>
            <option value="100">Medium</option>
            <option value="200">Large</option>
            {/* Add additional size options here if needed */}
          </select>
        </div>
        {load.brands && load.brands.length > 0 && (
          <div className="mb-3">
            <label htmlFor="brand" className="form-label me-3">
              Select Brand:
            </label>
            <select
              className="form-control"
              id="brand"
              value={brand.brandName}
              onChange={handleChangeBrand}
            >
              {load.brands.map((item, key) => (
                <option key={key} value={item.brandName}>
                  {item.brandName}
                </option>
              ))}
            </select>
          </div>
        )}
      </form>
      <div
        id="barcodes"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {/* Display only one barcode for UI */}
        <div style={{ width: "45%", marginBottom: "10px" }}>
          <img
            id="barcode" // Assign a unique id to the barcode image
            src={brand ? brand.barcodeImage : load.barcodeImage}
            alt={`Barcode for ${
              brand ? brand.brandName : `Load ${load.loadNumber}`
            }`}
            style={{ width: size + "px", height: "auto" }}
          />
        </div>
      </div>
    </Modal>
  );
};

GenerateBarcodePopUp.propTypes = {
  load: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GenerateBarcodePopUp;
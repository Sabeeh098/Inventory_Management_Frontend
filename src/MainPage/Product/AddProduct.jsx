import React, { useState, useEffect } from 'react';
import { adminApiInstance } from '../../api/axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import { DeleteIcon } from '../../EntryFile/imagePath';

const AddProduct = () => {
  const [loadData, setLoadData] = useState({
    loadNumber: '',
    loadCost: '',
    palletsCount: 0,
    perPalletPrice: 0,
    category: '',
    loadDate: '',
    skuCode: '',
    brands: [{
      brandName: '',
      brandTotalPrice: '',
      brandPalletsCount: '',
    }],
  });

  const [generatedBarcodes, setGeneratedBarcodes] = useState([]);

  useEffect(() => {
    generateBarcodes();
  }, [loadData.brands]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoadData({ ...loadData, [name]: value });
  };

  const handleBrandChange = (index, field, e) => {
    const updatedBrands = [...loadData.brands];
    updatedBrands[index][field] = e.target.value;
    setLoadData({ ...loadData, brands: updatedBrands });
  };

  const handleDateChange = (date) => {
    setLoadData({ ...loadData, loadDate: date });
  };

  const calculatePerPalletPrice = () => {
    const { loadCost, palletsCount } = loadData;
    return palletsCount !== 0 ? loadCost / palletsCount : 0;
  };

  const generateBarcodes = async () => {
    try {
      const barcodeValue = loadData.skuCode;
      const barcodeContainerId = 'barcode-container';
      const barcodeImageData = await convertBarcodeToImage(barcodeValue, barcodeContainerId);

      setGeneratedBarcodes([barcodeImageData]);
    } catch (error) {
      console.error('Error generating barcodes:', error);
    }
  };

  const convertBarcodeToImage = async (barcodeValue, barcodeContainerId) => {
    try {
      const barcodeContainer = document.getElementById(barcodeContainerId);
  
      if (!barcodeContainer) {
        console.error(`Barcode container with id ${barcodeContainerId} not found.`);
        return null;
      }
  
      console.log('Barcode Container ID:', barcodeContainerId);
      console.log('Barcode Container:', barcodeContainer);
  
      const canvas = await html2canvas(barcodeContainer, {
        width: 250,
        height: 135,
      });
  
      const imageData = canvas.toDataURL('image/png');
      console.log('Image Data:', imageData);
  
      return imageData;
    } catch (error) {
      console.error('Error converting barcode to image:', error);
      return null;
    }
  };
  
  const addBrandField = () => {
    setLoadData((prevData) => ({
      ...prevData,
      brands: [...prevData.brands, {
        brandName: '',
        brandTotalPrice: '',
        brandPalletsCount: '',
      }],
      skuCode: '', // Reset SKU code when adding a new brand
    }));
  };

  const deleteBrandField = (index) => {
    const updatedBrands = [...loadData.brands];
    updatedBrands.splice(index, 1);
    setLoadData({ ...loadData, brands: updatedBrands });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const perPalletPrice = calculatePerPalletPrice();
      const barcodeValue = loadData.skuCode;
      const barcodeImageData = await convertBarcodeToImage(barcodeValue);
  
      for (let i = 0; i < loadData.brands.length; i++) {
        const brand = loadData.brands[i];
  
        console.log('Barcode Data:', {
          barcodeValue,
          barcodeImageData,
        });
  
        // Assuming you have an API endpoint for adding loads with brand-specific data
        await adminApiInstance.post('/addloads', {
          load: {
            ...loadData,
            perPalletPrice,
            brandName: brand.brandName,
            brandTotalPrice: brand.brandTotalPrice,
            brandPalletsCount: brand.brandPalletsCount,
          },
          barcode: {
            skuCode: barcodeValue,
            imageData: barcodeImageData,
          },
        });
      }
  
      // Reset the form data
      setLoadData({
        loadNumber: '',
        loadCost: '',
        palletsCount: 0,
        perPalletPrice: 0,
        category: '',
        loadDate: '',
        skuCode: '',
        brands: [{
          brandName: '',
          brandTotalPrice: '',
          brandPalletsCount: '',
        }],
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Load Add</h4>
            <h6>Create new load</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Load Number</label>
                    <input
                      type="text"
                      name="loadNumber"
                      value={loadData.loadNumber}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Load Cost</label>
                    <input
                      type="text"
                      name="loadCost"
                      value={loadData.loadCost}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Pallets Count</label>
                    <input
                      type="number"
                      name="palletsCount"
                      value={loadData.palletsCount}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      name="category"
                      value={loadData.category}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Load Date</label>
                    <DatePicker
                      selected={loadData.loadDate}
                      onChange={handleDateChange}
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                      style={{ marginTop: '10px' }}
                    />
                  </div>
                </div>
                {loadData.brands.length === 1 && (
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div className="form-group">
                      <label>SKU Code</label>
                      <input
                        type="text"
                        name="skuCode"
                        value={loadData.skuCode}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                )}
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Brand</label>
                    {loadData.brands.map((brand, index) => (
                      <div key={index} className="d-flex justify-content-between mb-2">
                        <div className="flex-grow-1 me-2">
                          <input
                            type="text"
                            name={`brands[${index}].brandName`}
                            value={brand.brandName}
                            onChange={(e) => handleBrandChange(index, 'brandName', e)}
                            className="form-control"
                            placeholder={`Brand Name`}
                          />
                        </div>
                        <div className="flex-grow-1 me-2">
                          <input
                            type="text"
                            name={`brands[${index}].brandTotalPrice`}
                            value={brand.brandTotalPrice}
                            onChange={(e) => handleBrandChange(index, 'brandTotalPrice', e)}
                            className="form-control"
                            placeholder={`Total Price`}
                          />
                        </div>
                        <div className="flex-grow-1 me-2">
                          <input
                            type="text"
                            name={`brands[${index}].brandPalletsCount`}
                            value={brand.brandPalletsCount}
                            onChange={(e) => handleBrandChange(index, 'brandPalletsCount', e)}
                            className="form-control"
                            placeholder={`Brand Pallets`}
                          />
                        </div>
                        {loadData.brands.length > 1 && (
                          <button type="button" onClick={() => deleteBrandField(index)} className="btn btn-sm btn-danger">
                            <img src={DeleteIcon} alt="Delete" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addBrandField} className="btn btn-sm btn-info">
                      + Add Brand
                    </button>
                  </div>
                </div>
              </div>

              {loadData.brands.length === 1 && (
  <div className="col-lg-12">
    <div id="barcode-container">
      <Barcode value={loadData.skuCode} />
    </div>
  </div>
)}

              {loadData.brands.length === 1 && (
                <div className="col-lg-12">
                  <p style={{ marginBottom: '10px' }}>Per Pallet Price: {calculatePerPalletPrice()}</p>
                </div>
              )}

              {loadData.brands.length > 1 && (
                <div className="col-lg-12">
                  <div>
                    {generatedBarcodes.map((barcode, index) => (
                      <div key={index}>
                        <img src={barcode} alt={`Barcode ${index + 1}`} style={{ marginBottom: '10px' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="col-lg-12">
                <button type="submit" className="btn btn-submit me-2">
                  Submit
                </button>
                <button type="button" className="btn btn-cancel">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

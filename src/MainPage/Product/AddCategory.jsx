import React, { useState, useEffect, useRef } from 'react';
import Quagga from 'quagga';
import { adminApiInstance } from '../../api/axios';

const AddCategory = () => {
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [loadDetails, setLoadDetails] = useState(null);
  const [isScannerConnected, setScannerConnected] = useState(false);
  const [allLoads, setAllLoads] = useState([]);
  const barcodeRef = useRef(null);

  useEffect(() => {
    const initializeScanner = () => {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: barcodeRef.current,
          },
          decoder: {
            readers: ['code_128_reader'],
          },
        },
        (err) => {
          if (err) {
            console.error('Error initializing Quagga:', err);
            return;
          }

          setScannerConnected(true);
          Quagga.start();
        }
      );

      // Fetch all loads when the component mounts
      fetchAllLoads();

      // Listen for barcode detection
      Quagga.onDetected(async (result) => {
        const scannedData = result.codeResult.code;
        setScannedBarcode(scannedData);

        try {
          // Fetch load details from the server based on the scanned SKU code
          const response = await adminApiInstance.get(`/getLoadDetailsBySkuCode/${scannedData}`);
          const details = response.data; // Assuming the server returns load details

          setLoadDetails(details);
        } catch (error) {
          console.error('Error fetching load details:', error);
        }
      });
    };

    const fetchAllLoads = async () => {
      try {
        const response = await adminApiInstance.get('/getloads');
        setAllLoads(response.data);
      } catch (error) {
        console.error('Error fetching loads:', error);
      }
    };

    // Initialize the scanner
    initializeScanner();

    return () => {
      // Stop the scanner when the component unmounts
      Quagga.stop();
    };
  }, []);

  const handleSearch = async () => {
    try {
      // Search for load details based on the manually entered SKU code
      const skuToSearch = scannedBarcode || ''; // Use the scanned barcode if available
      const foundLoad = allLoads.find((load) => load.skuNumber === skuToSearch);

      if (foundLoad) {
        setLoadDetails(foundLoad);
      } else {
        console.error('Load not found for SKU code:', skuToSearch);
      }
    } catch (error) {
      console.error('Error searching for load details:', error);
    }
  };

  const handleConnectScanner = () => {
    // Connect the scanner functionality
    Quagga.start();
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Import Products</h4>
              <h6>Bulk upload your products</h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    {isScannerConnected ? (
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by SKU Code"
                        onChange={(e) => setScannedBarcode(e.target.value)}
                        value={scannedBarcode || ''}
                      />
                    ) : (
                      <button className="btn btn-submit w-100" onClick={handleConnectScanner}>
                        Connect Scanner
                      </button>
                    )}
                  </div>
                </div>
                <div className="col-lg-12"></div>
                <div className="col-lg-6 col-sm-12">
                  <div className="productdetails productdetailnew">
                    <ul className="product-bar">
                      <li>
                        <h4>Load Number</h4>
                        <h6 className="manitorygreen">{loadDetails?.loadNumber || 'Loading...'}</h6>
                      </li>
                      <li>
                        <h4>Category</h4>
                        <h6 className="manitorygreen">{loadDetails?.category || 'Loading...'}</h6>
                      </li>
                      <li>
                        <h4>SKU code</h4>
                        <h6 className="manitorygreen">{loadDetails?.skuNumber || 'Loading...'}</h6>
                      </li>
                      <li>
                        <h4>Load Cost</h4>
                        <h6 className="manitorygreen">{loadDetails?.loadCost || 'Loading...'}</h6>
                      </li>
                      <li>
                        <h4>Load Date</h4>
                        <h6 className="manitorygreen">{loadDetails?.loadDate || 'Loading...'}</h6>
                      </li>
                      <li>
                        <h4>Pallets</h4>
                        <h6 className="manitorygreen">{loadDetails?.palletsCount || 'Loading...'}</h6>
                      </li>
                      <li>
                        <h4>Per Pallet Price</h4>
                        <h6 className="manitoryblue">{loadDetails?.perPalletPrice || 'Field optional'}</h6>
                      </li>
                      {/* Add other details as needed */}
                    </ul>
                  </div>
                </div>
                <div className="bar-code-view">
                  {/* Display scanned barcode details */}
                  {scannedBarcode && <p>Scanned Barcode: {scannedBarcode}</p>}
                  <img src={loadDetails?.barcodeImage} alt="barcode" ref={barcodeRef} />
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-0">
                    <button href="#" className="btn btn-submit me-2" onClick={handleSearch}>
                      Submit
                    </button>
                    <button href="#" className="btn btn-cancel">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;

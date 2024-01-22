import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "../../EntryFile/datatable";
import "react-select2-wrapper/css/select2.css";
import { adminApiInstance } from "../../api/axios";
import { EyeIcon, Printer } from "../../EntryFile/imagePath"; 
import GenerateBarcodePopUp from "./GenerateBarcodePopUp";

const ProductList = () => {
  const [loads, setLoads] = useState([]);
  const [selectedLoad, setSelectedLoad] = useState(null);

  useEffect(() => {
    fetchLoads();
  }, []);

  const fetchLoads = async () => {
    try {
      const response = await adminApiInstance.get('/getloads');
      setLoads(response.data);
    } catch (error) {
      console.error('Error fetching loads:', error);
    }
  };

  const columns = [
    {
      title: "Load Number",
      dataIndex: "loadNumber",
      sorter: (a, b) => a.loadNumber - b.loadNumber,
    },
    {
      title: "Load Cost",
      dataIndex: "loadCost",
      sorter: (a, b) => a.loadCost - b.loadCost,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Pallets Count",
      dataIndex: "palletsCount",
      sorter: (a, b) => a.palletsCount - b.palletsCount,
    },
    {
      title: "Actions",
      render: (text, record) => (
        <>
          <Link className="me-3" to={`/dream-pos/product/product-details/${record._id}`}>
            <img src={EyeIcon} alt="img" />
          </Link>
          <img src={Printer} alt="Printer" onClick={() => handleBarcodeClick(record)} />
        </>
      ),
    },
  ];

  const handleBarcodeClick = (load) => {
    setSelectedLoad(load);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Load List</h4>
              <h6>Manage your loads</h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={loads}
                  rowKey={(record) => record._id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedLoad && (
        <GenerateBarcodePopUp
          load={selectedLoad}
          onClose={() => setSelectedLoad(null)}
        />
      )}
    </>
  );
};

export default ProductList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "react-select2-wrapper/css/select2.css";
import { adminApiInstance } from "../../api/axios";
import { DeleteIcon, EyeIcon, Printer } from "../../EntryFile/imagePath"; 
import GenerateBarcodePopUp from "./GenerateBarcodePopUp";
import Swal from "sweetalert2";

const ProductList = () => {
  const [loads, setLoads] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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

  const handleDelete = async (loadId) => {
    try {
      await adminApiInstance.delete(`/loads/${loadId}`);
      // Remove the deleted load from the state
      setLoads(loads.filter(load => load._id !== loadId));
      Swal.fire({
        type: "success",
        title: "Deleted!",
        text: "Your load has been deleted.",
        confirmButtonClass: "btn btn-success",
      });
    } catch (error) {
      console.error('Error deleting load:', error);
      Swal.fire({
        type: "error",
        title: "Error!",
        text: "Failed to delete load. Please try again later.",
        confirmButtonClass: "btn btn-danger",
      });
    }
  };

  const handleBarcodeClick = (load) => {
    setSelectedLoad(load);
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
      render: (category) => category.name, 
      sorter: (a, b) => a.category.name.localeCompare(b.category.name),
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
          <Link className="confirm-text me-3" to="#" onClick={() => handleDelete(record._id)}>
            <img src={DeleteIcon} alt="img" />
          </Link>
        </>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onShowSizeChange = (current, pageSize) => {
    // Define your logic for handling page size change here
    console.log("Current page:", current, "Page size:", pageSize);
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
                  className="table datanew dataTable no-footer"
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={loads}
                  pagination={{
                    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total} items`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                  }}
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

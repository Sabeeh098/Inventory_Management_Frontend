/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import { PlusIcon } from "../../EntryFile/imagePath";
import { adminApiInstance } from "../../api/axios";
import { BsUpcScan } from "react-icons/bs";
import UpdateDetailsModal from "./UpdateDetailsModal";

const ScanInScanOut = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminApiInstance.get("/getLoads?type=scans");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Sku",
      dataIndex: "skuNumber",
      sorter: (a, b) => a.skuNumber.length - b.skuNumber.length,
    },
    {
      title: "Load Number",
      dataIndex: "loadNumber",
      sorter: (a, b) => a.loadNumber.length - b.loadNumber.length,
    },
    {
      title: "Load Cost",
      dataIndex: "loadCost",
      sorter: (a, b) => a.loadCost - b.loadCost,
      width: "125px",
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
      width: "125px",
    },
    {
      title: "Scan In",
      dataIndex: "palletsCount",
      render: (text, record) => (
        <span className="badges bg-lightyellow">{text}</span>
      ),
      sorter: (a, b) => a.palletsCount - b.palletsCount,
    },
    {
      title: "Scan Out",
      dataIndex: "remainingPalletsCount",
      render: (text, record) => (
        <span className="badges bg-lightgreen">{text}</span>
      ),
      sorter: (a, b) => a.remainingPalletsCount - b.remainingPalletsCount,
      width: "120px",
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <button
            className="me-3 mb-2"
            style={{ border: "none", background: "none", cursor: "pointer" }}
            onClick={() => {
              setSelectedLoad(record);
              setIsModalVisible(true);
            }}
          >
            <BsUpcScan size="26" color="#0dcaf0" />
          </button>
        </>
      ),
    },
  ];

  const handleUpdatePalletsCount = async (loadId, newPalletsCount) => {
    try {
      // Update the pallets count for the selected load using an API call
      await adminApiInstance.post("/updatePalletsCount", {
        loadId,
        newPalletsCount,
      });

      // Fetch updated data after the update
      const response = await adminApiInstance.get("/getLoads?type=scans");
      setData(response.data);
    } catch (error) {
      console.error("Error updating pallets count:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedLoad(null);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Purchase List</h4>
              <h6>Manage your Purchase</h6>
            </div>
            <div className="page-btn">
              <Link
                to="/dream-pos/purchase/addpurchase-purchase"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                Add New Purchase
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  rowKey={(record) => record._id}
                  className="dark-theme-table"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && selectedLoad && (
        <UpdateDetailsModal
          visible={isModalVisible}
          onCancel={handleCloseModal}
          onUpdate={handleUpdatePalletsCount}
          currentPalletsCount={selectedLoad.palletsCount}
          selectedLoadId={selectedLoad._id}
        />
      )}
    </>
  );
};

export default ScanInScanOut;

import React, { useState, useEffect } from "react";
import Table from "../../EntryFile/datatable";
// import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ClosesIcon, Excel, Filter, Pdf, Calendar, Printer, search_whites, Search } from "../../EntryFile/imagePath";
import "react-select2-wrapper/css/select2.css";
import { adminApiInstance } from "../../api/axios";

const Inventory = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [inputfilter, setInputfilter] = useState(false);
  const [loads, setLoads] = useState([]);

  useEffect(() => {
    fetchLoads();
  }, []);

  const fetchLoads = async () => {
    try {
      const response = await adminApiInstance.get("/getLoads");
      setLoads(response.data);
    } catch (error) {
      console.error("Error fetching loads:", error);
    }
  };

  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const columns = [
    {
      title: "Load Number",
      dataIndex: "loadNumber",
      sorter: (a, b) => a.loadNumber.length - b.loadNumber.length,
    },
    {
      title: "SKU Number",
      dataIndex: "skuNumber",
      sorter: (a, b) => a.skuNumber.length - b.skuNumber.length,
    },
    {
      title: "Load Cost",
      dataIndex: "loadCost",
      sorter: (a, b) => a.loadCost - b.loadCost,
    },
    {
      title: "Pallets Count",
      dataIndex: "palletsCount",
      sorter: (a, b) => a.palletsCount - b.palletsCount,
    },
    {
      title: "Remaining Pallets Count",
      dataIndex: "remainingPalletsCount",
      sorter: (a, b) => a.remainingPalletsCount - b.remainingPalletsCount,
    },
    // Include other fields based on your requirements
    // Add more columns as needed
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Inventory Report</h4>
            <h6>Manage your Inventory Report</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-path">
                  <a className={` btn ${inputfilter ? "btn-filter setclose" : "btn-filter"}`} onClick={() => togglefilter(!inputfilter)}>
                    <img src={Filter} alt="img" />
                    <span><img src={ClosesIcon} alt="img" /></span>
                  </a>
                </div>
                <div className="search-input">
                  <input className="form-control form-control-sm search-icon" type="search" placeholder="Search..." />
                  <a className="btn btn-searchset"><img src={Search} alt="img" /></a>
                </div>
              </div>
              <div className="wordset">
                <ul>
                  <li><a data-bs-toggle="tooltip" data-bs-placement="top" title="pdf"><img src={Pdf} alt="img" /></a></li>
                  <li><a data-bs-toggle="tooltip" data-bs-placement="top" title="excel"><img src={Excel} alt="img" /></a></li>
                  <li><a data-bs-toggle="tooltip" data-bs-placement="top" title="print"><img src={Printer} alt="img" /></a></li>
                </ul>
              </div>
            </div>
            <div className={`card mb-0 ${inputfilter ? "toggleCls" : ""}`} id="filter_inputs" style={{ display: inputfilter ? "block" : "none" }}>
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <div className="input-groupicon">
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        <div className="addonset"><img src={Calendar} alt="img" /></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <div className="input-groupicon">
                        <DatePicker selected={startDate1} onChange={(date) => setStartDate1(date)} />
                        <div className="addonset"><img src={Calendar} alt="img" /></div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-1 col-sm-6 col-12 ms-auto">
                    <div className="form-group">
                      <a className="btn btn-filters ms-auto"><img src={search_whites} alt="img" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <Table columns={columns} dataSource={loads} rowKey={(record) => record._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

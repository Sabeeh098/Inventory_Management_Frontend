/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import moment from "moment";
import { Calendar, search_whites } from "../../EntryFile/imagePath";
import { adminApiInstance } from "../../api/axios";

const Purchaseorder = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [inputfilter, setInputfilter] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await adminApiInstance.get("/fetchPurschaseOrder", {
        params: {
          searchTerm: searchTerm,
        },
      });
      const groupDataByWeek = () => {
        return response.data.reduce((acc, item) => {
          const weekNumber = moment(item.addedAt).isoWeek();
          if (!acc[weekNumber]) {
            acc[weekNumber] = [];
          }
          acc[weekNumber].push(item);
          return acc;
        }, {});
      };

      // const groupedData = response.data.reduce((acc, item) => {
      //   const date = item.addedAt;
      //   if (!acc[date]) {
      //     acc[date] = [];
      //   }
      //   acc[date].push(item);
      //   return acc;
      // }, {});
      setData(groupDataByWeek);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("Error response:", error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const options = [
    { id: 1, text: "Choose Supplier", text: "Choose Product" },
    { id: 2, text: "Supplier", text: "Supplier" },
  ];

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
      title: "Load Cost",
      dataIndex: "loadCost",
      sorter: (a, b) => a.loadCost - b.loadCost,
    },
    {
      title: "Pallets Out",
      dataIndex: "palletsOut",
      sorter: (a, b) => a.palletsOut - b.palletsOut,
    },
    {
      title: "Added At",
      dataIndex: "addedAt",
      render: (text) => moment(text).format("YYYY-MM-DD"), // Format date as needed
      sorter: (a, b) => moment(a.addedAt).unix() - moment(b.addedAt).unix(),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Purchase order report</h4>
            <h6>Manage your Purchase order report</h6>
          </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-body">
            <Tabletop
              inputfilter={inputfilter}
              togglefilter={togglefilter}
              onSearch={fetchData}
            />
            {/* /Filter */}
            <div
              className={`card mb-0 ${inputfilter ? "toggleCls" : ""}`}
              id="filter_inputs"
              style={{ display: inputfilter ? "block" : "none" }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <div className="input-groupicon">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                        <div className="addonset">
                          <img src={Calendar} alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <div className="input-groupicon">
                        <DatePicker
                          selected={startDate1}
                          onChange={(date) => setStartDate1(date)}
                        />
                        <div className="addonset">
                          <img src={Calendar} alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <Select2
                        className="select"
                        data={options}
                        options={{
                          placeholder: "Choose Suppliers",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-1 col-sm-6 col-12 ms-auto">
                    <div className="form-group">
                      <a
                        className="btn btn-filters ms-auto"
                        onClick={() => fetchData()}
                      >
                        <img src={search_whites} alt="img" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Filter */}
            <div className="table-responsive">
              {Object.keys(data).map((item, key) => {
                return (
                  <div key={key}>
                    <h2>{`Week ${item}`}</h2>
                    <Table
                      columns={columns}
                      dataSource={data[item]}
                      rowKey={(record) => record.loadNumber}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default Purchaseorder;

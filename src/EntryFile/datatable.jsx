/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useState} from "react";
import { Table } from "antd";
import "./antd.css";
import { itemRender, onShowSizeChange } from "../components/pagination";

const Datatable = ({ props, columns, dataSource, total }) => {
  console.log(total)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <Table
      key={props}
      className="table datanew dataTable no-footer"
      rowSelection={rowSelection}
      total = {total}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        total: dataSource.length,
        showTotal: (total, range) =>
          ` ${range[0]} to ${range[1]} of ${total} items`,
        showSizeChanger: true,
        onShowSizeChange: onShowSizeChange,
      }}
      rowKey={(record) => record.id}
    />
  );
};

export default Datatable;

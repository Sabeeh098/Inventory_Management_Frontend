import React from 'react';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';
import 'react-calendar/dist/Calendar.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';



export function Summary() {
  return (
    <DropdownButton id="dropdown-basic-button" title="Summary">
      <Dropdown.Item href="#/action-1">Today</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Yesterday</Dropdown.Item>
      <Dropdown.Item href="#/action-3">This week</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Last Week</Dropdown.Item>
    </DropdownButton>
  );
}

export function FilterBy() {
  return (
    <DropdownButton id="dropdown-basic-button" title="FilterBy">
      <Dropdown.Item href="#/action-1">Load Number</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Category</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Brand</Dropdown.Item>
      <Dropdown.Item href="#/action-3">sku</Dropdown.Item>
    </DropdownButton>
  );
}


export function BasicDateRangePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
      </DemoContainer>
    </LocalizationProvider>
  );
}


const ProductTable = ({ product, totalLoad, totalPall }) => {
  console.log(totalLoad, totalPall);
  // Check if product is not undefined and has at least one item
  if (!product || product.length === 0) {
    return <div>No data available</div>; // or some other fallback UI
  }

  // Accessing properties of the first element in the product array
  let date = product[0].addedAt.slice(0, 7);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Added At</th>
          <th>Load Number</th>
          <th>Total Pallets</th>
          <th>Load Cost</th>
          <th>Per Pallets Cost</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{date}</td>
          <td>{product[0].loadNumber}</td>
          <td>{product[0].palletsCount}</td>
          <td>{product[0].loadCost}</td>
          <td>{product[0].perPalletCost}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td><p className="pallet">Total Pallets: <span style={{ display: 'inline-block', border: '1px solid #ccc', padding: '4px', borderRadius: '5px', backgroundColor: '#f0f0f0' }}>{totalPall}</span></p></td>
          <td> <p style={{ marginRight: '10px' }} className="loadCost">Total Load Cost: <span style={{ display: 'inline-block', border: '1px solid #ccc', padding: '4px', borderRadius: '5px', backgroundColor: '#f0f0f0' }}>{totalLoad}</span></p></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
};

ProductTable.propTypes = {
  product: PropTypes.arrayOf(
    PropTypes.shape({
      addedAt: PropTypes.string,
      loadNumber: PropTypes.number,
      palletsCount: PropTypes.number,
      loadCost: PropTypes.number,
      perPalletCost: PropTypes.number,
    })
  ),
  totalLoad: PropTypes.number.isRequired,
  totalPall: PropTypes.number.isRequired,
};

export default ProductTable;
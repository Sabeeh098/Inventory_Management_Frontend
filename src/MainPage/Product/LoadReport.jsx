import React from 'react';
import {useState} from 'react'
import ProductTable from "./ProductTable";
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { enGB } from 'date-fns/locale'

const LoadReport = () => {
    
  const [datePicker, setDatepicker] = useState(false);

 const datePickerFnc = () => {
    
  setDatepicker(!datePicker);
 }

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  return (
    <> 
    <div className='palletMedia'>
          <div className="palletReport">
            <h3>Pallet out report</h3>
            <h5>Manage your Pallet out report</h5>
          </div>
      <div className="palletTable">
      <div className='twoDropdown'> 
      <DropdownButton  title="Summary" className='drop5'>
        <Dropdown.Item href="#/action-1">Daily</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Weekly</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Monthly</Dropdown.Item>
      </DropdownButton>
   
    <DropdownButton id="dropdown-basic-button" title="FilterBy">
      <Dropdown.Item href="#/action-1">Load Number</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Category</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Brand</Dropdown.Item>
      <Dropdown.Item href="#/action-3">sku</Dropdown.Item>
    </DropdownButton>

<div className=' daterangepicker d-flex' onClick={datePickerFnc}>
    
  <div className='m-1 px-2 py-1 bg-light'>
    <p>02-11-24</p>
  </div>
  <div className='m-1 px-2 py-1 bg-light' >
    <p>03-12-24</p>
  </div>
</div>
 
    { datePicker && <DateRangePicker
  onChange={item => setState([item.selection])}
  showSelectionPreview={true}
  moveRangeOnFirstSelection={false}
  months={1}
  ranges={state}
  direction="horizontal"
  preventSnapRefocus={true}
  calendarFocus="backwards"
  locale={enGB}
/>}
</div>
       <ProductTable/>
      </div>
    </div>
    </>
    
  )
}

export default LoadReport;
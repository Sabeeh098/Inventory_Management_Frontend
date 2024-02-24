import React from 'react';
import {useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './productList.css'
import ProductTable from './ProductTable';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; 
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

  

const PurchaseOrder1 = () => {

 const [datePicker, setDatepicker] = useState(false);
 const [daily, setDaily] = useState(false);
//  const [weekly, setWeekly] = useState(false);
//  const [monthly, setMonthly] = useState(false);


 const dailyFnc = () => {
        setDaily(!daily)
 }

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
         <div className='wholeComp'>
            
            <div className='Porder'>
            <h3>Purchase order report</h3>
            <h5>Manage your Purchase order report</h5>
            </div>
    <div className='twoDropdown'> 
      <DropdownButton  title="Summary" className='drop5'>
        <Dropdown.Item href="#/action-1">Daily</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Weekly</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Monthly</Dropdown.Item>
      </DropdownButton>
   
    <DropdownButton id="dropdown-basic-button" title="FilterBy">
      <Dropdown.Item href="#/action-1" onClick={dailyFnc}>Load Number</Dropdown.Item>
      <Dropdown.Item href="#/action-2" onClick={dailyFnc}>Category</Dropdown.Item>
      <Dropdown.Item href="#/action-3" onClick={dailyFnc}>Brand</Dropdown.Item>
      <Dropdown.Item href="#/action-3" onClick={dailyFnc}>sku</Dropdown.Item>
    </DropdownButton>
    <div className='inputFilterBY'>
      {
        daily &&
        <input className='inputF' placeholder='enter'></input>
      }
    </div>

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
/>}
</div>

     <h4 className='Pdate'>02-24-24</h4>

       <ProductTable/>
     </div>
   
        </>
    )
}

export default PurchaseOrder1;
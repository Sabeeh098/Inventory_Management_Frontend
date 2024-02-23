// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// export function BasicDateRangePicker() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DateRangePicker']}>
//         <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'react-calendar/dist/Calendar.css';
import { EyeIcon } from '../../EntryFile/imagePath';
import { Link } from 'react-router-dom/cjs/react-router-dom';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';



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


// export function BasicDateRangePicker() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DateRangePicker']}>
//         <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }


const ProductTable = () => {
  // console.log(totalLoad, totalPall);
  // Check if product is not undefined and has at least one item
  

  // Accessing properties of the first element in the product array
  

  return (
    <>
       <div className='purchaseTable'>
    <Table striped bordered hover>
      <thead>
        <tr>
          {/* <th style={{backgroundColor: '#6A5ACD', color: 'white'}}>Added At</th> */}
          <th style={{backgroundColor: '#6A5ACD', color: 'white'}}>Load Number</th>
          <th style={{backgroundColor: '#6A5ACD', color: 'white'}}>Total Pallets</th>
          <th style={{backgroundColor: '#6A5ACD', color: 'white'}}>Load Cost</th>
          <th style={{backgroundColor: '#6A5ACD', color: 'white'}}>Per Pallets Cost</th>
          <th style={{backgroundColor: '#6A5ACD', color: 'white'}}>Action</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          {/* <td>02-23</td> */}
          <td>12</td>
          <td>19</td>
          <td>200</td>
          <td>50</td>
          <td><Link className="me-3" to={''}>
            <img src={EyeIcon} alt="img" />
          </Link></td>
        </tr>
        <tr>
          {/* <td>02-23</td> */}
          <td>12</td>
          <td>19</td>
          <td>200</td>
          <td>50</td>
          <td><Link className="me-3" to={''}>
            <img src={EyeIcon} alt="img" />
          </Link></td>
        </tr>
        <tr>
          {/* <td>02-23</td> */}
          <td>12</td>
          <td>19</td>
          <td>200</td>
          <td>50</td>
          <td><Link className="me-3" to={''}>
            <img src={EyeIcon} alt="img" />
          </Link></td>
        </tr>
        <tr>
          <td><p className="pallet">Grand Total: <span style={{ display: 'inline-block', border: '1px solid #ccc', padding: '4px', borderRadius: '5px', backgroundColor: '#f0f0f0' }}></span></p></td>
          <td></td>
          <td><p className="pallet"> <span style={{ display: 'inline-block', border: '1px solid #ccc', padding: '4px', borderRadius: '5px', backgroundColor: '#f0f0f0' }}>200</span></p></td>
          <td> <p style={{ marginRight: '10px' }} className="loadCost"> <span style={{ display: 'inline-block', border: '1px solid #ccc', padding: '4px', borderRadius: '5px', backgroundColor: '#f0f0f0' }}>$200</span></p></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
    </div>
    </>
  )
 }

 export default ProductTable;
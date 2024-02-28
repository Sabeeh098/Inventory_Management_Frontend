import React from 'react';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';


const PalletOutReport = ({ data }) => {
  return (
    <>
      <div className='purchaseTable'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{backgroundColor: '#6A5ACD', color: 'white'}}>Load Number</th>
              <th style={{backgroundColor: '#6A5ACD', color: 'white'}}>Total Pallets</th>
              <th style={{backgroundColor: '#6A5ACD', color: 'white'}}>Pallets Out</th>
              <th style={{backgroundColor: '#6A5ACD', color: 'white'}}>Per Pallets Cost</th>
              <th style={{backgroundColor: '#6A5ACD', color: 'white'}}>Load Cost</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.loadNumber}</td>
                <td>{item.palletsCount}</td>
                <td>{item.palletsOut}</td>
                <td>{item.perPalletCost}</td>
                <td>{item.loadCost}</td>
              </tr>
            ))}
            <tr>
              <td><p className="pallet">Grand Total: <span style={{ display: 'inline-block', border: '1px solid #ccc', padding: '4px', borderRadius: '5px', backgroundColor: '#f0f0f0' }}></span></p></td>
              <td></td>
              <td><p className="pallet"> <span style={{ display: 'inline-block', border: '1px solid #ccc', padding: '4px', borderRadius: '5px', backgroundColor: '#f0f0f0' }}>TotalValue</span></p></td>
              <td></td>
              <td> <p style={{ marginRight: '10px' }} className="loadCost"> <span style={{ display: 'inline-block', border: '1px solid #ccc', padding: '4px', borderRadius: '5px', backgroundColor: '#f0f0f0' }}>TotalValue</span></p></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

PalletOutReport.propTypes = {
    data: PropTypes.array.isRequired,
  };
  

export default PalletOutReport;

import React, { useState, useEffect, useRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import './productList.css';
import ProductTable from './ProductTable';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { adminApiInstance } from '../../api/axios';
import { enGB } from 'date-fns/locale'; 

const PurchaseOrder1 = () => {
  const [datePicker, setDatepicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Weekly');
  const [tableData, setTableData] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [showSearchInput, setShowSearchInput] = useState(false); // State to manage visibility of search input
  // const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false); // State to manage visibility of category dropdown
  const [categories, setCategories] = useState([]); // State to store fetched categories
  console.log(categories,"Categories");

  const dateRangePickerRef = useRef();
  const searchInputRef = useRef(); // Reference to the search input field
  const categoryDropdownRef = useRef(); // Reference to the category dropdown

  useEffect(() => {
    // Fetch categories when the component mounts
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      const response = await adminApiInstance.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategorySelect = async (categoryId) => {
    try {
     
      const response = await adminApiInstance.post("/fetchReportByCategory", { categoryId });
      // Set the fetched data to the tableData state
      console.log(response.data,"Verundooo");
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };
  const handleDateRangeChange = async (ranges) => {
    // Convert selected dates to UTC format
    const startDateUTC = ranges.selection.startDate.toISOString();
    const endDateUTC = ranges.selection.endDate.toISOString();
    const utcRanges = {
      startDate: startDateUTC,
      endDate: endDateUTC,
      key: 'selection'
    };
  
    setDateRange([ranges.selection]);
    try {
      const response = await adminApiInstance.post("/fetchDataForDateRange", utcRanges);
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching data for the selected date range:', error);
    }
  };

  const handleClickOutside = (event) => {
    // Check if clicked element is not the search input field
    if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
      setShowSearchInput(false); // Close search input field
    }
    // Check if clicked element is not the date range picker
    if (dateRangePickerRef.current && !dateRangePickerRef.current.contains(event.target)) {
      setDatepicker(false); // Close date range picker
    }
    // // Check if clicked element is not the category dropdown
    // if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
    //   setCategoryDropdownVisible(false); // Close category dropdown
    // }
  };

  const datePickerFnc = () => {
    setDatepicker(!datePicker);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchData(selectedOption); // Fetch data initially with default option
  }, [selectedOption]); // Re-fetch data when option changes

  const fetchData = async (option) => {
    try {
      let response;
      switch(option) {
        case 'Daily':
          response = await adminApiInstance.get('/dailyData');
          break;
        case 'Weekly':
          response = await adminApiInstance.get('/fetchWeekly');
          break;
        case 'Monthly':
          response = await adminApiInstance.get("/monthlyData");
          break;
        default:
          break;
      }
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setShowSearchInput(false); // Close search input when changing options
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  // Removed unused function toggleCategoryDropdown

  const formatWeeklyDate = (startDate, endDate) => {
    // Extracting month and day for start and end dates
    const startMonth = startDate.getMonth() + 1;
    const startDay = startDate.getDate();
    const endMonth = endDate.getMonth() + 1;
    const endDay = endDate.getDate();
    // Constructing the formatted string
    return `${startMonth}/${startDay}-${endMonth}/${endDay}`;
  };

  return (
    <>
      <div className="wholeComp">
        <div className="Porder">
          <h3>Purchase order report</h3>
          <h5>Manage your Purchase order report</h5>
        </div>
        <div className="twoDropdown">
          <DropdownButton title="Summary" className="drop5">
            <Dropdown.Item href="#/action-1" onClick={() => handleOptionChange('Daily')}>Daily</Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={() => handleOptionChange('Weekly')}>Weekly</Dropdown.Item>
            <Dropdown.Item href="#/action-3" onClick={() => handleOptionChange('Monthly')}>Monthly</Dropdown.Item>
          </DropdownButton>

          <DropdownButton id="dropdown-basic-button" title="FilterBy">
            <Dropdown.Item href="#/action-2" onClick={toggleSearchInput}>
              Category
            </Dropdown.Item>
          </DropdownButton>

          <div ref={categoryDropdownRef}>
  <select className="inputFilterBY" onChange={(e) => handleCategorySelect(e.target.value)}>
    <option value="">Select category</option>
    {categories.map(category => (
      <option key={category._id} value={category._id}>{category.name}</option>
    ))}
  </select>
</div>

          <div className="daterangepicker d-flex" onClick={datePickerFnc}>
            <div className="m-1 px-2 py-1 bg-light">
              <p>{dateRange[0].startDate.toLocaleDateString()}</p>
            </div>
            <div className="m-1 px-2 py-1 bg-light">
              <p>{dateRange[0].endDate.toLocaleDateString()}</p>
            </div>
          </div>

          {datePicker && (
            <div ref={dateRangePickerRef}>
              <DateRangePicker
                onChange={handleDateRangeChange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={dateRange}
                direction="horizontal"
                preventSnapRefocus={true}
                calendarFocus="backwards"
                locale={enGB}
              />
            </div>
          )}
        </div>

        {selectedOption === 'Weekly' && (
          <h4 className="Pdate">{formatWeeklyDate(dateRange[0].startDate, dateRange[0].endDate)}</h4>
        )}

        <ProductTable data={tableData} />
      </div>
    </>
  );
};

export default PurchaseOrder1;

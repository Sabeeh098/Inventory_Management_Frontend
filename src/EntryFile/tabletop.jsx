/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";

import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  Printer,
  Search,
} from "../EntryFile/imagePath";

const Tabletop = ({ inputfilter, togglefilter, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="table-top">
      <div className="search-set"></div>
      <div className="search-set none">
        <div className="search-path">
          <a
            className={` btn ${
              inputfilter ? "btn-filter setclose" : "btn-filter"
            } `}
            id="filter_search"
            onClick={() => togglefilter(!inputfilter)}
          >
            <img src={Filter} alt="img" />
            <span>
              <img src={ClosesIcon} alt="img" />
            </span>
          </a>
        </div>
        <div className="search-input">
          <input
            className="form-control form-control-sm search-icon"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <Link to="#" className="btn btn-searchset" onClick={handleSearch}>
            <img src={Search} alt="img" />
          </Link>
        </div>
      </div>
      <div className="wordset">
        <ul>
          <ReactTooltip place="top" type="dark" effect="solid" />
          <li>
            <a data-tip="Pdf">
              <img src={Pdf} alt="img" />
            </a>
          </li>
          <li>
            <a data-tip="Excel">
              <img src={Excel} alt="img" />
            </a>
          </li>
          <li>
            <a data-tip="Print">
              <img src={Printer} alt="img" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tabletop;

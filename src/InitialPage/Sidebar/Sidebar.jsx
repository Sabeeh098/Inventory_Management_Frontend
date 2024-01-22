/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import FeatherIcon from "feather-icons-react";

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");
  const [path, setPath] = useState("");
  const history = useHistory();

  const toggleSidebar = (value) => {
    setSideMenu(value);
  };
  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  const pageRefresh = (url, page) => {
    history.push(`/dream-pos/${url}/${page}`);
    window.location.reload();
  };
  const location = useLocation();
  let pathname = location.pathname;

  useEffect(() => {
    document.querySelector(".main-wrapper").classList.remove("slide-nav");
    document.querySelector(".sidebar-overlay").classList.remove("opened");
    document.querySelector(".sidebar-overlay").onclick = function () {
      this.classList.remove("opened");
      document.querySelector(".main-wrapper").classList.remove("slide-nav");
    };
  }, [pathname]);
  const exclusionArray = [
    "/reactjs/template/dream-pos/index-three",
    "/reactjs/template/dream-pos/index-four",
    "/reactjs/template/dream-pos/index-two",
    "/reactjs/template/dream-pos/index-one",
  ];
  if (exclusionArray.indexOf(window.location.pathname) >= 0) {
    return "";
  }

  return (
    <>
      <div className={`sidebar index-4 ${pathname.includes("/index-three")?"d-none":""}`} id="sidebar">
        <Scrollbars>
          <div className="slimScrollDiv">
          <div className="sidebar-inner slimscroll">
            <div
              id="sidebar-menu"
              className="sidebar-menu"
              onMouseOver={expandMenuOpen}
              onMouseLeave={expandMenu}
            >
              <ul>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">Main</h6>
                  <ul>
                    <li
                      className={pathname.includes("dashboard") ? "active" : ""}
                    >
                      <Link to="/dream-pos/dashboard">
                        {/* <i data-feather="grid" /> */}
                        <FeatherIcon icon="grid" />
                        <span>Dashboard</span>
                      </Link>
                    </li>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/application")
                            ? "subdrop active"
                            : "" || isSideMenu == "Application"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "Application" ? "" : "Application"
                          )
                        }
                      >
                        {/* <img src={Product} alt="img" /> */}
                        <FeatherIcon icon="smartphone" />
                        <span> Application</span>{" "}
                        <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "Application" ? (
                        <ul>
                          <li>
                            <Link
                              to="/dream-pos/application/chat"
                              className={
                                pathname.includes("chat") ? "active" : ""
                              }
                            >
                              Chat
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/application/calendar"
                              className={
                                pathname.includes("calendar") ? "active" : ""
                              }
                            >
                              Calendar
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/application/email"
                              className={
                                pathname.includes("email") ? "active" : ""
                              }
                            >
                              Email
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                </li>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">Products</h6>
                  <ul>
                    <li
                      className={
                        pathname.includes("add-loads") ? "active" : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("add-loads-") ? "active" : ""
                        }
                        to="/dream-pos/product/add-loads"
                      >
                        <FeatherIcon icon="plus-square" />
                        <span>Add Loads</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("list-loads") ? "active" : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("list-loads-") ? "active" : ""
                        }
                        to="/dream-pos/product/list-loads"
                      >
                        <FeatherIcon icon="box" />
                        <span>List Loads</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("add-pallets")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("add-pallets-") ? "active" : ""
                        }
                        to="/dream-pos/product/add-pallets"
                      >
                        <FeatherIcon icon="codepen" />
                        <span>Scan Barcode</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("printbarcode-pallets")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("printbarcode-") ? "active" : ""
                        }
                        to="/dream-pos/product/printbarcode-pallets"
                      >
                        {/* <i data-feather="align-justify" /> */}
                        <FeatherIcon icon="align-justify" />
                        <span>List Barcode</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("brandlist-product") ? "active" : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("brandlist-") ? "active" : ""
                        }
                        to="/dream-pos/product/brandlist-product"
                      >
                        {/* <i data-feather="tag" /> */}
                        <FeatherIcon icon="tag" />
                        <span>Brands</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("subcategorytable-product")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("subcategorytable-") ? "active" : ""
                        }
                        to="/dream-pos/product/subcategorytable-product"
                      >
                        <FeatherIcon icon="speaker" />
                        <span>Sub Category</span>
                      </Link>
                    </li>
                   
                    <li
                      className={
                        pathname.includes("importproduct-product")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("importproduct-") ? "active" : ""
                        }
                        to="/dream-pos/product/importproduct-product"
                      >
                        {/* <i data-feather="minimize-2" /> */}
                        <FeatherIcon icon="minimize-2" />
                        <span>Import Products</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">Purchases</h6>
                  <ul>
                    <li
                      className={
                        pathname.includes("purchaselist-purchase")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("purchaselist-") ? "active" : ""
                        }
                        to="/dream-pos/purchase/purchaselist-purchase"
                      >
                        {/* <i data-feather="shopping-bag" /> */}
                        <FeatherIcon icon="shopping-bag" />
                        <span>Purchases</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("importpurchase-purchase")
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        className={
                          pathname.includes("importpurchase-") ? "active" : ""
                        }
                        to="/dream-pos/purchase/importpurchase-purchase"
                      >
                        <FeatherIcon icon="minimize-2" />
                        <span>Import Purchases</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("purchaseorderreport") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/purchaseorderreport"
                        className={
                          pathname.includes("purchaseorderreport")
                            ? "active"
                            : ""
                        }
                      >
                        <FeatherIcon icon="file-minus" />
                        <span>Purchase Order</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/dream-pos/return/purchasereturnlist-return">
                        <FeatherIcon icon="refresh-cw" />
                        Purchase Return
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">Finance &amp; Accounts</h6>
                  <ul>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/expense")
                            ? "subdrop active"
                            : "" || isSideMenu == "expense"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "expense" ? "" : "expense"
                          )
                        }
                      >
                        <FeatherIcon icon="file-text" />
                        <span>Expense</span>
                        <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "expense" ? (
                        <ul>
                          <li>
                            <Link
                              className={
                                pathname.includes("expenselist-")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/expense/expenselist-expense"
                            >
                              Expenses
                            </Link>
                          </li>
                          <li>
                            <Link
                              className={
                                pathname.includes("expensecategory-")
                                  ? "active"
                                  : ""
                              }
                              to="/dream-pos/expense/expensecategory-expense"
                            >
                              Expenses Category
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                </li>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">Reports</h6>
                  <ul>
                    <li
                      className={
                        pathname.includes("salesreport") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/salesreport"
                        className={
                          pathname.includes("salesreport") ? "active" : ""
                        }
                      >
                        {/* <i data-feather="bar-chart-2" /> */}
                        <FeatherIcon icon="bar-chart-2" />
                        <span>Sales Report</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dream-pos/report/purchaseorderreport"
                        className={
                          pathname.includes("purchaseorderreport")
                            ? "active"
                            : ""
                        }
                      >
                        {/* <i data-feather="pie-chart" /> */}
                        <FeatherIcon icon="pie-chart" />
                        <span>Purchase report</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("inventoryreport") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/inventoryreport"
                        className={
                          pathname.includes("inventoryreport") ? "active" : ""
                        }
                      >
                        {/* <i data-feather="credit-card" /> */}
                        <FeatherIcon icon="credit-card" />
                        <span>Inventory Report</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("invoicereport") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/invoicereport"
                        className={
                          pathname.includes("invoicereport") ? "active" : ""
                        }
                      >
                        <FeatherIcon icon="file" />
                        <span>Invoice Report</span>
                      </Link>
                    </li>
                    <li
                      className={
                        pathname.includes("purchasereport") ? "active" : ""
                      }
                    >
                      <Link
                        to="/dream-pos/report/purchasereport"
                        className={
                          pathname.includes("purchasereport") ? "active" : ""
                        }
                      >
                        <FeatherIcon icon="bar-chart" />
                        <span>Purchase Report</span>
                      </Link>
                    </li>
                 
                  
                  </ul>
                </li>
                <li className="submenu-open">
                  <h6 className="submenu-hdr">Settings</h6>
                  <ul>
                    <li className="submenu">
                      <Link
                        to="#"
                        className={
                          pathname.includes("/dream-pos/settings")
                            ? "subdrop active"
                            : "" || isSideMenu == "Settings"
                            ? "subdrop active"
                            : ""
                        }
                        onClick={() =>
                          toggleSidebar(
                            isSideMenu == "Settings" ? "" : "Settings"
                          )
                        }
                      >
                        {/* <img src={settings} alt="img" /> */}
                        <FeatherIcon icon="settings" />
                        <span> Settings</span> <span className="menu-arrow" />
                      </Link>
                      {isSideMenu == "Settings" ? (
                        <ul>
                          <li>
                            <Link
                              to="/dream-pos/settings/generalsettings"
                              className={
                                pathname.includes("generalsettings")
                                  ? "active"
                                  : ""
                              }
                            >
                              General Settings
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/settings/emailsettings"
                              className={
                                pathname.includes("emailsettings")
                                  ? "active"
                                  : ""
                              }
                            >
                              Email Settings
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/settings/paymentsettings"
                              className={
                                pathname.includes("paymentsettings")
                                  ? "active"
                                  : ""
                              }
                            >
                              Payment Settings
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/settings/currencysettings"
                              className={
                                pathname.includes("currencysettings")
                                  ? "active"
                                  : ""
                              }
                            >
                              Currency Settings
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/settings/grouppermissions"
                              className={
                                pathname.includes("permission") ? "active" : ""
                              }
                            >
                              Group Permissions
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/dream-pos/settings/taxrates"
                              className={
                                pathname.includes("taxrates") ? "active" : ""
                              }
                            >
                              Tax Rates
                            </Link>
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                    <li>
                      <Link
                        to="/signIn"
                        className={pathname.includes("signIn") ? "active" : ""}
                      >
                        <FeatherIcon icon="log-out" />
                        <span>Logout</span>{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};

export default withRouter(Sidebar);

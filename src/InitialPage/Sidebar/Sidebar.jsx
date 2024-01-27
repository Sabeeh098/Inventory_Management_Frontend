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
      <div
        className={`sidebar index-4 ${
          pathname.includes("/index-three") ? "d-none" : ""
        }`}
        id="sidebar"
      >
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
                        className={
                          pathname.includes("dashboard") ? "active" : ""
                        }
                      >
                        <Link to="/dream-pos/dashboard">
                          {/* <i data-feather="grid" /> */}
                          <FeatherIcon icon="grid" />
                          <span>Dashboard</span>
                        </Link>
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
                          pathname.includes("add-pallets") ? "active" : ""
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
                          pathname.includes("purchaseorderreport")
                            ? "active"
                            : ""
                        }
                      >
                        <Link
                          to="/dream-pos/product/purchaseorderreport"
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
                    </ul>
                  </li>
                  <li className="submenu-open">
                    <h6 className="submenu-hdr">Users</h6>
                    <ul>
                    <li
                        className={
                          pathname.includes("add-User") ? "active" : ""
                        }
                      >
                        <Link
                          className={
                            pathname.includes("add-User") ? "active" : ""
                          }
                          to="/dream-pos/product/add-User"
                        >
                          <FeatherIcon icon="plus-square" />
                          <span>Add Users</span>
                        </Link>
                      </li>
                    <li
                        className={
                          pathname.includes("Users-List") ? "active" : ""
                        }
                      >
                        <Link
                          className={
                            pathname.includes("Users-List") ? "active" : ""
                          }
                          to="/dream-pos/product/Users-List"
                        >
                          <FeatherIcon icon="users" />
                          <span>Users List</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="submenu-open">
                    <h6 className="submenu-hdr">Reports</h6>
                    <ul>
                    <li
                        className={
                          pathname.includes("InventoryIndicators") ? "active" : ""
                        }
                      >
                        <Link
                          to="/dream-pos/product/InventoryIndicators"
                          className={
                            pathname.includes("InventoryIndicators") ? "active" : ""
                          }
                        >
                          {/* <i data-feather="credit-card" /> */}
                          <FeatherIcon icon="credit-card" />
                          <span>Inventory Indicators</span>
                        </Link>
                      </li>
                      <li
                        className={
                          pathname.includes("/ScanInScanOut") ? "active" : ""
                        }
                      >
                        <Link
                          to="/dream-pos/product/ScanInScanOut"
                          className={
                            pathname.includes("salesreport") ? "active" : ""
                          }
                        >
                          {/* <i data-feather="bar-chart-2" /> */}
                          <FeatherIcon icon="bar-chart-2" />
                          <span>Scan In & Scan Out</span>
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
                                  pathname.includes("permission")
                                    ? "active"
                                    : ""
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
                          className={
                            pathname.includes("signIn") ? "active" : ""
                          }
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

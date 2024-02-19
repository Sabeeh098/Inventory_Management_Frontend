import React, { useEffect, useState } from "react";
import { adminApiInstance } from "../../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import { DeleteIcon, PlusIcon } from "../../EntryFile/imagePath";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [loadData, setLoadData] = useState({
    loadNumber: "",
    loadCost: "",
    palletsCount: 0,
    category: "",
    loadDate: "",
    perPalletCost: 0,
    skuCode: "",
    isBrands: false,
    brands: [],
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
      const fetchCategories = async () => {
          try {
              const response = await adminApiInstance.get("/categories");
              setCategories(response.data);
          } catch (error) {
              console.error("Error fetching categories:", error);
          }
      };
      fetchCategories();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "loadCost") {
      setLoadData({
        ...loadData,
        [name]: value,
        perPalletCost: (loadData.palletsCount !== 0
          ? value / loadData.palletsCount
          : 0
        ).toFixed(2),
      });
    } else if (name == "palletsCount") {
      setLoadData({
        ...loadData,
        [name]: value,
        perPalletCost: (value !== 0 ? loadData.loadCost / value : 0).toFixed(2),
      });
    } else {
      setLoadData({ ...loadData, [name]: value });
    }
  };

  const handleBrandChange = (index, field, e) => {
    const updatedBrands = [...loadData.brands];
    if (field == "totalPallet") {
      updatedBrands[index]["totalPrice"] =
        (Number(loadData.loadCost) / Number(loadData.palletsCount)) *
        Number(e.target.value);
    }
    updatedBrands[index][field] = e.target.value;
    setLoadData({ ...loadData, brands: updatedBrands });
  };

  const handleDateChange = (date) => {
    setLoadData({ ...loadData, loadDate: date });
  };

  const convertBarcodeToImage = async (ID) => {
    try {
      const barcodeDiv = document.getElementById(ID);
      if (barcodeDiv) {
        const canvas = await html2canvas(barcodeDiv, {
          width: 250,
          height: 135,
        });
        const imageData = canvas.toDataURL("image/png");
        return imageData;
      }
    } catch (error) {
      console.error("Error converting barcode to image:", error);
    }
  };

  const addBrandField = () => {
    setLoadData((prevData) => ({
      ...prevData,
      brands: [
        ...prevData.brands,
        {
          brandName: "",
          palletNumbers: "",
          totalPallet: "",
          totalPrice: "",
          skuCode: "",
        },
      ],
      skuCode: "", // Reset SKU code when adding a new brand
    }));
  };

  const deleteBrandField = (index) => {
    const updatedBrands = [...loadData.brands];
    updatedBrands.splice(index, 1);
    setLoadData({ ...loadData, brands: updatedBrands });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let palletsCounts = 0;
    let key = 0;
    if (
      !(
        loadData.loadNumber &&
        loadData.loadCost &&
        loadData.palletsCount &&
        loadData.category &&
        loadData.loadDate
      )
    ) {
      toast.error("Invalid values");
      return;
    }
    for (let item of loadData.brands) {
      palletsCounts = palletsCounts + Number(item.totalPallet ?? 0);
      item["palletNumbers"] = `${key + 1}-${loadData.palletsCount}`;
      item["barcodeImage"] = await convertBarcodeToImage(`barcode_${key}`);
      key = key + 1;
    }
    if (!(palletsCounts == 0 || palletsCounts == loadData.palletsCount)) {
      toast.error("In Brand Total Pallet Count must be same as Pellets Count");
      return;
    }
    try {
      const barcodeImageData = await convertBarcodeToImage("barcode-container");
      await adminApiInstance.post("/addloads", {
        load: {
          ...loadData,
          barcodeImage: barcodeImageData,
        },
      });
      toast.success("Load added successfully");
      setLoadData({
        loadNumber: "",
        loadCost: "",
        palletsCount: 0,
        perPalletCost: 0,
        category: "",
        loadDate: "",
        skuCode: "",
        isBrands: false,
        brands: [],
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Load Add</h4>
            <h6>Create new load</h6>
          </div>
           <div className="page-btn">
              <Link
                to="/dream-pos/product/addCategory"
                className="btn btn-added"
              >
                <img src={PlusIcon} alt="img" className="me-1" />
                Add New Category
              </Link>
            </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Load Number</label>
                    <input
                      type="text"
                      name="loadNumber"
                      value={loadData.loadNumber}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Load Cost</label>
                    <input
                      type="number"
                      name="loadCost"
                      value={loadData.loadCost}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Pallets Count</label>
                    <input
                      type="number"
                      name="palletsCount"
                      value={loadData.palletsCount}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
               <div className="col-lg-4 col-sm-6 col-12">
    <div className="form-group">
        <label>Category</label>
        <select
            name="category"
            value={loadData.category}
            onChange={handleInputChange}
            className="form-control"
        >
            <option value="">Select Category</option>
            {categories.map(category => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>    
            ))}
        </select>
    </div>
</div>

                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Load Date</label>
                    <DatePicker
                      selected={loadData.loadDate}
                      onChange={handleDateChange}
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                      style={{ marginTop: "10px" }}
                    />
                    <div className="form-check" style={{ float: "right" }}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={loadData.isBrands}
                        onChange={() =>
                          setLoadData({
                            ...loadData,
                            isBrands: !loadData.isBrands,
                          })
                        }
                      />
                      <label className="form-check-label">Is Brand</label>
                    </div>
                  </div>
                </div>
                {!loadData.isBrands && (
                  <>
                    <div className="col-lg-2 col-sm-3 col-12">
                      <div className="form-group">
                        <label>SKU Code</label>
                        <input
                          type="text"
                          name="skuCode"
                          value={loadData.skuCode}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-2 col-12">
                      <div className="form-group">
                        <label>Per Pallet Cost</label>
                        <input
                          type="text"
                          name="perPalletCost"
                          value={loadData.perPalletCost}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </>
                )}
                {loadData.skuCode && !loadData.isBrands && (
                  <div className="col-lg-4 col-sm-6 col-12">
                    <div id="barcode-container">
                      <Barcode value={loadData.skuCode} />
                    </div>
                  </div>
                )}
              </div>
              {loadData.isBrands && (
                <div className="col-lg-11 col-sm-11 col-12">
                  <div className="form-group">
                    <label>Brands</label>
                    {loadData.brands.map((brand, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between mb-2"
                      >
                        <>
                          <div className="flex-grow-1 me-2">
                            <input
                              type="text"
                              name={`brands[${index}].brandName`}
                              value={brand.brandName}
                              onChange={(e) =>
                                handleBrandChange(index, "brandName", e)
                              }
                              className="form-control"
                              placeholder={`Brand Name`}
                            />
                          </div>
                          <div className="flex-grow-1 me-2">
                            <input
                              type="text"
                              name={`brands[${index}].palletNumbers`}
                              value={`${index + 1}-${loadData.palletsCount}`}
                              className="form-control"
                              placeholder={`Pallet Number`}
                            />
                          </div>
                          <div className="flex-grow-1 me-2">
                            <input
                              type="number"
                              name={`brands[${index}].totalPallet`}
                              value={brand.totalPallet}
                              onChange={(e) =>
                                handleBrandChange(index, "totalPallet", e)
                              }
                              className="form-control"
                              placeholder={`Total Pallet`}
                            />
                          </div>
                          <div className="flex-grow-1 me-2">
                            <input
                              type="number"
                              name={`brands[${index}].totalPrice`}
                              value={brand.totalPrice}
                              className="form-control"
                              placeholder={`Total Price`}
                            />
                          </div>
                          <div className="flex-grow-1 me-2">
                            <input
                              type="text"
                              name={`brands[${index}].skuCode`}
                              value={brand.skuCode}
                              onChange={(e) =>
                                handleBrandChange(index, "skuCode", e)
                              }
                              className="form-control"
                              placeholder={`SKU Code`}
                            />
                          </div>
                          <div className="flex-grow-1 me-2">
                            <div id={`barcode_${index}`}>
                              <Barcode value={loadData.brands[index].skuCode} />
                            </div>
                          </div>
                        </>
                        {loadData.brands.length > 1 && (
                          <button
                            type="button"
                            onClick={() => deleteBrandField(index)}
                            className="btn btn-sm btn-danger"
                          >
                            <img src={DeleteIcon} alt="Delete" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addBrandField}
                      className="btn btn-sm btn-info"
                    >
                      + Add Brand
                    </button>
                  </div>
                </div>
              )}
              <div className="col-lg-12">
                <button type="submit" className="btn btn-submit me-2">
                  Submit
                </button>
                <button type="button" className="btn btn-cancel">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

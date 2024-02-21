import React, { useState, useEffect } from "react";
import { adminApiInstance } from "../../api/axios";

const AddCat = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await adminApiInstance.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!categoryName.trim()) {
        alert("Category name cannot be empty");
        return;
      }

      const response = await adminApiInstance.post("/addCategory", {
        name: categoryName,
      });
      console.log("Category added:", response.data);

      setCategoryName("");
      // After adding the category, fetch categories again to update the table
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category. Please try again.");
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product Add Category</h4>
              <h6>Create new product Category</h6>
            </div>
          </div>
          {/* Add form */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Category Name</label>
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    className="btn btn-submit me-2"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button className="btn btn-cancel">Cancel</button>
                </div>
              </div>
            </div>
          </div>
          {/* Table for displaying categories */}
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Categories</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>Index</th>
                    <th style={{ width: "90%" }}>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={category.id}>
                      <td>{index + 1}</td>
                      <td>{category.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* End of table */}
        </div>
      </div>
    </>
  );
};

export default AddCat;
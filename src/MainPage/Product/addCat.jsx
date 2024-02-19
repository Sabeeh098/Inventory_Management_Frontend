import React, { useState } from "react";
import { adminApiInstance } from "../../api/axios";
const AddCat = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async () => {
    try {
      // Check if category name is not empty
      if (!categoryName.trim()) {
        alert("Category name cannot be empty");
        return;
      }

      // Send category name to the backend
      const response = await adminApiInstance.post("/addCategory", {
        name: categoryName,
      });
      console.log("Category added:", response.data);

      // Clear the input field after successful submission
      setCategoryName("");
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
          {/* /add */}
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
          {/* /add */}
        </div>
      </div>
    </>
  );
};

export default AddCat;

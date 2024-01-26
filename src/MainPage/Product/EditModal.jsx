import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import PropTypes from "prop-types";

const EditModal = ({ employee, visible, onClose, onSaveChanges }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Update state when the employee prop changes
    if (employee) {
      setName(employee.name || "");
      setEmail(employee.email || "");
    }
  }, [employee]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSaveChanges = () => {
    const updatedEmployee = {
      ...employee,
      name,
      email,
    };

    onSaveChanges(updatedEmployee);
  };

  return (
    <Modal
      visible={visible}
      title={`Edit Employee - ${employee?.name || "Unknown"}`}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>,
      ]}
    >
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label me-3">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label me-3">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        {/* Add more form fields as needed */}
      </form>
    </Modal>
  );
};

EditModal.propTypes = {
  employee: PropTypes.object,
  visible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSaveChanges: PropTypes.func.isRequired,
};

export default EditModal;

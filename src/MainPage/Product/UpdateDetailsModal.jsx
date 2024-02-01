import React, { useState } from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";

const UpdateDetailsModal = ({
  visible,
  onCancel,
  onUpdate,
  currentPalletsCount,
  selectedLoadId,
}) => {
  const [newPalletsCount, setNewPalletsCount] = useState(currentPalletsCount);

  const handleUpdate = () => {
    onUpdate(selectedLoadId, newPalletsCount);
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      title="Update Pallets Count"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdate}>
          Update
        </Button>,
      ]}
    >
       <div style={{ marginBottom: '10px' }}>
        <label htmlFor="palletsCount">New Pallets Count:</label>
      </div>
      <div>
        <input
          type="number"
          id="palletsCount"
          value={newPalletsCount}
          onChange={(e) => setNewPalletsCount(parseInt(e.target.value, 10) || 0)}
        />
      </div>
    </Modal>
  );
};

UpdateDetailsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  currentPalletsCount: PropTypes.number.isRequired,
  selectedLoadId: PropTypes.string.isRequired,
};

export default UpdateDetailsModal;

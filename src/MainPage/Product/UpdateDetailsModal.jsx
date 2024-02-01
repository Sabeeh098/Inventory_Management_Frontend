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
      <label htmlFor="palletsCount">New Pallets Count:</label>
      <input
        type="number"
        id="palletsCount"
        value={newPalletsCount}
        onChange={(e) => setNewPalletsCount(parseInt(e.target.value, 10) || 0)}
      />
    </Modal>
  );
};

import React, { useState } from "react";
import { Button, Checkbox, Col, Flex, Modal, Row } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const ExportModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const checkboxData = [
    { label: "Farg'ona 1", value: "fargona1" },
    { label: "Farg'ona 2", value: "fargona2" },
    { label: "Farg'ona 3", value: "fargona3" },
    { label: "Farg'ona 4", value: "fargona4" },
    { label: "Farg'ona 5", value: "fargona5" },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (checkedValue: string) => {
    const currentIndex = checkedValues.indexOf(checkedValue);
    const newCheckedValues = [...checkedValues];

    if (currentIndex === -1) {
      newCheckedValues.push(checkedValue);
    } else {
      newCheckedValues.splice(currentIndex, 1);
    }

    setCheckedValues(newCheckedValues);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} size="large">
        <DownloadOutlined /> Export
      </Button>
      <Modal
        title="Foydalanuvchilar ma'lumotini export qilish"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Export"
        cancelText="Bekor qilish"
      >
        <Flex wrap gap={10}>
          {checkboxData.map(checkbox => (
            <Checkbox
              key={checkbox.value}
              checked={checkedValues.includes(checkbox.value)}
              onChange={() => handleCheckboxChange(checkbox.value)}
              style={{ width: "48%" }}
            >
              {checkbox.label}
            </Checkbox>
          ))}
        </Flex>
      </Modal>
    </>
  );
};

export default ExportModal;

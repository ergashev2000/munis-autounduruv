import React, { useState } from "react";
import { Input, Modal, Form, Select, Flex } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

interface Positions {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const WhiteListModal: React.FC<Positions> = ({ openModal, setOpenModal }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [positionName, setPositionName] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "positionName") {
      setPositionName(value);
    } else if (name === "contractNumber") {
      setContractNumber(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    }
  };

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <Modal
      centered
      open={openModal}
      onOk={handleOk}
      onCancel={() => setOpenModal(false)}
      width={800}
      okText="Tasdiqlash"
      cancelText="Bekor qilish"
      confirmLoading={confirmLoading}
    >
      <Form layout="vertical">
        <Flex gap={20}>
          <div style={{ width: "50%" }}>
            <Form.Item label="F.I.SH" name="fullname">
              <Input
                placeholder="F.I.SH"
                name="positionName"
                value={positionName}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Shartnoma Raqami" name="contractNumber">
              <Input
                placeholder="Shartnoma Raqami Kiriting"
                name="contractNumber"
                value={contractNumber}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item label="Telefon Raqami" name="phone">
              <Input
                placeholder="Telefon Raqami"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Item>
          </div>
          <div style={{ width: "50%" }}>
            <Form.Item label="Muddatni Tanlang" name="selectOption">
              <Select
                placeholder="Muddatni Tanlang"
                value={selectedOption}
                onChange={handleSelectChange}
              >
                <Option value="option1">1 oy</Option>
                <Option value="option2">2 oy</Option>
                <Option value="option3">3 oy</Option>
              </Select>
            </Form.Item>
            <TextArea rows={4} placeholder="Izoh qo'shing..." maxLength={500} />
          </div>
        </Flex>
      </Form>
    </Modal>
  );
};

export default WhiteListModal;

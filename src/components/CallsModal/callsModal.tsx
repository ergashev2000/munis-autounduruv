import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Form,
  Flex,
  Typography,
  Row,
  Select,
  SelectProps,
  Col,
  Space,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  PlusOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

const CallsModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const [positionName, setPositionName] = useState("");
  const [checkboxValues, setCheckboxValues] = useState({
    sozlanmalar: false,
    adminHisoboti: false,
    filialMenyusi: false,
    kartaBoglash: false,
    hisobotlar: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPositionName(e.target.value);
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setCheckboxValues({
      ...checkboxValues,
      [e.target.name!]: e.target.checked,
    });
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const options: SelectProps["options"] = [];

  for (let i = 0; i < 100000; i++) {
    const value = `Fargona-${i.toString(36)}${i}`;
    options.push({
      label: value,
      value,
      disabled: i === 10,
    });
  }

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} size="large">
        <PlusOutlined /> Qo'shish
      </Button>
      <Modal
        title="Toifa qo'shish"
        centered
        open={open}
        onOk={() => handleOk()}
        onCancel={() => setOpen(false)}
        width={1200}
        okText={"Tasdiqlash"}
        cancelText={"Bekor qilish"}
        confirmLoading={confirmLoading}
        maskClosable={false}
      >
        <Form>
          <Space direction="vertical">
            <Row>
              <label htmlFor="fullname">Toifa sozlamasi nomi</label>
              <Input
                placeholder="F.I.SH"
                id={"fullname"}
                value={positionName}
                onChange={handleInputChange}
                size="large"
              />
            </Row>
            <Flex vertical>
              <label htmlFor="fullname">Toifa tanlash</label>
              <Select
                placeholder="Toifa tanlang"
                size="large"
                // onChange={handleChange}
                options={[
                  { value: "oq", label: "Oq" },
                  { value: "qora", label: "Qora" },
                ]}
              />
            </Flex>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default CallsModal;

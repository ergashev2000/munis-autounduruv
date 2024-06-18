import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Form,
  Checkbox,
  Flex,
  Typography,
  Space,
  Row,
  Col,
  Select,
  SelectProps,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  PlusOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

const EmployeesModal: React.FC = () => {
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
        <PlusOutlined /> Foydalanuvchi qo'shish
      </Button>
      <Modal
        title="Foydalanuvchi qo'shish"
        centered
        open={open}
        onOk={() => handleOk()}
        onCancel={() => setOpen(false)}
        width={800}
        okText={"Tasdiqlash"}
        cancelText={"Bekor qilish"}
        confirmLoading={confirmLoading}
      >
        <Form>
          <Typography.Title level={4}>
            Foydalanuvchi ma'lumotlari
          </Typography.Title>
          <Flex justify="space-between" gap={20}>
            <Flex vertical gap={10} style={{ width: "50%" }}>
              <Row>
                <label htmlFor="fullname">F.I.SH</label>
                <Input
                  placeholder="F.I.SH"
                  id={"fullname"}
                  value={positionName}
                  onChange={handleInputChange}
                  size="large"
                />
              </Row>
              <Row>
                <label htmlFor="phone_number">Telefon raqam</label>
                <Input
                  placeholder="Telefon raqam..."
                  id={"phone_number"}
                  value={positionName}
                  onChange={handleInputChange}
                  size="large"
                />
              </Row>
              <Row>
                <label htmlFor="login">Login</label>
                <Input
                  placeholder="Login..."
                  value={positionName}
                  onChange={handleInputChange}
                  id="login"
                  size="large"
                />
              </Row>
              <Row>
                <label htmlFor="password">Parol</label>
                <Input.Password
                  placeholder="Parol..."
                  iconRender={visible =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={handleInputChange}
                  value={positionName}
                  id="password"
                  size="large"
                />
              </Row>
            </Flex>

            <Flex vertical gap={10} style={{ width: "50%" }}>
              <Row>
                <label htmlFor="phone_number">Status</label>
                <Select
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  options={[
                    { value: "Faol", label: "Faol" },
                    { value: "Nofaol", label: "Nofaol" },
                  ]}
                  size="large"
                />
              </Row>
              <Row>
                <label htmlFor="phone_number">Lavozim</label>
                <Select
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "menejer", label: "Menejer" },
                    { value: "foydalanuvchi", label: "Foydalanuvchi" },
                  ]}
                  size="large"
                />
              </Row>

              <Row>
                <label htmlFor="phone_number">Filiallar</label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  onChange={handleChange}
                  options={options}
                  size="large"
                />
              </Row>
              <Row>
                <label htmlFor="phone_number">Huquqlar</label>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  onChange={handleChange}
                  options={options}
                  size="large"
                />
              </Row>
            </Flex>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default EmployeesModal;

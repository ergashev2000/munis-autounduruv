import React, { useState } from "react";
import { Button, Input, Modal, Form, Checkbox, Flex, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { PlusOutlined } from "@ant-design/icons";

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

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} size="large">
        <PlusOutlined /> Lavozim qo'shish
      </Button>
      <Modal
        title="Lavozim qo'shish"
        centered
        open={open}
        onOk={() => handleOk()}
        onCancel={() => setOpen(false)}
        width={500}
        okText={"Tasdiqlash"}
        cancelText={"Bekor qilish"}
        confirmLoading={confirmLoading}
      >
        <Form layout="vertical">
          <Form.Item label="Lavozim nomi" name="positionName">
            <Input
              placeholder="Lavozim nomi"
              value={positionName}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item>
            <Typography.Title level={5}>
              Qo'shimcha imkonyatlar
            </Typography.Title>
            <Flex>
              <Flex vertical gap={20} style={{ width: "50%" }}>
                <Checkbox
                  name="sozlanmalar"
                  checked={checkboxValues.sozlanmalar}
                  onChange={handleCheckboxChange}
                >
                  Sozlanmalar
                </Checkbox>
                <Checkbox
                  name="adminHisoboti"
                  checked={checkboxValues.adminHisoboti}
                  onChange={handleCheckboxChange}
                >
                  Admin Hisoboti
                </Checkbox>
                <Checkbox
                  name="filialMenyusi"
                  checked={checkboxValues.filialMenyusi}
                  onChange={handleCheckboxChange}
                >
                  Filial Menyusi
                </Checkbox>
              </Flex>
              <Flex vertical gap={20} style={{ width: "50%" }}>
                <Checkbox
                  name="kartaBoglash"
                  checked={checkboxValues.kartaBoglash}
                  onChange={handleCheckboxChange}
                >
                  Karta Bog'lash
                </Checkbox>
                <Checkbox
                  name="hisobotlar"
                  checked={checkboxValues.hisobotlar}
                  onChange={handleCheckboxChange}
                >
                  Hisobotlar
                </Checkbox>
              </Flex>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EmployeesModal;

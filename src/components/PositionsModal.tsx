import React, { useState, useEffect } from "react";
import { Input, Modal, Form, Checkbox, Typography } from "antd";
import { PositionsType } from "../types/PositionsType";

interface Positions {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  onCreate?: (data: PositionsType) => void;
  onUpdate?: (id: string | undefined, data: PositionsType) => void;
  initialData?: PositionsType;
  setInitialData?: ((data: PositionsType | undefined) => void) | undefined;
}

const PositionsModal: React.FC<Positions> = ({
  openModal,
  setOpenModal,
  onCreate,
  onUpdate,
  initialData,
  setInitialData,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (openModal) {
      if (initialData) {
        form.setFieldsValue({
          name: initialData.name,
          sozlanmalar: initialData.settings,
          adminHisoboti: initialData.reports,
          filialMenyusi: initialData.cardActions,
          kartaBoglash: initialData.dashboard,
          hisobotlar: initialData.adminReports,
        });
      } else {
        form.resetFields();
      }
    }
  }, [initialData, openModal, form]);

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const values = await form.validateFields();
      const obj: PositionsType = {
        name: values.name,
        settings: values.sozlanmalar,
        dashboard: values.kartaBoglash,
        reports: values.hisobotlar,
        cardActions: values.filialMenyusi,
        adminReports: values.adminHisoboti,
      };
      if (initialData && onUpdate) {
        onUpdate(initialData?.id, obj);
      } else if (onCreate) {
        onCreate(obj);
      }
      setOpenModal(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  useEffect(() => {
    if (!openModal && setInitialData) {
      setInitialData(undefined);
    }
  }, [openModal, setInitialData]);

  return (
    <>
      <Modal
        centered
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        okText="Tasdiqlash"
        cancelText="Bekor qilish"
        confirmLoading={confirmLoading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Lavozim nomi"
            name="name"
            rules={[
              { required: true, message: "Please input the position name!" },
            ]}
          >
            <Input placeholder="Lavozim nomi" />
          </Form.Item>
          <Form.Item>
            <Typography.Title level={5}>
              Qo'shimcha imkonyatlar
            </Typography.Title>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "50%" }}>
                <Form.Item name="sozlanmalar" valuePropName="checked">
                  <Checkbox>Sozlanmalar</Checkbox>
                </Form.Item>
                <Form.Item name="adminHisoboti" valuePropName="checked">
                  <Checkbox>Admin Hisoboti</Checkbox>
                </Form.Item>
                <Form.Item name="filialMenyusi" valuePropName="checked">
                  <Checkbox>Filial Menyusi</Checkbox>
                </Form.Item>
              </div>
              <div style={{ width: "50%" }}>
                <Form.Item name="kartaBoglash" valuePropName="checked">
                  <Checkbox>Karta Bog'lash</Checkbox>
                </Form.Item>
                <Form.Item name="hisobotlar" valuePropName="checked">
                  <Checkbox>Hisobotlar</Checkbox>
                </Form.Item>
              </div>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PositionsModal;

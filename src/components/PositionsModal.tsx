import React, { useState, useEffect } from "react";
import { Input, Modal, Form, Checkbox, Typography, Flex } from "antd";
import { PositionType } from "../types/PositionsType";
import { handleError } from "@utils/handleError";
import { alertSuccess } from "@utils/toastify";

interface Positions {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  onCreate?: (data: PositionType) => void;
  onUpdate?: (id: string | undefined, data: PositionType) => void;
  initialData?: PositionType;
  setInitialData?: ((data: PositionType | undefined) => void) | undefined;
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
          settings: initialData.settings,
          adminReports: initialData.adminReports,
          cardActions: initialData.cardActions,
          dashboard: initialData.dashboard,
          reports: initialData.reports,
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
      const obj: PositionType = {
        name: values.name,
        settings: values.settings,
        dashboard: values.dashboard,
        reports: values.reports,
        cardActions: values.cardActions,
        adminReports: values.adminReports,
      };
      if (initialData && onUpdate) {
        await onUpdate(initialData?.id, obj);
        alertSuccess("Lavozim muvaffaqiyatli o'zgartirildi!");
      } else if (onCreate) {
        await onCreate(obj);
        alertSuccess("Lavozim muvaffaqiyatli yaratildi!");
      }
      setOpenModal(false);
      form.resetFields();
    } catch (error) {
      console.log(error);
      handleError(error);
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
            <Flex justify="space-between">
              <div style={{ width: "50%" }}>
                <Form.Item name="settings" valuePropName="checked">
                  <Checkbox>Sozlanmalar</Checkbox>
                </Form.Item>
                <Form.Item name="adminReports" valuePropName="checked">
                  <Checkbox>Admin Hisoboti</Checkbox>
                </Form.Item>
              </div>
              <div style={{ width: "50%" }}>
                <Form.Item name="cardActions" valuePropName="checked">
                  <Checkbox>Karta Bog'lash</Checkbox>
                </Form.Item>
                <Form.Item name="reports" valuePropName="checked">
                  <Checkbox>Hisobotlar</Checkbox>
                </Form.Item>
              </div>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PositionsModal;

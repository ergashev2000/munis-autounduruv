import React, { useEffect } from "react";
import { Input, Modal, Form } from "antd";
import { BranchsType } from "../types/BranchsType";

interface BranchsModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  onCreate?: (data: BranchsType) => void;
  onUpdate?: (id: string | undefined, data: BranchsType) => void;
  initialData?: BranchsType;
  setInitialData?: ((data: BranchsType | undefined) => void) | undefined;
  loading: boolean;
}

const BranchsModal: React.FC<BranchsModalProps> = ({
  openModal,
  setOpenModal,
  onCreate,
  onUpdate,
  initialData,
  setInitialData,
  loading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (openModal) {
      if (initialData) {
        form.setFieldsValue(initialData);
      } else {
        form.resetFields();
      }
    }
  }, [initialData, openModal, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const updatedValues: BranchsType = {
        name: values.name,
        value: values.name
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "_")
          .toLowerCase(),
      };

      if (initialData && onUpdate) {
        onUpdate(initialData?.id, updatedValues);
      } else if (onCreate) {
        onCreate(updatedValues);
      }
      setOpenModal(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  useEffect(() => {
    if (!openModal) {
      form.resetFields();
    }
  }, [openModal, form]);

  useEffect(() => {
    if (!openModal && setInitialData) {
      setInitialData(undefined);
    }
  }, [openModal, setInitialData]);

  return (
    <Modal
      centered
      open={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={500}
      okText="Tasdiqlash"
      cancelText="Bekor qilish"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Filial nomi"
          name="name"
          rules={[
            { required: true, message: "Iltimos filial nomini kiriting!" },
          ]}
        >
          <Input placeholder="Filial nomi" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BranchsModal;

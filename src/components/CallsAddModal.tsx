import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
  Row,
  Col,
  message,
  Typography,
} from "antd";
import { weekDays } from "@utils/weekDays";
import useFetch from "../hooks/useFetch";
import { PaginatedData } from "../types/PaginatedType";
import { getById } from "../services/api/crudApi";
import { CallSettings } from "../types/CallSettingsTypes";

const { Option } = Select;
const { RangePicker } = TimePicker;

interface CallAudioFile {
  id: string;
  title: string;
  fileName: string;
}

interface CallAudioProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  callId?: string;
}

const CallsAddModal: React.FC<CallAudioProps> = ({ open, setOpen, callId }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const { data, loading, createData, updateData } =
    useFetch<CallAudioFile>("/audios");

  useEffect(() => {
    const fetchCallById = async () => {
      try {
        if (callId && data) {
          const callData = await getById<CallSettings>("calls", callId);
          console.log(callData);

          if (callData) {
            form.setFieldsValue({
              settings_name: callData.name,
            });
          }
        } else {
          form.resetFields();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCallById();
  }, [callId]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      setConfirmLoading(true);

      if (callId) {
        await updateData(callId, values);
        message.success("Successfully updated!");
      } else {
        await createData(values);
        message.success("Successfully created!");
      }

      setOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Operation failed, please try again.");
      console.error("Validation failed:", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleSelectChange = (selectedKeys: string[]) => {
    if (selectedKeys.includes("selectAll")) {
      form.setFieldsValue({
        weekDays:
          selectedKeys.length === weekDays.length + 1
            ? []
            : weekDays.map(day => day.key),
      });
    }
  };

  return (
    <>
      <Modal
        centered
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={900}
        maskClosable={false}
        okText="Saqlash"
        cancelText="Bekor qilish"
      >
        <Typography.Title level={4}>Qo'ng'iroqlar qo'shish</Typography.Title>
        <Form form={form} layout="vertical" name="callsAddForm">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="settings_name"
                label="Sozlama Nomi"
                rules={[
                  {
                    required: true,
                    message: "Iltimos sozlama nomini kiriting!",
                  },
                ]}
              >
                <Input placeholder="Sozlama nomini kiriting" />
              </Form.Item>
              <Form.Item
                name="minPaymentDay"
                label="Minimal to’lov kuni"
                rules={[
                  {
                    required: true,
                    message: "Please input the minimal to’lov kuni!",
                  },
                ]}
              >
                <Input placeholder="Enter minimal to’lov kuni" />
              </Form.Item>
              <Form.Item
                name="minDebtMonths"
                label="Minimal qarzdor oylar"
                rules={[
                  {
                    required: true,
                    message: "Please input the minimal qarzdor oylar!",
                  },
                ]}
              >
                <Input placeholder="Enter minimal qarzdor oylar" />
              </Form.Item>
              <Form.Item
                name="minCurrentDebt"
                label="Minimal joriy davrgi qarz"
                rules={[
                  {
                    required: true,
                    message: "Please input the minimal joriy davrgi qarz!",
                  },
                ]}
              >
                <Input placeholder="Enter minimal joriy davrgi qarz" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Toifalar"
                rules={[
                  { required: true, message: "Please select a category!" },
                ]}
              >
                <Select placeholder="Select a category">
                  <Option value="category1">Category 1</Option>
                  <Option value="category2">Category 2</Option>
                  <Option value="category3">Category 3</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="audio_file"
                label="Audio fayllar"
                rules={[
                  {
                    required: true,
                    message: "Iltimos audio faylni tanlang!",
                  },
                ]}
              >
                <Select placeholder="Audio faylni tanlang" allowClear>
                  {!loading &&
                    (data as PaginatedData<CallAudioFile>).data.map(audio => (
                      <Option key={audio.id} value={audio.id}>
                        {audio.title}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="weekDays"
                label="Yuboriladigan kunlar"
                rules={[
                  {
                    required: true,
                    message: "Iltimos hafta kun(lar)ini tanlang!",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Kun(lar)ini tanlang"
                  allowClear
                  onChange={handleSelectChange}
                  defaultValue={["monday"]}
                >
                  <Option key="selectAll" value="selectAll">
                    Barchasi
                  </Option>
                  {weekDays.map(day => (
                    <Option key={day.key} value={day.key}>
                      {day.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="callTimes"
                label="Qo’ng’iroq qilinadigan vaqtlar"
                rules={[
                  { required: true, message: "Please select the call times!" },
                ]}
              >
                <RangePicker format="HH:mm" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CallsAddModal;

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
import { CallSettings } from "../types/CallSettingsTypes";
import { ContractTypes } from "../enums/ContractTypes";
import dayjs from "dayjs";

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
  refetch: () => void;
}

const CallsAddModal: React.FC<CallAudioProps> = ({
  open,
  setOpen,
  callId,
  refetch,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const { data: audioData, loading } = useFetch("/audios");

  const {
    data: callData,
    fetchById,
    createData,
    updateData,
  } = useFetch("/calls");

  useEffect(() => {
    const fetchCallById = async () => {
      try {
        if (callId) {
          await fetchById(callId);
          const callDetails = callData as CallSettings;

          if (callDetails) {
            form.setFieldsValue({
              settings_name: callDetails.name,
              minPaymentDay: callDetails.minPaymentDate,
              minDebtMonths: callDetails.minDebtorMonths,
              minCurrentDebt: callDetails.minCurrentDebt,
              category: callDetails.type,
              audioId: callDetails.audioId,
              weekDays: Object.keys(callDetails)
                .filter(
                  day => callDetails[day] === true && day.startsWith("send")
                )
                .map(day => day.slice(4).toLowerCase()),
              callTimes: [
                dayjs(callDetails.startHours, "HH:mm"),
                dayjs(callDetails.endHours, "HH:mm"),
              ],
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
  }, [callId, fetchById, callData, form]);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const values = await form.validateFields();

      const transformedValues: CallSettings = {
        name: values.settings_name,
        type: values.category,
        minPaymentDate: +values.minPaymentDay,
        minDebtorMonths: +values.minDebtMonths,
        minCurrentDebt: +values.minCurrentDebt,
        startHours: values.callTimes[0].format("HH:mm"),
        endHours: values.callTimes[1].format("HH:mm"),
        sendMonday: values.weekDays.includes("monday"),
        sendTuesday: values.weekDays.includes("tuesday"),
        sendWednesday: values.weekDays.includes("wednesday"),
        sendThursday: values.weekDays.includes("thursday"),
        sendFriday: values.weekDays.includes("friday"),
        sendSaturday: values.weekDays.includes("saturday"),
        sendSunday: values.weekDays.includes("sunday"),
        audioId: values.audioId,
      };

      if (callId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await updateData(callId, transformedValues as any);
        message.success("Successfully updated!");
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await createData(transformedValues as any);
        message.success("Successfully created!");
      }

      refetch();
      handleCancel();
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
                  message: "Iltimos minimal to’lov kunini kiriting!",
                },
              ]}
            >
              <Input placeholder="Minimal to’lov kunini kiriting" />
            </Form.Item>
            <Form.Item
              name="minDebtMonths"
              label="Minimal qarzdor oylar"
              rules={[
                {
                  required: true,
                  message: "Iltimos minimal qarzdor oylarini kiriting!",
                },
              ]}
            >
              <Input placeholder="Minimal qarzdor oylarni kiriting" />
            </Form.Item>
            <Form.Item
              name="minCurrentDebt"
              label="Minimal joriy davrgi qarz"
              rules={[
                {
                  required: true,
                  message: "Iltimos minimal joriy davrgi qarzni kiriting!",
                },
              ]}
            >
              <Input placeholder="Minimal joriy davrgi qarzni kiriting" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="category"
              label="Toifalar"
              rules={[{ required: true, message: "Toifani tanlang!" }]}
            >
              <Select placeholder="Toifa tanlang">
                <Option value={ContractTypes.WHITE}>Oq</Option>
                <Option value={ContractTypes.WHITE_YELLOW}>Oq sariq</Option>
                <Option value={ContractTypes.YELLOW}>Sariq</Option>
                <Option value={ContractTypes.RED}>Qizil</Option>
                <Option value={ContractTypes.BLACK}>Qora</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="audioId"
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
                  (audioData as PaginatedData<CallAudioFile>).data.map(
                    audio => (
                      <Option key={audio.id} value={audio.id}>
                        {audio.title}
                      </Option>
                    )
                  )}
              </Select>
            </Form.Item>
            <Form.Item
              name="callTimes"
              label="Qo'ng'iroq vaqtlari"
              rules={[
                {
                  required: true,
                  message: "Iltimos qo'ng'iroq vaqtlarini tanlang!",
                },
              ]}
            >
              <RangePicker format="HH:mm" />
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
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CallsAddModal;

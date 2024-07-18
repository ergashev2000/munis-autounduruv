import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
  Row,
  Col,
  Upload,
  message,
  Card,
  Typography,
} from "antd";
import { RcFile } from "antd/es/upload/interface";
import AudioPlayer from "./AudioPlayerCustom";
import AudioIcon from "../assets/icons/AudioLines.svg";
import axios from "axios";
import { PlayCircle } from "lucide-react";

const { Option } = Select;
const { RangePicker } = TimePicker;

interface FileAudioData {
  id: number;
  label: string;
  name: string;
  url: string;
  file: RcFile | null;
}

const CallsAddModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [fileAudioData, setFileAudioData] = useState<FileAudioData[]>([
    {
      id: 1,
      label: "Qora ro'yhat 1",
      name: "black_list_1",
      url: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav",
      file: null,
    },
    {
      id: 2,
      label: "Qora ro'yhat 2",
      name: "black_list_2",
      url: "",
      file: null,
    },
    {
      id: 3,
      label: "Qora ro'yhat 3",
      name: "black_list_4",
      url: "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav",
      file: null,
    },
    {
      id: 4,
      label: "Qora ro'yhat 4",
      name: "black_list_4",
      url: "",
      file: null,
    },
    {
      id: 5,
      label: "Qora ro'yhat 5",
      name: "black_list_5",
      url: "",
      file: null,
    },
  ]);

  const showModal = () => setOpen(true);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append("files", file.originFileObj as File);
      });
      formData.append("values", JSON.stringify(values));

      setConfirmLoading(true);

      await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Uploaded successfully!");
      setOpen(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error("Upload failed, please try again.");
      console.error("Validation failed:", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setFileList([]);
  };

  const beforeUpload = (file: RcFile) => {
    const isAudio = file.type === "audio/mpeg" || file.type === "audio/wav";
    if (!isAudio) {
      message.error("You can only upload audio files!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("File must be smaller than 2MB!");
    }
    return isAudio && isLt2M;
  };

  const handleChange = (file: RcFile, name: string) => {
    console.log(file);
    const updatedFileAudioData = fileAudioData.map(item =>
      item.name === name ? { ...item, file: file, url: "" } : item
    );
    setFileAudioData(updatedFileAudioData);
    setFileList([file]);
  };

  const renderFormItems = () => (
    <>
      <Form.Item
        name="fullName"
        label="Sozlanma Nomi"
        rules={[{ required: true, message: "Please input your full name!" }]}
      >
        <Input placeholder="Enter your full name" />
      </Form.Item>
      <Form.Item
        name="category"
        label="Toifalar"
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select placeholder="Select a category">
          <Option value="category1">Category 1</Option>
          <Option value="category2">Category 2</Option>
          <Option value="category3">Category 3</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="minPaymentDay"
        label="Minimal to’lov kuni"
        rules={[
          { required: true, message: "Please input the minimal to’lov kuni!" },
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
      <Form.Item
        name="days"
        label="Kunlar Kesimida"
        rules={[{ required: true, message: "Please select a day!" }]}
      >
        <Select placeholder="Select a day">
          <Option value="day1">Day 1</Option>
          <Option value="day2">Day 2</Option>
          <Option value="day3">Day 3</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="callTimes"
        label="Qo’ng’iroq qilinadigan vaqtlar"
        rules={[{ required: true, message: "Please select the call times!" }]}
      >
        <RangePicker format="HH:mm" style={{ width: "100%" }} />
      </Form.Item>
    </>
  );

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Qo'shish
      </Button>
      <Modal
        title="Qo'shish"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
      >
        <Form form={form} layout="vertical" name="callsAddForm">
          <Row gutter={16}>
            <Col span={12}>{renderFormItems()}</Col>
            <Col span={12}>
              <Card>
                {fileAudioData.map((fileData, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <Typography.Text>{fileData.label}</Typography.Text>
                    {fileData.url ? (
                      <AudioPlayer url={fileData.url} />
                    ) : (
                      <div>
                        <Select
                            placeholder="Select audio file"
                          style={{ width: "100%", height: "60px" }}
                        >
                          <Option value="day1">
                            <div style={{ height: "30px" }}>
                              Play - Qora ro'yhat
                            </div>
                            <Button size="small">Ko'rish</Button>
                          </Option>
                        </Select>
                      </div>
                    )}
                  </div>
                ))}
              </Card>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CallsAddModal;

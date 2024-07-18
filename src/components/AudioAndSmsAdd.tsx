import { useState } from "react";
import {
  Button,
  Card,
  Upload,
  message,
  Typography,
  Flex,
  Col,
  Row,
  Space,
  Input,
  Divider,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ArrowLeft, Edit, Save, Trash } from "lucide-react";
import AudioPlayerCustom from "./AudioPlayerCustom";
import TextArea from "antd/es/input/TextArea";
import BreadcrumbItem from "./ui/Breadcrumbs";
import { callsFormBreadcrumbs } from "./ui/Breadcrumbs/breadcrumbsData";
import { Link } from "react-router-dom";

export default function AudioAndSmsAdd() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [demoAudios] = useState([
    {
      name: "Demo Audio 1",
      url: "https://www2.cs.uic.edu/~i101/SoundFiles/Fanfare60.wav",
    },
    {
      name: "Demo Audio 2",
      url: "https://www2.cs.uic.edu/~i101/SoundFiles/Fanfare60.wav",
    },
  ]);
  const [playingAudio, setPlayingAudio] = useState(null);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setFileList([]);
      message.success("Files uploaded successfully");
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    setFileList([]);
  };

  const handleFileChange = ({ file, fileList }) => {
    setFileList(fileList);
  };

  const handlePlayAudio = audioUrl => {
    if (playingAudio === audioUrl) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(audioUrl);
    }
  };

  return (
    <div>
      <Flex
        justify="space-between"
        align="center"
        style={{ paddingBottom: "10px" }}
      >
        <BreadcrumbItem breadcrumbs={callsFormBreadcrumbs} />
      </Flex>
      <Flex gap={20}>
        <Card title="Audio Fayllar Yuklash" style={{ width: "50%" }}>
          <Card>
            <Flex justify="space-between" align="start" gap={10}>
              <div style={{ width: "100%" }}>
                <Upload
                  fileList={fileList}
                  onChange={handleFileChange}
                  beforeUpload={() => false}
                  type="drag"
                  accept="audio/*"
                  maxCount={1}
                >
                  <div>
                    <UploadOutlined /> Fayl yuklash
                  </div>
                </Upload>
              </div>
              <Button
                type="primary"
                disabled
                size="large"
                icon={<Save size={18} />}
              >
                Saqlash
              </Button>
            </Flex>
          </Card>
          <Divider>Barcha Audio Fayllar</Divider>
          <Row gutter={[26, 26]} style={{ marginTop: "20px" }}>
            <Col span={24}>
              <div
                style={{ border: "1px solid #eeeeee", borderRadius: "10px" }}
              >
                <Typography.Title
                  level={4}
                  style={{ paddingLeft: "12px", paddingTop: "8px" }}
                >
                  Qora ro'yhat
                </Typography.Title>
                <AudioPlayerCustom />
              </div>
            </Col>
          </Row>
        </Card>
        <Card title="SMS tekstlar qo'shish" style={{ width: "50%" }}>
          <Card>
            <Flex vertical gap={10}>
              <Input placeholder="Sarlavhasi" />
              <TextArea rows={3} placeholder="Xabar" maxLength={350} />
              <Button type="primary">Saqlash</Button>
            </Flex>
          </Card>
          <Divider>Barcha SMS Tekstlar</Divider>
          <Row gutter={[16, 16]}>
            <Col>
              <Card>
                <Flex>
                  <div>
                    <Typography.Title level={4}>Lorem lreom</Typography.Title>
                    <Typography.Text>
                      Lorem Lorem, ipsum dolor sit amet consectetur adipisicing
                      elit. Autem repellat odit quaerat, soluta repellendus
                      dolorem, deleniti officia dolor laboriosam reiciendis quas
                      distinctio id sit laudantium aut nemo qui facere eius?
                    </Typography.Text>
                  </div>
                  <Space direction="vertical">
                    <Button type="text">
                      <Edit />
                    </Button>
                    <Button type="text" danger>
                      <Trash />
                    </Button>
                  </Space>
                </Flex>
              </Card>
            </Col>
          </Row>
        </Card>
      </Flex>
    </div>
  );
}

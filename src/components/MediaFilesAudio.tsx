import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Input,
  Popconfirm,
  Row,
  Spin,
  Typography,
  Upload,
} from "antd";
import { Save } from "lucide-react";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import AudioPlayerCustom from "./AudioPlayerCustom";
import useFetch from "../hooks/useFetch";
import { createMultipart } from "../services/api/crudApi";
import { UploadFile, UploadChangeParam } from "antd/es/upload/interface";

interface Entity {
  id?: string;
  productId?: string;
}

interface AudioEntity extends Entity {
  id: string;
  title: string;
  fileName: string;
}

interface PaginatedData<T> {
  pageCount: number;
  currentPage: number;
  total: number;
  data: T[];
}

export default function MediaFilesAudio() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [title, setTitle] = useState<string>("");

  const { data, loading, deleteData, refetch } = useFetch<AudioEntity>("/audios");

  const handleCancel = () => {
    setFileList([]);
    setTitle("");
    refetch();
  };

  const handleSave = async () => {
    if (!fileList.length || !title) {
      console.error("Please provide a title and upload an audio file.");
      return;
    }
    setLoadingCreate(true);
    try {
      const formData = new FormData();
      if (fileList[0]?.originFileObj) {
        formData.append("file", fileList[0].originFileObj);
      }
      formData.append("title", title);

      await createMultipart("/audios", formData);

      handleCancel();
      console.log("File and title successfully uploaded!");
    } catch (error) {
      console.error("Failed to upload file:", error);
    } finally {
      setLoadingCreate(false);
    }
  };

  const fileChange = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);
  };

  return (
    <>
      <Card title="Audio Fayllar Yuklash" style={{ width: "50%" }}>
        <Card>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  width: "100%",
                }}
              >
                <label htmlFor="title">Sarlavha</label>
                <Input
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <label htmlFor="file">Fayl</label>
                <Upload
                  fileList={fileList}
                  onChange={fileChange}
                  beforeUpload={() => false}
                  accept="audio/*"
                  maxCount={1}
                  id="file"
                >
                  <Button icon={<UploadOutlined />}>Yuklash</Button>
                </Upload>
              </div>
            </div>
            <Button
              type="primary"
              disabled={fileList.length === 0 || !title}
              size="large"
              icon={<Save size={18} />}
              onClick={handleSave}
              loading={loadingCreate}
            >
              Saqlash
            </Button>
          </div>
        </Card>
        <Divider>Barcha Audio Fayllar</Divider>
        <Row gutter={[26, 26]} style={{ marginTop: "20px" }}>
          {loading ? (
            <Col span={24}>
              <Spin indicator={<LoadingOutlined spin />} />
            </Col>
          ) : (
            (data as PaginatedData<AudioEntity>)?.data?.map(
              (audio: AudioEntity) => (
                <Col span={24} key={audio.id}>
                  <div
                    style={{
                      border: "1px solid #eeeeee",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography.Title
                      level={4}
                      style={{ paddingLeft: "12px", paddingTop: "8px" }}
                    >
                      {audio.title}
                    </Typography.Title>
                    <AudioPlayerCustom audio={audio.fileName} />
                    <Flex justify="end">
                      <Popconfirm
                        title="Audio faylni o'chirishni xohlaysizmi?"
                        onConfirm={() => deleteData(audio.id)}
                        okText="Tasdiqlayman"
                        cancelText="Bakor qilish"
                      >
                        <Button type="primary" danger style={{ margin: "5px" }}>
                          O'chirish
                        </Button>
                      </Popconfirm>
                    </Flex>
                  </div>
                </Col>
              )
            )
          )}
        </Row>
      </Card>
    </>
  );
}

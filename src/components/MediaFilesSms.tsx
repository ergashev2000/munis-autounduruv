import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Spin,
  Typography,
  message,
  Popconfirm,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import useFetch from "../hooks/useFetch";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { PaginatedData } from "../types/PaginatedType";

interface Entity {
  id?: string;
  productId?: string;
}

interface TextType extends Entity {
  title: string;
  text: string;
}

export default function MediaFilesSms() {
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data, loading, createData, updateData, deleteData } =
    useFetch<TextType>("/texts");

  const handleCancel = () => {
    setText("");
    setTitle("");
    setEditingId(null);
  };

  const handleSave = async () => {
    setLoadingCreate(true);
    if (!title || !text) {
      message.error("Iltimos ma'lumotlarni kiriting!");
      setLoadingCreate(false);
      return;
    }
    try {
      const dataObj = {
        title,
        text,
      };
      if (editingId) {
        await updateData(editingId, dataObj);
      } else {
        await createData(dataObj);
      }

      handleCancel();
    } catch (error) {
      console.error("Failed to save text:", error);
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleEdit = (sms: TextType) => {
    setTitle(sms.title);
    setText(sms.text);
    setEditingId(sms.id || null);
  };

  return (
    <>
      <Card title="SMS tekstlar qo'shish" style={{ width: "50%" }}>
        <Card>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Input
              placeholder="Sarlavhasi"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <TextArea
              rows={3}
              placeholder="Xabar"
              maxLength={350}
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <Button type="primary" onClick={handleSave} loading={loadingCreate}>
              {editingId ? "Yangilash" : "Saqlash"}
            </Button>
          </Space>
        </Card>
        <Divider>Barcha SMS Tekstlar</Divider>
        <Row gutter={[16, 16]}>
          {loading ? (
            <Col span={24}>
              <Spin indicator={<LoadingOutlined spin />} />
            </Col>
          ) : (
            (data as PaginatedData<TextType>)?.data?.map((sms: TextType) => (
              <Col span={24} key={sms.id}>
                <Card style={{ width: "100%" }}>
                  <Row justify="space-between">
                    <Col>
                      <Typography.Title level={4}>{sms.title}</Typography.Title>
                      <Typography.Text>{sms.text}</Typography.Text>
                    </Col>
                    <Col>
                      <Space direction="vertical">
                        <Button type="text" onClick={() => handleEdit(sms)}>
                          <Edit />
                        </Button>
                        <Popconfirm
                          title="O'chirishni xohlaysizmi?"
                          onConfirm={() => deleteData(sms.id || "")}
                          okText="Tasdiqlayman"
                          cancelText="Bekor qilish"
                        >
                          <Button type="text" danger>
                            <Trash />
                          </Button>
                        </Popconfirm>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Card>
    </>
  );
}

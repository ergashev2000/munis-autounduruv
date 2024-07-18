import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Table, Button, Space, Select, Flex } from "antd";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import CallsAddModal from "./CallsAddModal";
import AudioFileAdd from "./AudioFileAdd";
import { Plus, PlusCircle } from "lucide-react";

interface DataType {
  key: React.Key;
  name: string;
  clientCount: number;
  type: string;
  dueDays: number;
  deadline: string;
  status: string;
  actions?: string;
}

const CallsTable: React.FC = () => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    } as TablePaginationConfig,
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "order",
      width: "3%",
      render: (_, __, index: number) => {
        const currentPage = tableParams.pagination?.current ?? 1;
        const pageSize = tableParams.pagination?.pageSize ?? 10;
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Toyifa nomi",
      dataIndex: "name",
      width: "20%",
      ellipsis: true,
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Toyifa",
      dataIndex: "type",
      width: "15%",
    },
    {
      title: "Qarzdor kunlar",
      dataIndex: "dueDays",
      width: "10%",
    },
    {
      title: "Qarzdorlar soni",
      dataIndex: "clientCount",
      width: "15%",
    },
    {
      title: "Amal qilish muddati",
      dataIndex: "deadline",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      align: "center",
      render: (_, record) => (
        <span
          style={{
            border: "1px solid #1f8a2e",
            borderRadius: "4px",
            backgroundColor: "#1f8a2e",
            color: "white",
            paddingInline: "14px",
          }}
        >
          {record.status}
        </span>
      ),
    },
    {
      title: "Harakatlar",
      dataIndex: "actions",
      width: "15%",
      render: (_, record) => (
        <Space size={"large"}>
          <Select defaultValue="start" style={{ width: 200 }}>
            <Select.Option value="start">
              <Space>
                <PlayCircleOutlined style={{ color: "#52c41a" }} /> Boshlash
              </Space>
            </Select.Option>
            <Select.Option value="pause">
              <Space>
                <PauseCircleOutlined style={{ color: "#FF8C00" }} /> To'xtatish
              </Space>
            </Select.Option>
            <Select.Option value="end">
              <Space>
                <CloseCircleOutlined style={{ color: "#b81212" }} /> Tugatish
              </Space>
            </Select.Option>
          </Select>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "Yashil ro'yhat",
      type: "Oq",
      dueDays: 30,
      deadline: "01.01.2024",
      status: "Faol",
      clientCount: 210,
    },
    {
      key: "2",
      name: "Yashil ro'yhat",
      type: "Oq",
      dueDays: 30,
      deadline: "01.01.2024",
      status: "Faol",
      clientCount: 102,
    },
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      ...tableParams,
      pagination,
    });
  };

  return (
    <>
      <Flex justify="end" gap={60} style={{ marginBottom: "20px" }}>
        <Space>
          <Button>
            <DownloadOutlined /> Export
          </Button>
          <CallsAddModal />
        </Space>
      </Flex>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </>
  );
};

export default CallsTable;

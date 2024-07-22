import React, { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

import { Table, Button, Space, Select, Flex } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import { CallSettings } from "../types/CallSettingsTypes";
import useFetch from "../hooks/useFetch";
import { debounce } from "lodash";
import { PaginatedData } from "../types/PaginatedType";
import CallsAddModal from "./CallsAddModal";

const CallsTable: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [initialId, setInitialId] = useState<CallSettings | null>(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: initialPage,
      pageSize: 10,
    },
  });

  const { data, loading } = useFetch("/calls", {
    search: searchText,
    page: tableParams.pagination.current,
    pageSize: tableParams.pagination.pageSize,
  });

  const handleSearchChange = debounce((value: string) => {
    setSearchText(value);
  }, 100);

  const handleEdit = (record: CallSettings) => {
    setInitialId(record);
    setOpenModal(true);
  };

  const handleTableChange: TableProps<CallSettings>["onChange"] =
    pagination => {
      const newPagination = {
        current: pagination?.current || 1,
        pageSize: pagination?.pageSize || 10,
      };

      setTableParams({
        pagination: newPagination,
      });

      navigate({
        pathname: location.pathname,
        search: createSearchParams({
          page: newPagination.current.toString(),
        }).toString(),
      });
    };

  useEffect(() => {
    if (tableParams.pagination.current > 1) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({
          page: tableParams.pagination.current.toString(),
        }).toString(),
      });
    }
  }, [tableParams.pagination, navigate, location.pathname]);

  const columns: TableColumnsType<CallSettings> = [
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
      dataIndex: "minCurrentDebt",
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

  return (
    <>
      <CallsAddModal open={openModal} setOpen={setOpenModal} />
      <Flex justify="end" gap={60} style={{ marginBottom: "20px" }}>
        <Space>
          <Button>
            <DownloadOutlined /> Export
          </Button>
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Qo'ng'iroqlar qo'shish
          </Button>
        </Space>
      </Flex>
      <Table
        dataSource={
          Array.isArray(data)
            ? data
            : (data as PaginatedData<CallSettings>)?.data
        }
        pagination={
          tableParams.pagination &&
          (data as PaginatedData<CallSettings>)?.pageCount
            ? {
                ...tableParams.pagination,
                total: (data as PaginatedData<CallSettings>)?.total || 0,
              }
            : false
        }
        loading={loading}
        bordered
        columns={columns}
        onChange={handleTableChange}
      />
    </>
  );
};

export default CallsTable;

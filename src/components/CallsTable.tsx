import React, { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Table, Button, Space, Select, Input, Row, Col } from "antd";
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

const { Option } = Select;

const CallsTable: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: initialPage,
      pageSize: 10,
    },
  });

  const { data, loading, refetch } = useFetch("/calls", {
    search: searchText,
    page: tableParams.pagination.current,
    pageSize: tableParams.pagination.pageSize,
  });

  const handleSearchChange = debounce((value: string) => {
    setSearchText(value);
  }, 100);

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
      width: "5%",
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
      width: "15%",
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
      render: (_, record) =>
        record.status ? (
          <span
            style={{
              border: "1px solid #1f8a2e",
              borderRadius: "4px",
              backgroundColor: "#1f8a2e",
              color: "white",
              paddingInline: "14px",
            }}
          >
            Faol
          </span>
        ) : (
          <span
            style={{
              border: "1px solid #1f8a2e",
              borderRadius: "4px",
              backgroundColor: "#1f8a2e",
              color: "white",
              paddingInline: "14px",
            }}
          >
            Faol
          </span>
        ),
    },
    {
      title: "Harakatlar",
      dataIndex: "actions",
      width: "20%",
      render: (_, record) => (
        <Space size="large">
          <Select defaultValue="start" style={{ width: 200 }}>
            <Option value="start">
              <Space>
                <PlayCircleOutlined style={{ color: "#52c41a" }} /> Boshlash
              </Space>
            </Option>
            <Option value="pause">
              <Space>
                <PauseCircleOutlined style={{ color: "#FF8C00" }} /> To'xtatish
              </Space>
            </Option>
            <Option value="end">
              <Space>
                <CloseCircleOutlined style={{ color: "#b81212" }} /> Tugatish
              </Space>
            </Option>
          </Select>
        </Space>
      ),
    },
  ];

  return (
    <>
      <CallsAddModal
        open={openModal}
        setOpen={setOpenModal}
        refetch={refetch}
      />
      <Row style={{ marginBottom: "20px" }}>
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Input.Search
            placeholder="Search by name"
            onSearch={handleSearchChange}
            onChange={e => handleSearchChange(e.target.value)}
            style={{ width: 300 }}
          />
          <Space>
            <Button>
              <DownloadOutlined /> Export
            </Button>
            <Button type="primary" onClick={() => setOpenModal(true)}>
              Qo'ng'iroqlar qo'shish
            </Button>
          </Space>
        </Col>
      </Row>
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

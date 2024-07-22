import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { Button, Flex, Input, Popconfirm, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { FilePenLine, Trash2 } from "lucide-react";
import type { TableProps } from "antd";

import { PaginatedData } from "../types/PaginatedType";
import { EmployeesType } from "../types/EmployeesType";
import useFetch from "../hooks/useFetch";
import EmployeesModal from "./EmployeesModal";

import { AccessIcon, NotAccessIcon } from "../assets/icons/svgs";

const EmployeesTable: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [initialData, setInitialData] = useState<EmployeesType | null>(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: initialPage,
      pageSize: 10,
    },
  });

  const { data, loading, createData, updateData, deleteData, error } =
    useFetch<EmployeesType>("/users", {
      search: searchText,
      page: tableParams.pagination.current,
      pageSize: tableParams.pagination.pageSize,
    });

  const handleSearchChange = debounce((value: string) => {
    setSearchText(value);
  }, 100);

  const handleEdit = (record: EmployeesType) => {
    setInitialData(record);
    setOpenModal(true);
  };

  const handleTableChange: TableProps<EmployeesType>["onChange"] =
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

  const columns: ColumnsType<EmployeesType> = [
    {
      title: "№",
      dataIndex: "order",
      width: "0.1%",
      align: "center",
      render: (_, __, index: number) => {
        const currentPage = tableParams.pagination?.current ?? 1;
        const pageSize = tableParams.pagination?.pageSize ?? 10;
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "F.I.SH",
      dataIndex: "fullName",
      width: "10%",
      render: val => <span style={{ color: "#1677FF" }}>{val}</span>,
    },
    {
      title: "Lavozim nomi",
      dataIndex: "position",
      width: "10%",
    },
    {
      title: "Amal bajarish",
      dataIndex: "action",
      width: "10%",
      align: "center",
      render: (action: boolean) =>
        action ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Excel",
      dataIndex: "excel",
      width: "10%",
      align: "center",
      render: (excel: boolean) => (excel ? <AccessIcon /> : <NotAccessIcon />),
    },
    {
      title: "Telefon raqami",
      dataIndex: "phone",
      width: "10%",
    },
    {
      title: "Harakatlar",
      key: "action",
      width: "20%",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<FilePenLine />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Ishonchingiz komilmi?"
            onConfirm={() => deleteData(record.id!)}
            okText="Ha"
            cancelText="Yo'q"
          >
            <Button danger icon={<Trash2 />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <EmployeesModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onCreate={createData}
        onUpdate={updateData}
        initialData={initialData}
        setInitialData={setInitialData}
        error={error}
        loading={loading}
      />
      <Flex justify="space-between" align="center" style={{ marginBottom: "10px" }}>
        <Input
          placeholder="Qidirish"
          prefix={<SearchOutlined />}
          onChange={e => handleSearchChange(e.target.value)}
          style={{width: "400px"}}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenModal(true)}
        >
          Qo'shish
        </Button>
      </Flex>
      <Table
        columns={columns}
        rowKey={record => record.id || ""}
        dataSource={
          Array.isArray(data)
            ? data
            : (data as PaginatedData<EmployeesType>)?.data
        }
        pagination={
          tableParams.pagination &&
          (data as PaginatedData<EmployeesType>)?.pageCount
            ? {
                ...tableParams.pagination,
                total: (data as PaginatedData<EmployeesType>)?.total || 0,
              }
            : false
        }
        loading={loading}
        onChange={handleTableChange}
        bordered
      />
    </>
  );
};

export default EmployeesTable;

import React, { useEffect, useRef, useState } from "react";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import type { InputRef, TableProps } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";
import { AccessIcon, NotAccessIcon } from "../assets/icons/svgs";
import { DataType, TableParams } from "../types/EmployeesTable";
import { FilePenLine, Trash2 } from "lucide-react";
import { PositionsType } from "types/PositionsType";
import useFetch from "../hooks/useFetch";
import { debounce } from "lodash";

const PositionsTable: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [initialData, setInitialData] = useState<PositionsType>();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { data, loading, createData, updateData, deleteData, refetch } =
    useFetch<PositionsType>("/positions", {
      search: searchText,
      page: tableParams.pagination.current,
      pageSize: tableParams.pagination.pageSize,
    });

  const handleSearchChange = debounce((value: string) => {
    setSearchText(value);
  }, 100);

  const handleEdit = (record: PositionsType) => {
    setInitialData(record);
    setOpenModal(true);
  };

  const handleDelete = async (id: string | undefined) => {
    try {
      if (id) {
        await deleteData(id);
      } else {
        message.error("O'chirishda muommo bor!");
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleTableChange: TableProps<PositionsType>["onChange"] =
    pagination => {
      setTableParams({
        pagination: {
          current: pagination?.current || 1,
          pageSize: pagination?.pageSize || 10,
        },
      });
    };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "order",
      width: "0%",
      render: (_, __, index: number) => {
        const currentPage = tableParams.pagination?.current ?? 1;
        const pageSize = tableParams.pagination?.pageSize ?? 10;
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "F.I.SH",
      dataIndex: "fullname",
      width: "10%",
      render: val => <span style={{ color: "#1677FF" }}>{val}</span>,
    },
    {
      title: "Lavozim nomi",
      dataIndex: "position",
      width: "10%",
    },
    {
      title: "Tug'ilgan sana",
      dataIndex: "birthday",
      width: "10%",
    },
    {
      title: "Kiritish",
      dataIndex: ["access", "is_enter"],
      width: "10%",
      align: "center",
      render: (is_enter: boolean) =>
        is_enter ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Harakat",
      dataIndex: ["access", "is_action"],
      width: "10%",
      align: "center",
      render: (is_action: boolean) =>
        is_action ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Hisobot",
      dataIndex: ["access", "is_report"],
      width: "10%",
      align: "center",
      render: (is_report: boolean) =>
        is_report ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Excelga eksport qilish",
      dataIndex: ["access", "is_excel"],
      width: "10%",
      align: "center",
      render: (is_excel: boolean) =>
        is_excel ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Yaratildi",
      dataIndex: "created_by_user",
      width: "10%",
    },
    {
      title: "Yaratilgan vaqt",
      dataIndex: "created_at",
      width: "10%",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "4%",
      align: "center",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" style={{ color: "red" }}>
              <Trash2 />
            </Button>
          </Popconfirm>
          <Button type="link">
            <FilePenLine />
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setData(data);
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
      },
    });
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);


  return (
    <Table
      columns={columns}
      rowKey={"id"}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
      bordered
    />
  );
};

export default PositionsTable;

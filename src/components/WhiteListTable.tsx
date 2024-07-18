import React, { useEffect, useRef, useState } from "react";
import { Button, Flex, Input, Popconfirm, Space, Table } from "antd";
import type { InputRef, TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { TableParams } from "../types/EmployeesTable";
import { FilePenLine, Plus, Trash2 } from "lucide-react";
import WhiteListModal from "./WhiteListModal";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";

interface DataType {
  id: number;
  fullname: string;
  phone: string;
  created_by_user: string;
  status: boolean;
  comment: string;
  created_at: string;
  updated_at: string;
}

const exampleData: DataType[] = [
  {
    id: 1,
    fullname: "Islomjon Ergashev",
    phone: "+998908884433",
    created_by_user: "Islomjon Ergahev",
    status: true,
    comment: "lorem lorem lorem",
    created_at: "2023-01-01 10:00",
    updated_at: "2023-01-01 10:00",
  },
];

const PositionsTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleEdit = (record: DataType) => {
    console.log("Edit record:", record);
  };

  const handleDelete = (id: number) => {
    console.log("Delete record with ID:", id);
  };

  const searchInput = useRef<InputRef | null>(null);

  const handleSearch = async (value: string) => {
    setSearchText(value);
    setLoading(true);

    try {
      const response = await axios.get<DataType[]>("/api/your-endpoint", {
        params: {
          search: value,
        },
      });

      const rawData = response.data;
      if (Array.isArray(rawData)) {
        setData(rawData);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: rawData.length,
          },
        });
      } else {
        console.error("Unexpected API response format:", rawData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "order",
      width: "0.1%",
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
      title: "Telefon Raqami",
      dataIndex: "phone",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "8%",
      align: "center",
      render: (status: boolean) =>
        status ? (
          <div
            style={{
              color: "#fff",
              backgroundColor: "black",
              fontWeight: "500",
              borderRadius: "4px",
              paddingBlock: "2px",
            }}
          >
            To'xtatilgan
          </div>
        ) : (
          <div
            style={{
              color: "#fff",
              backgroundColor: "green",
              fontWeight: "500",
              borderRadius: "4px",
              paddingBlock: "2px",
            }}
          >
            Faol
          </div>
        ),
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
      title: "Izoh",
      dataIndex: "comment",
      width: "20%",
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
          <Button type="link" onClick={() => handleEdit(record)}>
            <FilePenLine />
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<DataType[]>("/api/your-endpoint");
        const rawData = response.data;

        if (Array.isArray(rawData)) {
          setData(rawData);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: rawData.length,
            },
          });
        } else {
          console.error("Unexpected API response format:", rawData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

  const handleTableChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => handleSearch(e.target.value)}
          style={{ width: 500 }}
        />
        <Button type="primary" onClick={() => setOpenModal(true)}>
          <Plus />
          Oq list qo'shish
        </Button>
      </Flex>
      <WhiteListModal openModal={openModal} setOpenModal={setOpenModal} />
      <Table
        columns={columns}
        rowKey={record => record.id.toString()}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        bordered
      />
    </>
  );
};

export default PositionsTable;

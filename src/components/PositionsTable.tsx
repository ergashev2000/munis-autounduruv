import React, { useEffect, useState } from "react";
import { Button, Flex, Popconfirm, Space, Table, Input } from "antd";
import type { TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";

import { DataType, TableParams } from "../types/EmployeesTable";
import { FilePenLine, Trash2 } from "lucide-react";

const exampleData: DataType[] = [
  {
    id: 1,
    position: "Admin",
    users_count: 1,
    settings: true,
    reports: true,
    card_binding: true,
    access_branchs: [
      {
        name: "Olmaliq",
        key: "olmaliq-12",
      },
    ],
    created_by_user: "Islomjon Ergahev",
    created_at: "2023-01-01 10:00",
  },
  {
    id: 2,
    position: "Foydalanuvchi",
    users_count: 23,
    settings: false,
    reports: true,
    card_binding: true,
    access_branchs: [
      {
        name: "Olmaliq",
        key: "olmaliq-12",
      },
    ],
    created_by_user: "Islomjon Ergahev1",
    created_at: "2024-01-01 12:00",
  },
];

const PositionsTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<
    [moment.Moment, moment.Moment] | null
  >(null);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleEdit = (record: { id: string }) => {};
  const handleDelete = (id: string) => {};

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
      title: "Lavozim",
      dataIndex: "position",
      width: "15%",
    },
    {
      title: "Foydalanuvchilar soni",
      dataIndex: "users_count",
      width: "10%",
    },
    {
      title: "Sozlamalar",
      dataIndex: "settings",
      width: "10%",
      render: value =>
        value ? (
          <span className="active-access">Active</span>
        ) : (
          <span className="disabled-access">Disabled</span>
        ),
    },
    {
      title: "Hisobotlar",
      dataIndex: "reports",
      width: "10%",
      render: value =>
        value ? (
          <span className="active-access">Active</span>
        ) : (
          <span className="disabled-access">Disabled</span>
        ),
    },
    {
      title: "Karta bog'lash",
      dataIndex: "card_binding",
      width: "10%",
      render: value =>
        value ? (
          <span className="active-access">Active</span>
        ) : (
          <span className="disabled-access">Disabled</span>
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
      title: "Actions",
      dataIndex: "actions",
      width: "2%",
      align: "center",
      render: (_, record: { id: string }) => (
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

  const fetchData = () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setData(exampleData);
        setFilteredData(exampleData);
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchText, dateRange, data]);

  const filterData = () => {
    let filtered = data;

    if (searchText) {
      filtered = filtered.filter(item =>
        item.position.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (dateRange) {
      const [start, end] = dateRange;
      filtered = filtered.filter(item =>
        moment(item.created_at).isBetween(start, end, undefined, "[]")
      );
    }

    setFilteredData(filtered);
  };

  const handleTableChange: TableProps["onChange"] = (
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
      setFilteredData([]);
    }
  };

  return (
    <>
      <Flex justify="space-between" style={{ paddingBottom: "20px" }}>
        <Input
          placeholder="Qidirish"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
        />
        <Button type="primary">
          <PlusOutlined /> Lavozim qo'shish
        </Button>
      </Flex>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={filteredData}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        bordered
      />
    </>
  );
};

export default PositionsTable;

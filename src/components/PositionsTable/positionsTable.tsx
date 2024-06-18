import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import type { InputRef, TableProps } from "antd";
import qs from "qs";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnType, ColumnsType } from "antd/es/table";

import { AccessIcon, NotAccessIcon } from "../../assets/icons/svgs";
import { DataType, TableParams } from "./types";
import { getRandomuserParams } from "./handlers";

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
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleEdit = () => {};
  const handleDelete = () => {};

  const searchInput = useRef<InputRef | null>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string | number | symbol | undefined
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex ? String(dataIndex) : "");
  };

  const handleReset = () => {
    setSearchText("");
    setSearchedColumn("");
  };

  const getColumnSearchProps = (
    dataIndex: keyof DataType
  ): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput.current = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={handleReset} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
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
      title: "Lavozim",
      dataIndex: "position",
      ...getColumnSearchProps("position"),
      width: "15%",
    },
    {
      title: "Foydalanuvchilar soni",
      dataIndex: "users_count",
      width: "10%",
      sorter: (a, b) => (a.settings ? 1 : -1) - (b.settings ? 1 : -1),
    },
    {
      title: "Sozlamalar",
      dataIndex: "settings",
      width: "10%",
      sorter: (a, b) => (a.settings ? 1 : -1) - (b.settings ? 1 : -1),
      render: (settings: string) =>
        settings ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Hisobotlar",
      dataIndex: "reports",
      width: "10%",
      sorter: (a, b) => (a.settings ? 1 : -1) - (b.settings ? 1 : -1),
      render: (settings: string) =>
        settings ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Karta bog'lash",
      dataIndex: "card_binding",
      width: "10%",
      sorter: (a, b) => (a.settings ? 1 : -1) - (b.settings ? 1 : -1),
      render: (settings: string) =>
        settings ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Yaratildi",
      dataIndex: "created_by_user",
      width: "10%",
      sorter: (
        a: { created_by_user: string },
        b: { created_by_user: string }
      ) => a.created_by_user.localeCompare(b.created_by_user),
    },
    {
      title: "Yaratilgan vaqt",
      dataIndex: "created_at",
      width: "10%",
      ...getColumnSearchProps("created_at"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "10%",
      render: (_, record: { id: string }) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="primary">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then(res => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

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
      setData([]);
    }
  };

  return (
    <Table
      columns={columns}
      rowKey={record => record.id}
      dataSource={exampleData}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
      bordered
    />
  );
};

export default PositionsTable;

import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import type { InputRef, TableProps } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnType, ColumnsType } from "antd/es/table";
import { AccessIcon, NotAccessIcon } from "../../assets/icons/svgs";
import { DataType, TableParams } from "./types";

const exampleData: DataType[] = [
  {
    id: 1,
    fullname: "Islomjon Ergashev",
    access: {
      is_enter: true,
      is_action: false,
      is_report: true,
      is_excel: true,
    },
    access_branches: [
      {
        name: "Olmaliq",
        key: "olmaliq-12",
      },
      {
        name: "Quvasoy",
        key: "quvasoy-1",
      },
    ],
    login: "admin",
    password: "admin",
    birthday: "2023-01-01",
    created_by_user: "Islomjon Ergahev",
    created_at: "2023-01-01 10:00",
    updated_at: "2023-01-01 10:00",
    position: "Administrator",
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

  const handleEdit = (record: DataType) => {
    console.log("Edit record:", record);
  };

  const handleDelete = (id: number) => {
    console.log("Delete record with ID:", id);
  };

  const searchInput = useRef<InputRef | null>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: keyof DataType
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
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
            handleSearch(selectedKeys as string[], confirm, String(dataIndex))
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, String(dataIndex))
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
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
      ...getColumnSearchProps("fullname"),
      width: "10%",
    },
    {
      title: "Lavozim nomi",
      dataIndex: "position",
      ...getColumnSearchProps("position"),
      width: "10%",
    },
    {
      title: "Tug'ilgan sana",
      dataIndex: "birthday",
      width: "10%",
      ...getColumnSearchProps("birthday"),
    },
    {
      title: "Kiritish",
      dataIndex: ["access", "is_enter"],
      width: "10%",
      render: (is_enter: boolean) =>
        is_enter ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Harakat",
      dataIndex: ["access", "is_action"],
      width: "10%",
      render: (is_action: boolean) =>
        is_action ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Hisobot",
      dataIndex: ["access", "is_report"],
      width: "10%",
      render: (is_report: boolean) =>
        is_report ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Excelga eksport qilish",
      dataIndex: ["access", "is_excel"],
      width: "10%",
      render: (is_excel: boolean) =>
        is_excel ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Yaratildi",
      dataIndex: "created_by_user",
      width: "10%",
      ...getColumnSearchProps("created_by_user"),
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
      render: (_, record) => (
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

  useEffect(() => {
    setData(exampleData);
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: exampleData.length,
      },
    });
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
    <Table
      columns={columns}
      rowKey={record => record.id.toString()}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
      bordered
    />
  );
};

export default PositionsTable;

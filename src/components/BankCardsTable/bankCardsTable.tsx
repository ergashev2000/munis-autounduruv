import React, { useState, useRef } from "react";
import { Table, Input, Button, Space, InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { FilterDropdownProps } from "antd/es/table/interface";
import moment from "moment";

interface TableData {
  key: string;
  fullName: string;
  contractId: string;
  phoneNumber: string;
  cardNumber: string;
  cardExpiryDate: string;
  filial: string;
}

const data: TableData[] = [
  {
    key: "1",
    fullName: "John Doe",
    contractId: "C12345",
    phoneNumber: "+99890 123 45 67",
    cardNumber: "4111 1111 1111 1111",
    cardExpiryDate: "12/24",
    filial: "Olmaliq",
  },
];

const CustomTable: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: keyof TableData
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex.toString());
  };

  const handleReset = (clearFilters: (() => void) | undefined) => {
    if (clearFilters) {
      clearFilters();
      setSearchText("");
    }
  };

  const getColumnSearchProps = (
    dataIndex: keyof TableData,
    placeholder: string
  ) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={placeholder}
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
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible && searchInput.current) {
        setTimeout(() => searchInput?.current?.select(), 100);
      }
    },
    render: (text: string) =>
      searchedColumn === dataIndex.toString() ? (
        <span style={{ backgroundColor: "#ffc069" }}>{text}</span>
      ) : (
        text
      ),
  });

  const columns: ColumnsType<TableData> = [
    {
      title: "Ism va familiya",
      dataIndex: "fullName",
      key: "fullName",
      ...getColumnSearchProps("fullName", "Search Full Name"),
    },
    {
      title: "Kontrakt ID",
      dataIndex: "contractId",
      key: "contractId",
      ...getColumnSearchProps("contractId", "Search Contract ID"),
    },
    {
      title: "Telefon raqam",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ...getColumnSearchProps("phoneNumber", "Search Phone Number"),
    },
    {
      title: "Karta raqami",
      dataIndex: "cardNumber",
      key: "cardNumber",
      ...getColumnSearchProps("cardNumber", "Search Card Number"),
    },
    {
      title: "Muddati",
      dataIndex: "cardExpiryDate",
      key: "cardExpiryDate",
      render: (text: string) => moment(text, "MM/YY").format("MM/YY"),
      sorter: (a: TableData, b: TableData) =>
        moment(a.cardExpiryDate, "MM/YY").unix() -
        moment(b.cardExpiryDate, "MM/YY").unix(),
    },
    {
      title: "Filial",
      dataIndex: "filial",
      key: "filial",
      filters: [
        { text: "Farg'ona", value: "Farg'ona" },
        { text: "Olmaliq", value: "Olmaliq" },
      ],
      onFilter: (
        value: string | number | boolean | bigint | undefined,
        record: TableData
      ) => {
        if (
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean"
        ) {
          return record.filial === value.toString();
        }
        return false;
      },
    },
  ];

  const filteredData = searchText
    ? data.filter(item =>
        Object.values(item).some(value =>
          value?.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      )
    : data;
  return (
    <Table<TableData>
      columns={columns}
      dataSource={filteredData}
      pagination={{ pageSize: 50 }}
      scroll={{ x: true }}
      bordered
    />
  );
};

export default CustomTable;

import React, { useState, useEffect } from "react";
import { Table, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { SorterResult } from "antd/es/table/interface";
import axios from "axios";

interface TableData {
  key: string;
  fullName: string;
  contractId: string;
  phoneNumber: string;
  cardNumber: string;
  cardExpiryDate: string;
  filial: string;
}

const CustomTable: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 50,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, searchTerm]);

  const fetchData = async (
    sortField: string | null = null,
    sortOrder: string | null = null
  ) => {
    setLoading(true);

    try {
      const params: Record<string, any> = {
        sortField,
        sortOrder,
        searchTerm,
        page: pagination.current,
        pageSize: pagination.pageSize,
      };

      const response = await axios.get("/api/data", {
        params,
      });
      setData(response.data.items);
      setPagination(prev => ({
        ...prev,
        total: response.data.totalCount,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
    setLoading(false);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<TableData> | SorterResult<TableData>[]
  ) => {
    const sortField: string | null = Array.isArray(sorter)
      ? (sorter[0]?.field as string)
      : (sorter?.field as string);
    const sortOrder: string | null = Array.isArray(sorter)
      ? sorter[0]?.order ?? null
      : sorter?.order ?? null;

    setPagination(pagination);
    fetchData(sortField, sortOrder);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPagination({ ...pagination, current: 1 });
  };

  const columns: ColumnsType<TableData> = [
    {
      title: "Ism va familiya",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Kontrakt ID",
      dataIndex: "contractId",
      key: "contractId",
    },
    {
      title: "Telefon raqam",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Karta raqami",
      dataIndex: "cardNumber",
      key: "cardNumber",
    },
    {
      title: "Muddati",
      dataIndex: "cardExpiryDate",
      key: "cardExpiryDate",
    },
    {
      title: "Filial",
      dataIndex: "filial",
      key: "filial",
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={e => handleSearch(e.target.value)}
          style={{ width: 400 }}
          prefix={<SearchOutlined />}
        />
      </Space>
      <Table<TableData>
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: true }}
        bordered
      />
    </>
  );
};

export default CustomTable;

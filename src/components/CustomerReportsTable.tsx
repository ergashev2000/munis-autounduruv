import React, { useEffect, useState } from "react";
import axios from "axios";

import { Flex, Input, Table } from "antd";
import type { TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

import { TableParams } from "../types/EmployeesTable";

interface DataType {
  id: string;
  fullname: string;
  phone: string;
  pnfl: string;
  unikal: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

// const exampleData: DataType[] = [
//   {
//     id: "3232",
//     fullname: "Islomjon Ergashev",
//     phone: "+998908554433",
//     pnfl: "2131231",
//     unikal: "S_2112",
//     status: true,
//     created_at: "2023-01-01 10:00",
//     updated_at: "2023-01-01 10:00",
//   },
// ];

const UserReportsTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  // const [searchedColumn, setSearchedColumn] = useState<string>("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // const handleEdit = (record: DataType) => {
  //   console.log("Edit record:", record);
  // };

  // const handleDelete = (id: number) => {
  //   console.log("Delete record with ID:", id);
  // };

  // const searchInput = useRef<InputRef | null>(null);

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
      title: "ID",
      dataIndex: "id",
      width: "1%",
      align: "center",
    },
    {
      title: "F.I.SH",
      dataIndex: "fullname",
      width: "10%",
      render: val => <span style={{ color: "#1677FF" }}>{val}</span>,
    },
    {
      title: "Telefon raqami",
      dataIndex: "phone",
      width: "10%",
    },
    {
      title: "PNFL",
      dataIndex: "pnfl",
      width: "10%",
    },
    {
      title: "Unikal",
      dataIndex: "unikal",
      width: "10%",
    },
    {
      title: "Yaratilgan vaqt",
      dataIndex: "created_at",
      width: "10%",
      align: "center",
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
              paddingBlock: "3px",
              width: "100px",
              marginInline: "auto",
            }}
          >
            Yopilgan
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
      <Flex align="center" style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => handleSearch(e.target.value)}
          style={{ width: "500px" }}
        />
      </Flex>
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

export default UserReportsTable;

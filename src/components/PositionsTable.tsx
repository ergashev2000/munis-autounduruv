import React, { useEffect, useState } from "react";
import { Button, Space, Table, Input, Popconfirm, Flex, message } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { FilePenLine, Trash2 } from "lucide-react";
import { AccessIcon, NotAccessIcon } from "../assets/icons/svgs";
import PositionsModal from "./PositionsModal";
import useFetch from "../hooks/useFetch";
import { PositionType } from "../types/PositionsType";
import { debounce } from "lodash";

const PositionsTable: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [initialData, setInitialData] = useState<PositionType>();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { data, loading, createData, updateData, deleteData } =
    useFetch<PositionType>("/positions", {
      search: searchText,
      page: tableParams.pagination.current,
      pageSize: tableParams.pagination.pageSize,
    });

  const handleSearchChange = debounce((value: string) => {
    setSearchText(value);
  }, 100);

  const handleEdit = (record: PositionType) => {
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

  const handleTableChange: TableProps<PositionType>["onChange"] =
    pagination => {
      setTableParams({
        pagination: {
          current: pagination?.current || 1,
          pageSize: pagination?.pageSize || 10,
        },
      });
    };

  const columns: ColumnsType<PositionType> = [
    {
      title: "№",
      dataIndex: "order",
      width: "0.01%",
      align: "center",
      render: (_, __, index: number) => {
        const currentPage = tableParams.pagination?.current ?? 1;
        const pageSize = tableParams.pagination?.pageSize ?? 10;
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Lavozim",
      dataIndex: "name",
      key: "name",
      render: text => <span style={{ color: "#1677FF" }}>{text}</span>,
    },
    {
      title: "Sozlamalar",
      dataIndex: "settings",
      key: "settings",
      align: "center",
      render: (_, record) =>
        record.settings ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Hisobotlar",
      dataIndex: "reports",
      key: "reports",
      align: "center",
      render: (_, record) =>
        record.reports ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Karta bog'lash",
      dataIndex: "cardActions",
      key: "cardActions",
      align: "center",
      render: (_, record) =>
        record.cardActions ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Dashboard",
      dataIndex: "dashboard",
      key: "dashboard",
      align: "center",
      render: (_, record) =>
        record.dashboard ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Admin hisoboti",
      dataIndex: "adminReports",
      key: "adminReports",
      align: "center",
      render: (_, record) =>
        record.adminReports ? <AccessIcon /> : <NotAccessIcon />,
    },
    {
      title: "Actions",
      key: "Harakatlar",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)} icon={<FilePenLine />} />
          <Popconfirm
            title="Bu lavozimni o'chirishni tasdiqlaysizmi?"
            onConfirm={() => handleDelete(record.id)}
            okText={"Tasdiqlayman"}
            cancelText={"Bekor qilish"}
          >
            <Button icon={<Trash2 />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleCreate = async (newData: PositionType) => {
    try {
      await createData(newData);
      setOpenModal(false);
    } catch (error) {
      console.error("Failed to create:", error);
    }
  };

  const handleUpdate = async (
    id: string | undefined,
    updatedData: PositionType
  ) => {
    try {
      if (id) {
        await updateData(id, updatedData);
      } else {
        message.error("Yangilashda xato bor!");
      }
      setOpenModal(false);
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  return (
    <>
      <PositionsModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        initialData={initialData}
        setInitialData={setInitialData}
      />
      <Flex
        justify="space-between"
        align="center"
        style={{
          paddingBottom: "20px",
          width: "100%",
        }}
      >
        <Input
          placeholder="Search"
          value={searchText}
          onChange={e => handleSearchChange(e.target.value)}
          prefix={<SearchOutlined />}
          style={{ width: 400 }}
        />
        <Button type="primary" onClick={() => setOpenModal(true)}>
          <PlusOutlined /> Lavozim qo'shish
        </Button>
      </Flex>
      <Table
        columns={columns}
        dataSource={Array.isArray(data) ? data : []}
        rowKey="id"
        loading={loading}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </>
  );
};

export default PositionsTable;

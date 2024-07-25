import React, { useState } from "react";
import { Button, Space, Table, Input, Popconfirm, Flex, message } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { FilePenLine, Trash2 } from "lucide-react";
import { AccessIcon, NotAccessIcon } from "../assets/icons/svgs";
import PositionsModal from "./PositionsModal";
import useFetch from "../hooks/useFetch";
import { PositionType } from "../types/PositionsType";
import { debounce } from "lodash";
import { alertSuccess } from "@utils/toastify";

const PositionsTable: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [initialData, setInitialData] = useState<PositionType>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { data, loading, createData, updateData, deleteData } =
    useFetch<PositionType>("/positions", {
      search: searchText,
      page: pagination.current,
      pageSize: pagination.pageSize,
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
      await deleteData(id!);
      alertSuccess("Foydalanuvchi muvaffaqiyatli o'chirildi!");
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleTableChange: TableProps<PositionType>["onChange"] =
    pagination => {
      setPagination({
        current: pagination?.current || 1,
        pageSize: pagination?.pageSize || 10,
        total: pagination?.total || 0,
      });
    };

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

  const columns: ColumnsType<PositionType> = [
    {
      title: "№",
      dataIndex: "order",
      width: "0.01%",
      align: "center",
      render: (_, __, index: number) => {
        const currentPage = pagination?.current ?? 1;
        const pageSize = pagination?.pageSize ?? 10;
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
      title: "Harakatlar",
      key: "Actions",
      align: "center",
      width: "15%",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>
            <FilePenLine size={16} />
            O'zgartirish
          </Button>
          <Popconfirm
            title="Lavozimni o'chirishni tasdiqlaysizmi?"
            onConfirm={() => handleDelete(record.id)}
            okText={"Tasdiqlayman"}
            cancelText={"Bekor qilish"}
          >
            <Button danger>
              <Trash2 size={16} /> O'chirish
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
          paddingBottom: "10px",
          width: "100%",
        }}
      >
        <Input
          placeholder="Search"
          value={searchText}
          onChange={e => handleSearchChange(e.target.value)}
          prefix={<SearchOutlined />}
          style={{ width: "400px" }}
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
        pagination={{
          total: pagination?.total,
          current: pagination.current,
          pageSize: pagination.pageSize,
          showTotal: total => `Jami: ${total} ta`,
          locale: {
            items_per_page: "tadan",
            jump_to: "O'tish",
            jump_to_confirm: "Tasdiqlash",
            page: "Sahifa",
          },
          onChange: (page, pageSize) =>
            setPagination({
              current: page,
              pageSize,
              total: pagination?.total,
            }),
        }}
        onChange={handleTableChange}
        bordered
      />
    </>
  );
};

export default PositionsTable;

import React, { useState } from "react";
import { Table, Input, Space, message, Button } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import useFetch from "../hooks/useFetch";
import { debounce } from "lodash";
import BankCardAddModal from "./BankCardAddModal";
import { BankCardTypes } from "../types/BankCardTypes";
import { PaginatedData } from "../types/PaginatedType";

const BankCardsTable: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [initialData, setInitialData] = useState<BankCardTypes | undefined>();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { data, loading, createData, updateData, deleteData } =
    useFetch<BankCardTypes>("/clients", {
      search: searchText,
      page: pagination.current,
      pageSize: pagination.pageSize,
    });

  const handleSearchChange = debounce((value: string) => {
    setSearchText(value);
  }, 300);

  const handleEdit = (record: BankCardTypes) => {
    setInitialData(record);
    setOpenModal(true);
  };

  const handleDelete = async (id: string | undefined) => {
    try {
      await deleteData(id!);
      message.success("Muvaffaqiyatli o'chirildi");
    } catch (error) {
      console.error("Failed to delete:", error);
      message.error("O'chirishda xato yuz berdi!");
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handleCreate = async (newData: BankCardTypes) => {
    try {
      await createData(newData);
      setOpenModal(false);
      message.success("Muvaffaqiyatli qo'shildi");
    } catch (error) {
      console.error("Failed to create:", error);
      message.error("Qo'shishda xato yuz berdi!");
    }
  };

  const handleUpdate = async (
    id: string | undefined,
    updatedData: BankCardTypes
  ) => {
    try {
      await updateData(id!, updatedData);
      setOpenModal(false);
      message.success("Muvaffaqiyatli yangilandi");
    } catch (error) {
      console.error("Failed to update:", error);
      message.error("Yangilashda xato yuz berdi!");
    }
  };

  const columns: ColumnsType<BankCardTypes> = [
    {
      title: "№",
      dataIndex: "order",
      width: "0.1%",
      align: "center",
      render: (_, __, index: number) => {
        const { current = 1, pageSize = 10 } = pagination;
        return (current - 1) * pageSize + index + 1;
      },
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
    {
      title: "Harakatlar",
      key: "actions",
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          <DeleteOutlined /> O'chirish
        </Button>
      ),
    },
  ];

  return (
    <>
      <BankCardAddModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        loading={loading}
      />
      <Space
        direction="horizontal"
        style={{
          paddingBottom: "20px",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Input
          placeholder="Search"
          onChange={e => handleSearchChange(e.target.value)}
          prefix={<SearchOutlined />}
          style={{ width: 400 }}
          allowClear
        />
        <Button type="primary" onClick={() => setOpenModal(true)}>
          <PlusCircleOutlined /> Karta qo'shish
        </Button>
      </Space>
      <Table<BankCardTypes>
        className="custom-table"
        columns={columns}
        dataSource={
          Array.isArray(data)
            ? data
            : (data as PaginatedData<BankCardTypes>)?.data
        }
        loading={loading}
        pagination={{
          total: (data as PaginatedData<BankCardTypes>)?.total ?? 0,
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
              total: pagination.total,
            }),
        }}
        onChange={handleTableChange}
        scroll={{ x: true }}
        bordered
      />
    </>
  );
};

export default BankCardsTable;

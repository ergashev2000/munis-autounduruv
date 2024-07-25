import React, { useState } from "react";
import { Table, Input, Space, message, Button, Flex } from "antd";
import {
  SearchOutlined,
  CreditCardOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import useFetch from "../hooks/useFetch";
import { debounce } from "lodash";
import BankCardAddModal from "./BankCardAddModal";
import { BankCardTypes } from "../types/BankCardTypes";
import { PaginatedData } from "../types/PaginatedType";
import BankCardDrawer from "./BankCardDrawer";
import moment from "moment";
import { alertError } from "@utils/toastify";

const BankCardsTable: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDrawerBar, setOpenDrawerBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { data, loading, deleteData, refetch } = useFetch<BankCardTypes>(
    "/clients",
    {
      search: searchText,
      page: pagination.current,
      pageSize: pagination.pageSize,
    }
  );
  const [contractId, setContractId] = useState("");

  const handleSearchChange = debounce((value: string) => {
    setSearchText(value);
  }, 300);

  const handleDelete = async (id: string) => {
    try {
      await deleteData(id!);
      alertError("Shartnoma muvaffaqiyatli o'chirildi");
    } catch (error) {
      console.error("Failed to delete:", error);
      message.error("O'chirishda xato yuz berdi!");
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const openDrawer = (id: string) => {
    setOpenDrawerBar(true);
    setContractId(id);
  };

  const columns: ColumnsType<BankCardTypes> = [
    {
      title: "№",
      dataIndex: "order",
      width: "1%",
      align: "center",
      render: (_, __, index: number) => {
        const { current = 1, pageSize = 10 } = pagination;
        return (current - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Shartnoma ID",
      dataIndex: "contractId",
      key: "contractId",
      width: "20%",
    },
    {
      title: "INN raqami",
      dataIndex: "inn",
      key: "inn",
      align: "center",
      width: "20%",
    },
    {
      title: "Holati",
      dataIndex: "confirmed",
      key: "confirmed",
      align: "center",
      width: "20%",
      render: confirmed => (
        <div style={{ color: "white" }}>
          {confirmed ? (
            <span
              style={{
                backgroundColor: "green",
                padding: "4px 10px",
                borderRadius: "6px",
              }}
            >
              Tasdiqlangan
            </span>
          ) : (
            <span style={{ backgroundColor: "red" }}>Tasdiqlanmagan</span>
          )}
        </div>
      ),
    },
    {
      title: "Qo'shilgan vaqti",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: "20%",
      render: (value: string) => moment(value).format("DD-MM-YYYY HH:mm"),
    },
    {
      title: "Harakatlar",
      key: "actions",
      width: "25%",
      align: "center",
      render: (_, record) => (
        <Flex gap={10} justify="center">
          <Button onClick={() => openDrawer(record.id!)} type="primary">
            <CreditCardOutlined /> Ulangan kartalarni ko'rish
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <BankCardDrawer
        setOpenDrawer={setOpenDrawerBar}
        openDrawer={openDrawerBar}
        contractId={contractId}
        handleDelete={handleDelete}
      />
      <BankCardAddModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        refetch={refetch}
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

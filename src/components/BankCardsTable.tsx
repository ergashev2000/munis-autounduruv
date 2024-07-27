import React, { useState } from "react";
import moment from "moment";
import { debounce } from "lodash";
import { Table, Input, Space, message, Button, Flex } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
  SearchOutlined,
  CreditCardOutlined,
  PlusCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  WalletOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";

import useFetch from "../hooks/useFetch";
import BankCardAddModal from "./BankCardAddModal";
import BankCardDrawer from "./BankCardDrawer";
import { BankCardTypes } from "../types/BankCardTypes";
import { PaginatedData } from "../types/PaginatedType";
import { alertError } from "@utils/toastify";
import BankCardWithdrawModal from "./BankCardWithdrawModal";
import BankCardWithCard from "./BankCardWithCard";

const BankCardsTable: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDrawerBar, setOpenDrawerBar] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [openWithCardModal, setOpenWithCardModal] = useState(false);

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

  const handleOpenWithCard = (id: string) => {
    setContractId(id);
    setOpenWithCardModal(true);
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
      render: value => (
        <span style={{ color: "#1677FF", fontWeight: "500" }}>{value}</span>
      ),
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
              <CheckOutlined /> Tasdiqlangan
            </span>
          ) : (
            <span style={{ backgroundColor: "red" }}>
              <CloseOutlined />
              Tasdiqlanmagan
            </span>
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
      width: "15%",
      align: "center",
      render: (_, record) => (
        <Flex gap={10} justify="center">
          <Button
            onClick={() => handleOpenWithCard(record.id!)}
            icon={<CreditCardOutlined />}
          >
            Kartani orqali to'lov
          </Button>
          <Button onClick={() => openDrawer(record.id!)}>
            Ulangan kartalarni ko'rish <CaretRightOutlined />
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <BankCardWithdrawModal
        openModal={openWithdrawModal}
        setOpenModal={setOpenWithdrawModal}
      />
      <BankCardDrawer
        setOpenDrawer={setOpenDrawerBar}
        openDrawer={openDrawerBar}
        contractId={contractId}
        handleDelete={handleDelete}
      />
      <BankCardWithCard
        openWithCardModal={openWithCardModal}
        setOpenWithCardModal={setOpenWithCardModal}
        userId={contractId}
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
        <Space>
          <Button type="primary" onClick={() => setOpenWithdrawModal(true)}>
            <WalletOutlined /> Kartadan pul yechish
          </Button>
          <Button type="primary" onClick={() => setOpenModal(true)}>
            <PlusCircleOutlined /> Karta qo'shish
          </Button>
        </Space>
      </Space>
      <Table<BankCardTypes>
        className="custom-table"
        size="small"
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

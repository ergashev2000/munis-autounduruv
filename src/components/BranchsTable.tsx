import BranchsModal from "./BranchsModal";

import { useState } from "react";
import { Button, Space, Table, Input, Popconfirm, Flex, message } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { FilePenLine, Trash2 } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { debounce } from "lodash";
import { BranchsType } from "types/BranchsType";
import { getFormatDate } from "@utils/getFormatDate";

export default function BranchsTable() {
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [initialData, setInitialData] = useState<BranchsType>();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { data, loading, createData, updateData, deleteData } =
    useFetch<BranchsType>("/branches", {
      search: searchText,
      page: tableParams.pagination.current,
      pageSize: tableParams.pagination.pageSize,
    });

  const handleSearchChange = debounce((value: string) => {
    setSearchText(value);
  }, 100);

  const handleEdit = (record: BranchsType) => {
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

  const handleTableChange: TableProps<BranchsType>["onChange"] = pagination => {
    setTableParams({
      pagination: {
        current: pagination?.current || 1,
        pageSize: pagination?.pageSize || 10,
      },
    });
  };

  const columns: ColumnsType<BranchsType> = [
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
      title: "Filial",
      dataIndex: "name",
      key: "name",
      render: text => <span style={{ color: "#1677FF" }}>{text}</span>,
    },
    {
      title: "Yaratilgan vaqt",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (values: string) => getFormatDate(values),
    },
    {
      title: "Actions",
      key: "Harakatlar",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)} icon={<FilePenLine />} />
          <Popconfirm
            title="Bu filialni o'chirishni tasdiqlaysizmi?"
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

  const handleCreate = async (newData: BranchsType) => {
    try {
      await createData(newData);
      setOpenModal(false);
    } catch (error) {
      console.error("Failed to create:", error);
    }
  };

  const handleUpdate = async (
    id: string | undefined,
    updatedData: BranchsType
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
      <BranchsModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        initialData={initialData}
        setInitialData={setInitialData}
        loading={loading}
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
          onChange={e => handleSearchChange(e.target.value)}
          prefix={<SearchOutlined />}
          style={{ width: 400 }}
          allowClear
        />
        <Button type="primary" onClick={() => setOpenModal(true)}>
          <PlusOutlined /> Filial qo'shish
        </Button>
      </Flex>
      <Table
        columns={columns}
        dataSource={Array.isArray(data) ? data : []}
        rowKey="id"
        loading={loading}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        bordered
      />
    </>
  );
}

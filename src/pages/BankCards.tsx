import { useState } from "react";

import { bankCardsBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";
import BankCardsTable from "@components/BankCardsTable";
import BreadcrumbItem from "@components/ui/Breadcrumbs";
import BankCardAddModal from "@components/BankCardAddModal";

import { Button, Flex, Space } from "antd";
import { PlusCircleOutlined, DownloadOutlined } from "@ant-design/icons";

export default function BankCards() {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <BankCardAddModal
        open={open}
        confirmLoading={confirmLoading}
        modalText={modalText}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <Space direction="vertical" style={{ width: "100%" }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ paddingBottom: "10px" }}
        >
          <BreadcrumbItem breadcrumbs={bankCardsBreadcrumbs} />
          <Space>
            <Button size="large">
              <DownloadOutlined /> Export
            </Button>
            <Button size="large" type="primary" onClick={showModal}>
              <PlusCircleOutlined /> Yangi karta qo'shish
            </Button>
          </Space>
        </Flex>
        <BankCardsTable />
      </Space>
    </>
  );
}

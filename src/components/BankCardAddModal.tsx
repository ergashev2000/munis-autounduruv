import React, { useState } from "react";

import MockupCard from "@components/MockupCard";
import { formatCardNumber } from "@utils/formatCardNumber";
import { years, months, applyZeroMasking } from "@utils/formatCardData";

import { Input, Modal, Space, Select, Divider, Flex } from "antd";

const BankCardAddModal: React.FC<{
  open: boolean;
  confirmLoading: boolean;
  modalText: string;
  handleOk: () => void;
  handleCancel: () => void;
}> = ({ open, confirmLoading, handleOk, handleCancel }) => {
  const [cardDetails, setCardDetails] = useState({
    fullName: "",
    cardNumber: "",
    expiryMonth: `${new Date().getMonth() + 1}`,
    expiryYear: `${new Date().getFullYear().toString().substring(2,4)}`,
  });

  const { fullName, cardNumber, expiryMonth, expiryYear } = cardDetails;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numbersOnly = input.replace(/\D/g, "");
    const formatted = formatCardNumber(numbersOnly);
    setCardDetails(prev => ({
      ...prev,
      cardNumber: formatted,
    }));
  };

  const handleExpiryMonthChange = (value: string) => {
    setCardDetails(prev => ({
      ...prev,
      expiryMonth: value,
    }));
  };

  const handleExpiryYearChange = (value: string) => {
    setCardDetails(prev => ({
      ...prev,
      expiryYear: value,
    }));
  };

  return (
    <Modal
      title="Yangi karta qo'shish"
      open={open}
      onOk={handleOk}
      okText={"Kartani qo'shish"}
      confirmLoading={confirmLoading}
      cancelText={"Bekor qilish"}
      onCancel={handleCancel}
      width={540}
    >
      <MockupCard
        fullName={fullName}
        cardNumber={applyZeroMasking(cardNumber)}
        expiryDate={`${expiryMonth}/${expiryYear}`}
      />
      <Divider>Karta ma'lumotlari</Divider>
      <Space
        direction="vertical"
        style={{ width: "100%", paddingBottom: "5px" }}
      >
        <Input
          size="large"
          placeholder="Full Name"
          value={fullName}
          onChange={e =>
            setCardDetails({ ...cardDetails, fullName: e.target.value })
          }
          style={{ width: "100%" }}
        />
        <Input
          size="large"
          placeholder="Card Number"
          value={cardNumber}
          onChange={handleCardNumberChange}
          maxLength={19}
          style={{ width: "100%" }}
        />
        <Flex gap={5}>
          <Select
            placeholder="MM"
            value={expiryMonth ? expiryMonth : undefined}
            onChange={handleExpiryMonthChange}
            options={months}
            size="large"
            style={{ width: "50%" }}
          />
          <Select
            placeholder="YY"
            value={expiryYear ? expiryYear : undefined}
            onChange={handleExpiryYearChange}
            options={years}
            size="large"
            style={{ width: "50%" }}
          />
        </Flex>
        <Input
          size="large"
          placeholder="Contract ID"
          style={{ width: "100%" }}
        />
        <Input size="large" placeholder="Pinfl" style={{ width: "100%" }} />
      </Space>
    </Modal>
  );
};

export default BankCardAddModal;

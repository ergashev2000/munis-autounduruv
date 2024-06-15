import React, { useState } from "react";
import { Input, Modal, Space, Select, Divider } from "antd";
import MockupCard from "@components/MockupCard";
import { formatCardNumber } from "@utils/formatCardNumber";
import { months1, years1 } from "./handlers";

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
    expiryMonth: "",
    expiryYear: "",
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

  const applyZeroMasking = (cardNumber: string): string => {
    const maxCardLength = 16;
    const numbersOnly = cardNumber.replace(/\D/g, "");
    const paddedNumber = numbersOnly.padEnd(maxCardLength, "0");
    return formatCardNumber(paddedNumber);
  };

  return (
    <Modal
      title="Yangi karta qo'shish"
      visible={open}
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
      <Divider />
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
        <Space style={{ width: "100%" }}>
          <Select
            placeholder="MM"
            value={expiryMonth ? expiryMonth : undefined}
            onChange={handleExpiryMonthChange}
            options={months1}
            style={{ width: "242px" }}
            size="large"
          />
          <Select
            placeholder="YY"
            value={expiryYear ? expiryYear : undefined}
            onChange={handleExpiryYearChange}
            options={years1}
            style={{ minWidth: "242px" }}
            size="large"
          />
        </Space>
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

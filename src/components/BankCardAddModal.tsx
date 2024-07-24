import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Input,
  Modal,
  Space,
  Select,
  Divider,
  Button,
  message,
  Progress,
  Flex,
} from "antd";
import axiosInstance from "../config/axiosInstance";
import { SendOutlined } from "@ant-design/icons";
import MockupCard from "./MockupCard";
import { applyZeroMasking, months, years } from "@utils/formatCardData";
import { OTPProps } from "antd/es/input/OTP";

interface CardDetails {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  contractId: string;
  pinfl: string;
  userPhone: string;
}

interface BankCardModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  loading: boolean;
}

const BankCardAddModal: React.FC<BankCardModalProps> = ({
  openModal,
  setOpenModal,
  loading,
}) => {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    expiryMonth: `${(new Date().getMonth() + 1).toString().padStart(2, "0")}`,
    expiryYear: `${new Date().getFullYear().toString().slice(-2)}`,
    contractId: "",
    pinfl: "",
    userPhone: "",
  });
  console.log(cardDetails.expiryMonth);

  const [session, setSession] = useState("");
  const [openOtp, setOpenOtp] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [timer, setTimer] = useState<number>(30);

  const handleChange =
    (key: keyof CardDetails) => (e: ChangeEvent<HTMLInputElement>) => {
      setCardDetails(prev => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  const handleSelectChange = (key: keyof CardDetails) => (value: string) => {
    setCardDetails(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateFields = (): boolean => {
    const {
      cardNumber,
      expiryMonth,
      expiryYear,
      contractId,
      pinfl,
      userPhone,
    } = cardDetails;
    return !!(
      cardNumber &&
      expiryMonth &&
      expiryYear &&
      contractId &&
      pinfl &&
      userPhone
    );
  };

  const sendCardDetails = async () => {
    if (!validateFields()) {
      message.error("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    const {
      cardNumber,
      expiryMonth,
      expiryYear,
      contractId,
      pinfl,
      userPhone,
    } = cardDetails;

    try {
      const response = await axiosInstance.post("/clients", {
        cardNumber,
        expireDate: `${expiryYear}${expiryMonth}`,
        contractId,
        userPhone: `998${userPhone}`,
        pinfl,
      });
      console.log(response);

      const { session } = response.data.data;
      setSession(session);
      setOpenOtp(true);
      startCooldown();
    } catch (error) {
      console.error("Error sending card details:", error);
      message.error("Karta ma'lumotlarini yuborishda xato yuz berdi.");
      throw error;
    }
  };

  const confirmCard = async (session: string, otp: string) => {
    const { contractId } = cardDetails;

    try {
      const response = await axiosInstance.post("/clients/card/confirm", {
        session,
        otp,
        contractId,
      });

      if (response.data.status === 200) {
        message.success("Karta tasdiqlandi!");
        setOpenModal(false);
      } else {
        message.error("Karta tasdiqlashda xato yuz berdi!");
      }
    } catch (error) {
      console.error("Error confirming card:", error);
      message.error("Tasdiqlashda xato yuz berdi, qaytadan urinib ko'ring.");
    }
  };

  const handleOk = async () => {
    try {
      await sendCardDetails();
    } catch (error) {
      console.error("Error during card handling:", error);
    }
  };

  const handleAppendCard = async (otp: string) => {
    try {
      await confirmCard(session, otp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const startCooldown = () => {
    setIsCooldown(true);
    setTimer(30);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCooldown && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsCooldown(false);
    }

    return () => clearInterval(interval);
  }, [isCooldown, timer]);

  const onChange: OTPProps["onChange"] = text => {
    handleAppendCard(text);
  };

  return (
    <Modal
      title="Yangi karta qo'shish"
      open={openModal}
      onOk={handleOk}
      okText="Kartani qo'shish"
      confirmLoading={loading}
      cancelText="Bekor qilish"
      onCancel={handleCancel}
      width={540}
      maskClosable={false}
      okButtonProps={{ disabled: !validateFields() || isCooldown }}
    >
      <MockupCard
        cardNumber={applyZeroMasking(cardDetails.cardNumber)}
        expiryDate={`${cardDetails.expiryMonth}/${cardDetails.expiryYear}`}
        userPhone={`+998${cardDetails.userPhone}`}
      />
      <Divider>Karta ma'lumotlari</Divider>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          size="large"
          placeholder="Karta raqami"
          value={cardDetails.cardNumber}
          onChange={handleChange("cardNumber")}
          maxLength={16}
          disabled={isCooldown}
        />
        <Flex gap={10}>
          <Select
            placeholder="MM"
            value={cardDetails.expiryMonth}
            onChange={handleSelectChange("expiryMonth")}
            options={months}
            size="large"
            style={{ width: "50%" }}
            disabled={isCooldown}
          />
          <Select
            placeholder="YY"
            value={cardDetails.expiryYear}
            onChange={handleSelectChange("expiryYear")}
            options={years}
            size="large"
            style={{ width: "50%" }}
            disabled={isCooldown}
          />
        </Flex>
        <Input
          size="large"
          placeholder="Telefon raqami"
          value={cardDetails.userPhone}
          onChange={handleChange("userPhone")}
          maxLength={9}
          disabled={isCooldown}
        />
        <Input
          size="large"
          placeholder="Shartnoma raqami"
          value={cardDetails.contractId}
          onChange={handleChange("contractId")}
          disabled={isCooldown}
        />
        <Input
          size="large"
          placeholder="Pinfl"
          value={cardDetails.pinfl}
          onChange={handleChange("pinfl")}
          disabled={isCooldown}
        />

        <Flex justify="end">
          {isCooldown ? (
            <Flex gap={10} align="center">
              <p>Tasdiqlash kodini 30 soniyadan so'ng qayta yubora olasiz!</p>
              <Progress
                type="circle"
                percent={timer}
                size={40}
                format={percent => `${percent} s`}
                strokeColor={{ "0%": "#87d068", "100%": "#ff4d4f" }}
              />
            </Flex>
          ) : (
            <Button
              type="primary"
              size="large"
              onClick={sendCardDetails}
              disabled={isCooldown}
            >
              Tasdiqlash kodini yuborish <SendOutlined />
            </Button>
          )}
        </Flex>
      </Space>
      {openOtp && isCooldown && (
        <>
          <Divider style={{ marginTop: "10px" }}>Kartani tasdiqlash</Divider>
          <Flex gap={10} vertical>
            <Input.OTP
              size="large"
              style={{ marginInline: "auto" }}
              onChange={onChange}
            />
          </Flex>
        </>
      )}
    </Modal>
  );
};

export default BankCardAddModal;

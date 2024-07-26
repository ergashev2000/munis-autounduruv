import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Select,
  Space,
  Button,
  Divider,
  Progress,
  message,
  Result,
  Flex,
  Spin,
} from "antd";
import { SendOutlined, ReloadOutlined } from "@ant-design/icons";
import MockupCard from "./MockupCard";
import axiosInstance from "../config/axiosInstance";
import { applyZeroMasking, months, years } from "@utils/formatCardData";
import { OTPProps } from "antd/es/input/OTP";
import { alertSuccess } from "@utils/toastify";

interface BankCardWithdrawModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

interface CardDetails {
  contractId: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  amount: string;
}

const BankCardWithdrawModal: React.FC<BankCardWithdrawModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    contractId: "",
    cardNumber: "",
    expiryMonth: `${(new Date().getMonth() + 1).toString().padStart(2, "0")}`,
    expiryYear: `${new Date().getFullYear().toString().slice(-2)}`,
    amount: "",
  });
  const [session, setSession] = useState<string>("");
  const [otpValue, setOtpValue] = useState<string>("");
  const [timer, setTimer] = useState<number>(0);
  const [isCooldown, setIsCooldown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState<boolean>(false);
  const [openOtpInput, setOpenOtpInput] = useState<boolean>(false);

  const handleChange =
    (key: keyof CardDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCardDetails({ ...cardDetails, [key]: e.target.value });
    };

  const handleSelectChange = (key: keyof CardDetails) => (value: string) => {
    setCardDetails({ ...cardDetails, [key]: value });
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

  const validateFields = (): boolean => {
    const { cardNumber, expiryMonth, expiryYear, contractId } = cardDetails;
    return !!(cardNumber && expiryMonth && expiryYear && contractId);
  };

  const sendCardDetails = async () => {
    if (!validateFields()) {
      message.error("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/clients/payment/whithoutRegistration",
        {
          contractId: cardDetails.contractId,
          cardNumber: cardDetails.cardNumber.replace(/\s/g, ""),
          expireDate: `${cardDetails.expiryYear}${cardDetails.expiryMonth}`,
          amount: Number(cardDetails.amount),
        }
      );

      const { session } = response.data.data;
      setSession(session);

      alertSuccess("Tasdiqlash kodi yuborildi. Iltimos, kodni kiriting.");
      startCooldown();
      setOpenOtpInput(true);
    } catch (error) {
      console.error("Error sending card details:", error);
      message.error("Karta ma'lumotlarini yuborishda xato yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (otp: string) => {
    setOtpLoading(true);
    try {
      await axiosInstance.post("/clients/payment/confirmPayment", {
        contractId: cardDetails.contractId,
        otp,
        session: session,
      });

      setIsPaymentConfirmed(true);
      reset();
    } catch (error) {
      console.error("Error confirming payment:", error);
      message.error("Tasdiqlashda xato yuz berdi.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    setIsPaymentConfirmed(false);
    setOpenOtpInput(false);
    reset();
  };

  const onChange: OTPProps["onChange"] = (text: string) => {
    confirmPayment(text);
    setOtpLoading(true);
    alertSuccess(`Telefon raqamiga SMS kod yuborildi!`);
  };

  const reset = () => {
    setCardDetails({
      contractId: "",
      cardNumber: "",
      expiryMonth: `${(new Date().getMonth() + 1).toString().padStart(2, "0")}`,
      expiryYear: `${new Date().getFullYear().toString().slice(-2)}`,
      amount: "",
    });
    setOtpValue("");
  };

  return (
    <Modal
      title={
        isPaymentConfirmed
          ? "To'lov tasdiqlandi"
          : "Shartnoma bo'yicha to'lov qilish"
      }
      open={openModal}
      onCancel={handleCancel}
      width={600}
      maskClosable={false}
      footer={null}
    >
      {isPaymentConfirmed ? (
        <Result
          status="success"
          title="To'lov muvaffaqiyatli tasdiqlandi!"
          subTitle="Karta bilan to'lov amalga oshirildi. Hisobingiz yangilanishi bir necha daqiqa vaqt olishi mumkin."
          extra={[
            <Button key="close" onClick={handleCancel}>
              Yopish
            </Button>,
          ]}
        />
      ) : (
        <>
          <MockupCard
            cardNumber={applyZeroMasking(cardDetails.cardNumber)}
            expiryDate={`${cardDetails.expiryMonth}/${cardDetails.expiryYear}`}
            userPhone={" "}
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
              required
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
              placeholder="Pul miqdori"
              value={cardDetails.amount ? cardDetails.amount : undefined}
              onChange={handleChange("amount")}
              type="number"
              disabled={isCooldown}
              required
            />
            <Input
              size="large"
              placeholder="Shartnoma raqami"
              value={cardDetails.contractId}
              onChange={handleChange("contractId")}
              disabled={isCooldown}
              required
            />
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              {isCooldown ? (
                <Space>
                  <p>Boshqa kod so‘rashdan oldin {timer} soniya kuting.</p>
                  <Progress
                    type="circle"
                    percent={timer * 3.33}
                    size={40}
                    format={percent => `${Math.ceil(percent! / 3.33)} s`}
                  />
                </Space>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  onClick={sendCardDetails}
                  loading={loading}
                >
                  {openOtpInput ? (
                    <Space>
                      <ReloadOutlined />
                      Kodni qayta yuborish
                    </Space>
                  ) : (
                    <Space>
                      Tasdiqlash kodini yuborish
                      <SendOutlined />
                    </Space>
                  )}
                </Button>
              )}
            </Space>
          </Space>
          {openOtpInput && (
            <>
              <Divider>Kartani tasdiqlash uchun kodni kiriting</Divider>
              <Flex gap={10} vertical>
                <Input.OTP
                  size="large"
                  style={{ marginInline: "auto" }}
                  onChange={onChange}
                  value={otpValue}
                />
                <Spin spinning={otpLoading} delay={500} />
              </Flex>
            </>
          )}
        </>
      )}
    </Modal>
  );
};

export default BankCardWithdrawModal;

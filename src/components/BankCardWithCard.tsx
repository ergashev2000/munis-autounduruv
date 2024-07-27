import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Input,
  Modal,
  Form,
  Select,
  Result,
  Space,
  Progress,
  Typography,
} from "antd";
import axiosInstance from "../config/axiosInstance";
import { alertError } from "@utils/toastify";

import { DownloadOutlined } from "@ant-design/icons";

interface Card {
  number: string;
  cardId: number;
  cardName: string;
  owner: string;
  balance: string;
}

interface UserData {
  contractId: string;
  cards: Card[];
}

interface BankCardWithCardProps {
  userId: string;
  openWithCardModal: boolean;
  setOpenWithCardModal: (value: boolean) => void;
}

const BankCardWithCard: React.FC<BankCardWithCardProps> = ({
  userId,
  openWithCardModal,
  setOpenWithCardModal,
}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number | undefined>();
  const [amount, setAmount] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const fetchCards = async () => {
      setLoadingModal(true);
      try {
        const response = await axiosInstance.get(`/clients/${userId}`);
        setUserData(response.data.data);
        setCards(response.data.data.cards);
      } catch (error) {
        alertError("Error fetching cards");
      } finally {
        setLoadingModal(false);
      }
    };
    if (userId) {
      fetchCards();
    }
  }, [userId]);

  const handleCardSelect = (value: number) => {
    setSelectedCardId(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handlePostRequest = async () => {
    if (!amount || !selectedCardId) {
      alertError("Iltimos, kartani tanlang va miqdorni kiriting");
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post("/clients/payment/withCard", {
        cardId: selectedCardId,
        contractId: userData?.contractId,
        amount,
      });

      setIsPaymentConfirmed(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alertError(error.response.data.message || "Kutulmagan xatolik!");
      } else {
        alertError("Kutulmagan xatolik!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPaymentConfirmed && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setOpenWithCardModal(false);
      setIsPaymentConfirmed(false);
    }

    return () => clearInterval(interval);
  }, [isPaymentConfirmed, timer]);

  const handleCancel = () => {
    setOpenWithCardModal(false);
    setIsPaymentConfirmed(false);
    setTimer(10);
    setAmount(undefined);
  };

  return (
    <Modal
      open={openWithCardModal}
      footer={null}
      onCancel={handleCancel}
      width={600}
      loading={loadingModal}
    >
      {isPaymentConfirmed ? (
        <Result
          status="success"
          title="To'lov muvaffaqiyatli tasdiqlandi!"
          subTitle="Karta bilan to'lov amalga oshirildi. Hisobingiz yangilanishi bir necha daqiqa vaqt olishi mumkin."
          extra={[
            <Progress
              key="progress"
              type="circle"
              percent={(timer / 10) * 100}
              size={40}
              format={percent => `${Math.ceil((percent! / 100) * 10)} s`}
            />,
            <Button key="close" onClick={handleCancel}>
              Yopish
            </Button>,
          ]}
        />
      ) : (
        <Form layout="vertical">
          <Typography.Title level={4}>
            {userData?.contractId} sonli shartnomaga darhol to'lov qilish
          </Typography.Title>
          <Form.Item label="Kartani tanlang">
            <Select placeholder="Kartani tanlang" onChange={handleCardSelect}>
              {Array.isArray(cards) &&
                cards.map(card => (
                  <Select.Option key={card.cardId} value={card.cardId}>
                    <Space direction="horizontal" size={10}>
                      <p>{card.number}</p> /
                      <p>
                        Balans -{" "}
                        <span style={{ color: "red" }}>{card.balance}</span>
                      </p>{" "}
                      /<p>{card.owner}</p>
                    </Space>
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item label="Pul miqdorini kiriting">
            <Input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Summa"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              loading={loading}
              onClick={handlePostRequest}
              icon={<DownloadOutlined />}
            >
              Pul yechish
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default BankCardWithCard;

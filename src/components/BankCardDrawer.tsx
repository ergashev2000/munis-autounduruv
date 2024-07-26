import {
  Button,
  Card,
  Divider,
  Drawer,
  Empty,
  Flex,
  Popconfirm,
  Spin,
  Typography,
} from "antd";
import axiosInstance from "../config/axiosInstance";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { alertError, alertWarning } from "@utils/toastify";
import { handleError } from "@utils/handleError";
import { scanCard } from "@utils/scanCards";

import Humo from "../assets/icons/humo-logo.jpg";
import UzCard from "../assets/icons/my_uzcard.png";
import { useAuth } from "../context/AuthContext";

const { Title, Text } = Typography;

interface Card {
  id: number;
  userId: string;
  cardId: number;
  owner: string;
  cardName: string | null;
  number: string;
  balance: number;
  expireDate: string;
  isTrusted: number;
  status: number;
  errorCode: number;
  isUpdated: boolean;
  errorMessage: string;
  isOwn: boolean;
  isSmsActivated: boolean;
  pcType: number;
}

interface UserData {
  id: string;
  contractId: string;
  confirmed: boolean;
  inn: string;
  createdAt: string;
  updatedAt: string;
  cards: Card[];
}

interface BankCardDrawerProps {
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
  contractId: string;
  handleDelete: (id: string) => void;
}

export default function BankCardDrawer({
  openDrawer,
  setOpenDrawer,
  contractId,
  handleDelete,
}: BankCardDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { user } = useAuth();
  console.log(user);

  const sendCardDetails = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/clients/${id}`);
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error sending card details:", error);
      alertError("Karta ma'lumotlarini yuborishda xato yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  const removeCard = async (clientId: string, cardId: number) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/clients/card/${clientId}?cardId=${cardId}`);
      sendCardDetails(contractId);
    } catch (error) {
      console.error("Error sending card details:", error);
      alertError("Karta o'chirishda xato yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contractId && openDrawer) {
      sendCardDetails(contractId);
    }
  }, [contractId, openDrawer]);

  const formatExpireDate = (date: string) => {
    if (date.length === 4) {
      const month = date.slice(2);
      const year = date.slice(0, 2);
      return `${month}/${year}`;
    }
    return date;
  };

  const formatBalance = (balance: number) => {
    return balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleDeleteContract = async () => {
    try {
      if (userData?.cards.length === 0) {
        await handleDelete(contractId);
        setOpenDrawer(false);
      } else {
        alertWarning(
          `${userData?.contractId} shartnomasiga ulangan kartalar mavjud! Avval karta ma'lumotlarini o'chiring.`
        );
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  return (
    <Drawer
      width={600}
      placement="right"
      closable={false}
      onClose={() => setOpenDrawer(false)}
      open={openDrawer}
    >
      {loading ? (
        <Flex justify="center" align="center">
          <Spin size="large" />
        </Flex>
      ) : (
        <>
          {user?.permissions.action && (
            <header>
              <Flex justify="end">
                <Popconfirm
                  placement="topRight"
                  title={"Shartnomani o'chirishni tasdiqlaysizmi?"}
                  description={
                    "Mijozga biriktirilgan barcha karta ma'lumotlari o'chib ketadi!"
                  }
                  okText="Tasdiqlayman"
                  cancelText="bekor qilish"
                  onConfirm={handleDeleteContract}
                >
                  <Button danger type="primary" loading={loading}>
                    <DeleteOutlined />
                    Shartnomani o'chirish
                  </Button>
                </Popconfirm>
              </Flex>
            </header>
          )}
          {userData && (
            <>
              <Title level={4}>
                <span> Shartnoma raqami: </span>
                <span style={{ color: "red" }}>{userData.contractId}</span>
              </Title>
              <br />
              <Text strong>Holati: </Text>
              <Text>
                {userData.confirmed ? (
                  <span
                    style={{
                      backgroundColor: "green",
                      padding: "1px 3px",
                      color: "#fff",
                      borderRadius: "4px",
                    }}
                  >
                    Tasdiqlangan
                  </span>
                ) : (
                  <span
                    style={{
                      backgroundColor: "red",
                      padding: "1px 3px",
                      color: "#fff",
                      borderRadius: "4px",
                    }}
                  >
                    Tasdiqlanmagan
                  </span>
                )}
              </Text>
              <br />
              <Text strong>Qo'shilgan vaqti: </Text>
              <Text>
                {moment(userData.createdAt).format("DD-MM-YYYY HH:mm")}
              </Text>
              <br />
              <Text strong>O'zgartirilgan vaqti: </Text>
              <Text>
                {moment(userData.updatedAt).format("DD-MM-YYYY HH:mm")}
              </Text>
              <br />
              <Flex>
                <Divider>Mijozning barcha kartalari</Divider>
              </Flex>
              {userData.cards.length > 0 ? (
                userData.cards.map(card => (
                  <Card
                    key={card.id}
                    title={card.owner}
                    style={{ marginBottom: "16px", position: "relative" }}
                  >
                    {user?.permissions.action && (
                      <Popconfirm
                        placement="topRight"
                        title={"Mijoz kartasini o'chirishni tasdiqlaysizmi?"}
                        okText="Tasdiqlayman!"
                        cancelText="Bekor qilish"
                        onConfirm={() => removeCard(userData.id, card.id)}
                      >
                        <Button
                          danger
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "12px",
                          }}
                        >
                          <DeleteOutlined />
                          Kartani o'chirish
                        </Button>
                      </Popconfirm>
                    )}
                    <Flex gap={10}>
                      <Text strong>Karta raqami:</Text>{" "}
                      <span>{card.number}</span>
                    </Flex>
                    <Flex gap={10}>
                      <Text strong>Yaroqlilik muddati:</Text>{" "}
                      {formatExpireDate(card.expireDate)}
                    </Flex>
                    <Flex gap={10}>
                      <Text strong>Balans:</Text>{" "}
                      <span style={{ color: "red" }}>
                        {formatBalance(card.balance)}
                      </span>
                    </Flex>
                    <Flex gap={10}>
                      <Text strong>Mijoz roziligi:</Text>{" "}
                      {card.isTrusted ? "Tasdiqlangan" : "Tasdiqlanmagan"}
                    </Flex>
                    <Flex gap={10}>
                      <Text strong>Status:</Text> {card.status}
                    </Flex>
                    <Flex gap={10}>
                      <Text strong>Karta holati:</Text> {card.errorMessage}
                    </Flex>
                    <Flex gap={10}>
                      <Text strong>SMS xabarnoma:</Text>{" "}
                      {card.isSmsActivated ? "Mavjud" : "Mavjud emas"}
                    </Flex>
                    <div
                      style={{
                        height: "40px",
                        position: "absolute",
                        right: "20px",
                        bottom: "20px",
                      }}
                    >
                      {["UZCARD", "HUMO"].includes(scanCard(card?.number)) && (
                        <img
                          src={
                            scanCard(card?.number) === "UZCARD" ? UzCard : Humo
                          }
                          alt="Plastik karta icon"
                          style={{ height: "40px", width: "100%" }}
                        />
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <Flex justify="center">
                  <Empty description={"Kartalar mavjud emas"} />
                </Flex>
              )}
            </>
          )}
        </>
      )}
    </Drawer>
  );
}

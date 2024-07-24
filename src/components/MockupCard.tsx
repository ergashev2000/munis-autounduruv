import React, { useEffect, useState } from "react";

import SimCardChip from "../assets/images/sim-card-chip.png";
import Wifi from "../assets/icons/wifi.svg";

import Humo from "../assets/icons/humo-logo.jpg";
import UzCard from "../assets/icons/my_uzcard.png";
import { scanCard } from "@utils/scanCards";
import { formatCardNumber } from "@utils/formatCardNumber";
import { Flex } from "antd";
import { formatPhoneNumber } from "@utils/formatCardData";

interface CardProps {
  cardNumber: string;
  expiryDate: string;
  userPhone: string;
}

const MockupCard: React.FC<CardProps> = ({
  cardNumber,
  expiryDate,
  userPhone,
}) => {
  const [isCorrectCard, setIsCorrectCard] = useState("");

  useEffect(() => {
    const isScan = scanCard(cardNumber);
    setIsCorrectCard(isScan);
  }, [cardNumber]);

  return (
    <div className="mockup-card animated-collar">
      <div className="mockup-card-header">
        <h3 className="mockup-card-title">BANK CARD</h3>
      </div>
      <div className="mockup-card-body">
        <div className="mockup-card-info">
          <div className="mockup-card-label">
            <img src={SimCardChip} alt="icon" />
          </div>
          <div className="mockup-card-icon">
            <img src={Wifi} alt="icon" />
          </div>
        </div>
        <div className="mockup-card-value">
          <p className="mockup-card-numbers">{formatCardNumber(cardNumber)}</p>
          <div className="mockup-card-date">
            <p className="mockup-card-title">
              VALID <br /> THRU
            </p>{" "}
            <p className="mockup-card-year">{expiryDate}</p>
          </div>
        </div>
        <Flex align="end" justify="space-between">
          <h3 className="mockup-card-fullname">{formatPhoneNumber(userPhone)}</h3>
          <div className="mockup-card-symbal">
            {["UZCARD", "HUMO"].includes(isCorrectCard) && (
              <img
                src={isCorrectCard === "UZCARD" ? UzCard : Humo}
                alt={
                  isCorrectCard === "UZCARD" ? "UzCard symbol" : "Humo symbol"
                }
              />
            )}
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default MockupCard;

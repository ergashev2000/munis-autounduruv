import { useState } from "react";

import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CallDataI, ContractDataI, SmsDataI } from "./types";
import {
  SnippetsOutlined,
  MessageFilled,
  PhoneOutlined,
} from "@ant-design/icons";

const contractData: ContractDataI[] = [
  {
    key: "1",
    name: "Farg'ona",
    contractCount: 10,
    currentDebt: 50000,
    withheldAmount: 15000,
    remainingBalance: 35000,
  },
  {
    key: "2",
    name: "Quvasoy",
    contractCount: 8,
    currentDebt: 30000,
    withheldAmount: 10000,
    remainingBalance: 20000,
  },
];

const smsData: SmsDataI[] = [
  {
    key: "1",
    name: "Farg'ona",
    sentMessages: 100,
    receivedMessages: 80,
    pendingMessages: 20,
  },
  {
    key: "2",
    name: "Quvasoy",
    sentMessages: 90,
    receivedMessages: 85,
    pendingMessages: 5,
  },
];

const callData: CallDataI[] = [
  {
    key: "1",
    name: "Farg'ona",
    totalCalls: 200,
    missedCalls: 50,
    answeredCalls: 150,
  },
  {
    key: "2",
    name: "Quvasoy",
    totalCalls: 180,
    missedCalls: 40,
    answeredCalls: 140,
  },
  {
    key: "1",
    name: "Farg'ona",
    totalCalls: 200,
    missedCalls: 50,
    answeredCalls: 150,
  },
  {
    key: "2",
    name: "Quvasoy",
    totalCalls: 180,
    missedCalls: 40,
    answeredCalls: 140,
  },
  {
    key: "1",
    name: "Farg'ona",
    totalCalls: 200,
    missedCalls: 50,
    answeredCalls: 150,
  },
  {
    key: "2",
    name: "Quvasoy",
    totalCalls: 180,
    missedCalls: 40,
    answeredCalls: 140,
  },
  {
    key: "1",
    name: "Farg'ona",
    totalCalls: 200,
    missedCalls: 50,
    answeredCalls: 150,
  },
  {
    key: "2",
    name: "Quvasoy",
    totalCalls: 180,
    missedCalls: 40,
    answeredCalls: 140,
  },
];

const contractColumns: ColumnsType<ContractDataI> = [
  {
    title: "Filial nomi",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Shartnomalar soni",
    dataIndex: "contractCount",
    key: "contractCount",
    sorter: (a, b) => a.contractCount - b.contractCount,
  },
  {
    title: "Joriy qarzdorlik",
    dataIndex: "currentDebt",
    key: "currentDebt",
    sorter: (a, b) => a.currentDebt - b.currentDebt,
    render: value => `${value.toLocaleString()} so'm`,
  },
  {
    title: "Ushlangan summa",
    dataIndex: "withheldAmount",
    key: "withheldAmount",
    sorter: (a, b) => a.withheldAmount - b.withheldAmount,
    render: value => `${value.toLocaleString()} so'm`,
  },
  {
    title: "Qoldiq",
    dataIndex: "remainingBalance",
    key: "remainingBalance",
    sorter: (a, b) => a.remainingBalance - b.remainingBalance,
    render: value => `${value.toLocaleString()} so'm`,
  },
];

const smsColumns: ColumnsType<SmsDataI> = [
  {
    title: "Filial nomi",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Yuborilgan xabarlar",
    dataIndex: "sentMessages",
    key: "sentMessages",
    sorter: (a, b) => a.sentMessages - b.sentMessages,
  },
  {
    title: "Qabul qilingan xabarlar",
    dataIndex: "receivedMessages",
    key: "receivedMessages",
    sorter: (a, b) => a.receivedMessages - b.receivedMessages,
  },
  {
    title: "Kutayotgan xabarlar",
    dataIndex: "pendingMessages",
    key: "pendingMessages",
    sorter: (a, b) => a.pendingMessages - b.pendingMessages,
  },
];

const callColumns: ColumnsType<CallDataI> = [
  {
    title: "Filial nomi",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Jami qo'ng'iroqlar",
    dataIndex: "totalCalls",
    key: "totalCalls",
    sorter: (a, b) => a.totalCalls - b.totalCalls,
  },
  {
    title: "O'tkazib yuborilgan qo'ng'iroqlar",
    dataIndex: "missedCalls",
    key: "missedCalls",
    sorter: (a, b) => a.missedCalls - b.missedCalls,
  },
  {
    title: "Qabul qilingan qo'ng'iroqlar",
    dataIndex: "answeredCalls",
    key: "answeredCalls",
    sorter: (a, b) => a.answeredCalls - b.answeredCalls,
  },
];

type TableData = ContractDataI | SmsDataI | CallDataI;

export default function TableDashboard() {
  const [selectedView, setSelectedView] = useState<
    "contracts" | "sms" | "calls"
  >("contracts");

  let columns: ColumnsType<TableData>;
  let dataSource: TableData[];

  switch (selectedView) {
    case "sms":
      columns = smsColumns as ColumnsType<TableData>;
      dataSource = smsData;
      break;
    case "calls":
      columns = callColumns as ColumnsType<TableData>;
      dataSource = callData;
      break;
    case "contracts":
    default:
      columns = contractColumns as ColumnsType<TableData>;
      dataSource = contractData;
  }

  return (
    <>
      <div className="dashboard_section-btn">
        <button
          onClick={() => setSelectedView("contracts")}
          className={`${selectedView === "contracts" ? "bg_active" : ""}`}
        >
          <SnippetsOutlined /> Shartnomalarni filiallarda ko'rish
        </button>
        <button
          onClick={() => setSelectedView("sms")}
          className={`${selectedView === "sms" ? "bg_active" : ""}`}
        >
          <MessageFilled /> SMSlarni filiallarda ko'rish
        </button>
        <button
          onClick={() => setSelectedView("calls")}
          className={`${selectedView === "calls" ? "bg_active" : ""}`}
        >
          <PhoneOutlined rotate={90} /> Qo'ng'iroqlarni filiallarda ko'rish
        </button>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}

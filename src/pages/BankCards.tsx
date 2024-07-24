import { bankCardsBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";
import BankCardsTable from "@components/BankCardsTable";
import BreadcrumbItem from "@components/ui/Breadcrumbs";
import { Space } from "antd";

export default function BankCards() {
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <BreadcrumbItem breadcrumbs={bankCardsBreadcrumbs} />
        <BankCardsTable />
      </Space>
    </>
  );
}

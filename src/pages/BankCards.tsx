import { Breadcrumb, Flex } from "antd";
import { bankCardsBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";
import BankCardsTable from "@components/BankCardsTable";

export default function BankCards() {
  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ paddingBottom: "15px" }}
      >
        <Breadcrumb items={bankCardsBreadcrumbs} />
      </Flex>
      <BankCardsTable />
    </>
  );
}

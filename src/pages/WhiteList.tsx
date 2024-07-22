import { whiteListBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";
import { Breadcrumb, Flex } from "antd";
import WhiteListTable from "@components/WhiteListTable";

export default function WhiteList() {
  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ paddingBottom: "20px" }}
      >
        <Breadcrumb items={whiteListBreadcrumbs} />
      </Flex>
      <WhiteListTable />
    </>
  );
}

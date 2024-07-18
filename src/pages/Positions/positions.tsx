import PositionsTable from "@components/PositionsTable";
import { positionsBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";
import { Breadcrumb, Flex } from "antd";

export default function Positions() {
  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ paddingBottom: "20px" }}
      >
        <Breadcrumb items={positionsBreadcrumbs} />
      </Flex>
      <PositionsTable />
    </>
  );
}

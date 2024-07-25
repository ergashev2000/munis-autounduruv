import { Breadcrumb, Flex } from "antd";

import PositionsTable from "@components/PositionsTable";
import { positionsBreadcrumbs } from "@components/ui/Breadcrumbs/breadcrumbsData";

export default function Positions() {
  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ paddingBottom: "15px" }}
      >
        <Breadcrumb items={positionsBreadcrumbs} />
      </Flex>
      <PositionsTable />
    </>
  );
}
